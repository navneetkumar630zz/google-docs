import { getSession } from 'next-auth/client';
import Home from 'components/Home';
import Login from 'components/Login';

const Index = ({ session }) => {
  return session ? <Home user={session.user} /> : <Login />;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}

export default Index;
