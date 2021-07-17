import db from 'database';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import style from './style.module.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(modules => modules.Editor),
  { ssr: false }
);

const TextEditor = ({ user, docId }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const docRef = db
    .collection('userDocs')
    .doc(user.email)
    .collection('docs')
    .doc(docId);

  const [snapshot] = useDocumentOnce(docRef);

  const handleEditorStateChange = editorState => {
    setEditorState(editorState);

    docRef.set(
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );
  };

  useEffect(() => {
    const content = snapshot?.data()?.editorState;
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
    }
  }, [snapshot]);

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
