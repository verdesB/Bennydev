export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <p>Demande pour l&apos;ID {resolvedParams.id}</p>;
}
