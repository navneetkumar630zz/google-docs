import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import Header from "./Header";
import TextEditor from "./TextEditor";

const Document = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;
  const [docData, loadingDocData] = useDocumentDataOnce(
    doc(db, `userDocs/${user.email}/docs/${id}`)
  );

  if (!loadingDocData && !docData?.name) {
    router.replace("/");
    return null;
  }

  return (
    <div>
      <Header user={user} docName={docData?.name} />
      <TextEditor user={user} docId={id} docData={docData} />
    </div>
  );
};

export default Document;
