type FormStatusProps = {
  success?: string;
  error?: string;
};

export default function FormStatus({ success, error }: FormStatusProps) {
  if (!success && !error) return null;

  return (
    <div className={`p-4 rounded-xl ${
      success 
        ? 'bg-green-50 text-green-700 border border-green-200' 
        : 'bg-red-50 text-red-700 border border-red-200'
    }`}>
      {success || error}
    </div>
  );
} 