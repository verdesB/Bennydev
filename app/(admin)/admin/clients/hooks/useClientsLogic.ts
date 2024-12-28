import { useState, useEffect } from 'react';

const useClientsLogic = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) throw new Error('Erreur lors de la récupération des clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchClients();
  }, []);

  return {
    clients,
    selectedClient,
    setSelectedClient,
  };
};

export default useClientsLogic; 