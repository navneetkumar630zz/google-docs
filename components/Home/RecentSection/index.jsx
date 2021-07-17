import { IconButton } from '@material-ui/core';
import { Folder, SortByAlpha } from '@material-ui/icons';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import db from 'database';
import RecentDocRow from './RecentDocRow';

const RecentSection = ({ user }) => {
  const [session] = useCollectionOnce(
    db
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  );

  return (
    <section>
      <div className="container">
        <header className="flex jc-sb">
          <h5>Recent Documents</h5>
          <div className="flex">
            <span className="mr-2">Date Created</span>
            <div className="hide-on-mobile">
              <IconButton>
                <SortByAlpha />
              </IconButton>
              <IconButton>
                <Folder />
              </IconButton>
            </div>
          </div>
        </header>
        <div>
          {session?.docs.map(doc => (
            <RecentDocRow key={doc.id} id={doc.id} data={doc.data()} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSection;
