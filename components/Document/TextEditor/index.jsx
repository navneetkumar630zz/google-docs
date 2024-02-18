import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { doc, setDoc } from "firebase/firestore";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { db } from "@/firebase";
import style from "./style.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((modules) => modules.Editor),
  { ssr: false }
);

const TextEditor = ({ user, docId, docData }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const docRef = useMemo(
    () => doc(db, `userDocs/${user.email}/docs/${docId}`),
    [user.email, docId]
  );

  const handleEditorStateChange = (updatedEditorState) => {
    const oldStateRaw = convertToRaw(editorState.getCurrentContent());
    const newStateRaw = convertToRaw(updatedEditorState.getCurrentContent());

    setEditorState(updatedEditorState);

    if (JSON.stringify(oldStateRaw) !== JSON.stringify(newStateRaw)) {
      setDoc(
        docRef,
        {
          editorState: newStateRaw,
        },
        { merge: true }
      );
    }
  };

  useEffect(() => {
    const content = docData?.editorState;
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
    }
  }, [docData]);

  return (
    <div className={style.TextEditor}>
      <Editor
        toolbarClassName={style.toolbar}
        editorClassName={`container ${style.editor}`}
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
