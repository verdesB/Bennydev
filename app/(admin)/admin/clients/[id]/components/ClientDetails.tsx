'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface ClientData {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateInscription: string;
  statutContrat?: 'en_attente' | 'accepté' | 'refusé';
  dateDecision?: string;
  user_metadata?: {
    name: string;
  };
}

export default function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState<ClientData | null>(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchClientData = useCallback(async () => {
    try {
      const response = await fetch(`/api/clients/${id}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      
      const data = await response.json();
      const formattedClient = {
        id: data.client.id,
        nom: data.client.user_metadata?.name || '',
        email: data.client.email,
        telephone: data.client.profiles?.phone || '',
        dateInscription: data.client.profiles?.created_at || '',
        statutContrat: data.client.profiles?.statut_contrat || 'en_attente',
        dateDecision: data.client.profiles?.date_decision,
      };
      setClient(formattedClient);
      setMarkdownContent(data.markdownContent);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientData();
  }, [id, fetchClientData]);

  const handleContratAction = async (action: 'accepter' | 'refuser') => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');

      await response.json();
      setClient(prev => ({
        ...prev!,
        statutContrat: action === 'accepter' ? 'accepté' : 'refusé',
        dateDecision: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fiche Client</h1>
        <Badge variant={
          client?.statutContrat === 'accepté' ? 'secondary' :
          client?.statutContrat === 'refusé' ? 'destructive' :
          'default'
        }>
          {client?.statutContrat || 'En attente'}
        </Badge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations client</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Nom</dt>
                <dd>{client?.nom}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Email</dt>
                <dd>{client?.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Téléphone</dt>
                <dd>{client?.telephone}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Date d&apos;inscription</dt>
                <dd>{new Date(client?.dateInscription || '').toLocaleDateString()}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demande de projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {(!client?.statutContrat || client?.statutContrat === 'en_attente') && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-end">
                <Button 
                  variant="destructive"
                  onClick={() => handleContratAction('refuser')}
                  disabled={updating}
                >
                  {updating ? 
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 
                    null
                  }
                  Refuser le projet
                </Button>
                <Button 
                  variant="default"
                  onClick={() => handleContratAction('accepter')}
                  disabled={updating}
                >
                  {updating ? 
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 
                    null
                  }
                  Accepter le projet
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {client?.statutContrat && client.statutContrat !== 'en_attente' && (
          <Alert>
            <AlertDescription>
              Le projet a été {client.statutContrat} le {new Date(client.dateDecision!).toLocaleDateString()}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
} 