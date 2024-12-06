const Error = ({ error }) => (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-destructive bg-destructive/10 p-4 rounded-lg">
            <p className="font-semibold">Erreur: {error}</p>
        </div>
    </div>
)

export default Error 