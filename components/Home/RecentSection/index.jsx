import { IconButton } from "@mui/material";
import { Folder, SortByAlpha } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import RecentDocRow from "./RecentDocRow";

const RecentSection = ({ user }) => {
  const [snapshot] = useCollection(
    query(
      collection(db, `userDocs/${user.email}/docs`),
      orderBy("timestamp", "desc")
    )
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
          {snapshot?.docs.map((doc) => (
            <RecentDocRow
              key={doc.id}
              id={doc.id}
              data={doc.data()}
              userEmail={user.email}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSection;
