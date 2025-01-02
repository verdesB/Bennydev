'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface AddHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onSuccess: () => void;
}

export default function AddHistoryModal({
  isOpen,
  onClose,
  projectId,
  onSuccess,
}: AddHistoryModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [needsValidation, setNeedsValidation] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('Utilisateur non connecté');
      return;
    }

    const { error } = await supabase
      .from('project_history')
      .insert({
        project_id: projectId,
        title,
        description,
        needs_validation: needsValidation,
        validation_status: 'en_attente',
        created_by: user.id
      });

    if (!error) {
      onSuccess();
      onClose();
      setTitle('');
      setDescription('');
      setNeedsValidation(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une entrée d&apos;historique</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Titre
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="needs-validation"
              checked={needsValidation}
              onCheckedChange={(checked) => setNeedsValidation(checked as boolean)}
            />
            <label
              htmlFor="needs-validation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nécessite une validation
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 