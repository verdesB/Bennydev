'use client';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

type FormState = {
  status: 'success' | 'error';
  message: string;
} | null;

interface FormSubmitButtonProps {
  formAction: any;
  disabled?: boolean;
}

export default function FormSubmitButton({ formAction, disabled }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  const [state, setState] = useState<FormState>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await formAction(formData);
      setState({ status: 'success', message: result.message });
    } catch (error) {
      setState({ status: 'error', message: error.message });
    }
  };

  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (form) {
          const formData = new FormData(form);
          handleSubmit(formData);
        }
      }}
      disabled={pending || disabled}
      className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
    >
      {pending ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        'Envoyer'
      )}
    </button>
  );
} 