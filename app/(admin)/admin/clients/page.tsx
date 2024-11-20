'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateInscription: string;
}

const Clients = () => {
  // Données exemple - à remplacer par vos vraies données
  const clients: Client[] = [
    {
      id: "1",
      nom: "Jean Dupont",
      email: "jean@exemple.fr",
      telephone: "06 12 34 56 78",
      dateInscription: "2024-03-20",
    },
    // ... autres clients
  ];

  return (
    <div className="p-8 relative z-30">
      <h1 className="text-3xl font-bold mb-6">Gestion des Clients</h1>
      
      <div className="rounded-md border">
        <Table className="bg-purple-50">
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Date d'inscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.nom}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.telephone}</TableCell>
                <TableCell>{client.dateInscription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Clients;
