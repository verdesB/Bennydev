type ErrorMessageProps = {
  error: string
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="text-red-500">Une erreur est survenue: {error}</div>
    </div>
  )
} 