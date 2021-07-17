import { getSession } from 'next-auth/client';
import Document from 'components/Document';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}

export default Document;
