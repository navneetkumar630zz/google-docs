import { useState } from 'react';
import firebase from 'firebase';
import Image from 'next/image';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import db from 'database';
import style from './style.module.css';

const CreateNewSection = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const createDocument = () => {
    if (!inputValue) return;
    db.collection('userDocs').doc(user.email).collection('docs').add({
      name: inputValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInputValue('');
    setIsModalVisible(false);
  };

  const CreateNewModal = (
    <Dialog open={isModalVisible} onClose={closeModal}>
      <DialogTitle>Enter a name for the document</DialogTitle>
      <DialogContent>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="e.g. My article"
          onKeyPress={e => e.key === 'Enter' && createDocument()}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={createDocument}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <section className={style.CreateNewSection}>
      <div className="container">
        <header className="flex jc-sb">
          <h5>Start a new document</h5>
          <IconButton>
            <MoreVert />
          </IconButton>
        </header>
        <div className={style.template_container}>
          <div className="template" onClick={() => setIsModalVisible(true)}>
            <Image
              src="/create_new.png"
              height="181"
              width="140"
              objectFit="contain"
              alt="blank template"
              className={style.image}
            />
            <h6>Blank</h6>
          </div>
        </div>
      </div>
      {CreateNewModal}
    </section>
  );
};

export default CreateNewSection;
