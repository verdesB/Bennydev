'use client';


import { Button } from "@/components/ui/button"

import {useState } from "react";
import useClientsLogic from "./hooks/useClientsLogic";

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateInscription: string;
  statutContrat?: 'en_attente' | 'accepté' | 'refusé';
}

const ClientsPage = () => {
  const {
    clients,
    selectedClient,
    setSelectedClient,
  } = useClientsLogic();

  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les clients en fonction de la recherche
  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)]">
      <aside className="w-[300px] border-r border-[#E7E7E7] bg-white flex flex-col">
        <div className="p-4 border-b border-[#E7E7E7]">
          <input
            type="text"
            placeholder="Rechercher un client..."
            className="w-full p-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`p-4 cursor-pointer hover:bg-gray-50 flex items-center gap-3 ${
                selectedClient?.id === client.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                {`${client.nom.charAt(0)}${client.prenom ? client.prenom.charAt(0) : ''}`}
              </div>
              <div>
                <div className="font-medium">{client.nom} {client.prenom}</div>
                <div className="text-sm text-gray-500">{client.email}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 bg-white">
        {selectedClient ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-[#E7E7E7] flex justify-between items-center">
              <h1 className="text-2xl font-bold">Détails du client</h1>
              <Button 
                variant="outline" 
                onClick={() => {/* Logique pour renvoyer le lien */}}
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                Renvoyer le lien de connexion
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Informations du client */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Nom</h3>
                    <p className="text-lg">{selectedClient.nom} {selectedClient.prenom}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Email</h3>
                    <p className="text-lg">{selectedClient.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Téléphone</h3>
                    <p className="text-lg">{selectedClient.telephone}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Date d&apos;inscription</h3>
                    <p className="text-lg">{new Date(selectedClient.dateInscription).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>

                {/* Section Support */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Attribution du support</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de support
                      </label>
                      <select 
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
        
                      >
                        <option value="">Sélectionner un type de support</option>
                        <option value="standard">Support Standard</option>
                        <option value="premium">Support Premium</option>
                        <option value="vip">Support VIP</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Statut du contrat */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Statut du contrat</h2>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    selectedClient.statutContrat === 'accepté' ? 'bg-green-100 text-green-800' :
                    selectedClient.statutContrat === 'refusé' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedClient.statutContrat || 'En attente'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Sélectionnez un client pour voir les détails
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientsPage;
