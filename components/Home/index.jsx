import Header from '@/components/Home/Header';
import CreateNewSection from './CreateNewSection';
import RecentSection from './RecentSection';

const Home = ({ user }) => {
  return (
    <div>
      <Header user={user} />

      <main>
        <CreateNewSection user={user} />
        <RecentSection user={user} />
      </main>
    </div>
  );
};

export default Home;
