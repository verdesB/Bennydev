import { Metadata } from 'next';
import ClientDetails from './components/ClientDetails';

export const metadata: Metadata = {
  title: 'Détail Client | Administration',
  description: 'Détails du client et sa demande de projet',
};

export default function ClientPage() {
  return <ClientDetails />;
}