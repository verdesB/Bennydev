'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { PlusIcon, CheckIcon, XIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AddHistoryModal from './components/AddHistoryModal';
import { use } from 'react';

interface HistoryEntry {
  id: string;
  title: string;
  description: string;
  needs_validation: boolean;
  validation_status: 'en_attente' | 'valide' | 'refuse';
  created_at: string;
  validated_at: string | null;
  client_feedback: string | null;
  created_by: string;
}

export default function ProjectHistory({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClientComponentClient();

  const fetchHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from('project_history')
      .select('*')
      .eq('project_id', resolvedParams.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
      return;
    }

    setHistory(data || []);
  }, [resolvedParams.id, supabase]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleValidation = async (entryId: string, isApproved: boolean) => {
    const { error } = await supabase
      .from('project_history')
      .update({
        validation_status: isApproved ? 'valide' : 'refuse',
        validated_at: new Date().toISOString(),
      })
      .eq('id', entryId);

    if (!error) {
      fetchHistory();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Historique du projet</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Ajouter une entrée
        </Button>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <div 
            key={entry.id} 
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{entry.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {format(new Date(entry.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                </p>
              </div>
              {entry.needs_validation && entry.validation_status === 'en_attente' && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleValidation(entry.id, true)}
                  >
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Valider
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleValidation(entry.id, false)}
                  >
                    <XIcon className="w-4 h-4 mr-1" />
                    Refuser
                  </Button>
                </div>
              )}
            </div>
            
            <p className="mt-3">{entry.description}</p>
            
            {entry.validation_status !== 'en_attente' && (
              <div className="mt-4 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${
                  entry.validation_status === 'valide' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {entry.validation_status === 'valide' ? 'Validé' : 'Refusé'}
                </span>
                {entry.client_feedback && (
                  <p className="mt-2 text-gray-600">
                    Retour client: {entry.client_feedback}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <AddHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={resolvedParams.id}
        onSuccess={fetchHistory}
      />
    </div>
  );
} 