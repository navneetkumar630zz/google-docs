// import { getSession } from 'next-auth/client';
import Document from '@/components/Document';

const DocumentPage = ({ user }) => {
  return <Document user={user} />;
};

export default DocumentPage;
