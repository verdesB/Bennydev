'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateInscription: string;
  statutContrat?: 'en_attente' | 'accepté' | 'refusé';
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/users?role=client');
        if (!response.ok) throw new Error('Erreur lors de la récupération des clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleContratAction = async (clientId: string, action: 'accepter' | 'refuser') => {
    try {
      const response = await fetch(`/api/users/${clientId}/contrat`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du contrat');
      }

      // Rafraîchir la liste des clients
      const updatedClientsResponse = await fetch('/api/users?role=client');
      const updatedClients = await updatedClientsResponse.json();
      setClients(updatedClients);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="p-8 relative z-30">
      <h1 className="text-3xl font-bold mb-6">Gestion des Clients</h1>
      
      {loading ? (
        <div>Chargement des clients...</div>
      ) : (
        <div className="rounded-md border">
          <Table className="bg-purple-50">
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.nom}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.telephone}</TableCell>
                  <TableCell>{client.dateInscription}</TableCell>
                  <TableCell>{client.statutContrat || 'En attente'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/admin/clients/${client.id}`)}>
                          Voir la fiche client
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContratAction(client.id, 'accepter')}>
                          Accepter le contrat
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContratAction(client.id, 'refuser')}>
                          Refuser le contrat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Clients;
