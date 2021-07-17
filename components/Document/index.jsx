import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import db from 'database';
import Login from 'components/Login';
import Header from './Header';
import { useRouter } from 'next/dist/client/router';
import TextEditor from './TextEditor';

const Document = ({ session }) => {
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection('userDocs').doc(session.user.email).collection('docs').doc(id)
  );

  if (!loadingSnapshot && !snapshot?.data()?.name) {
    router.replace('/');
    return null;
  }

  return (
    <div>
      <Header user={session.user} docName={snapshot?.data()?.name} />
      <TextEditor user={session.user} docId={id} />
    </div>
  );
};

export default Document;
