import { useState } from "react";
import { useRouter } from "next/router";
// import firebase from 'firebase';
import Image from "next/image";
import {
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import style from "./style.module.css";

const CreateNewSection = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const createDocument = async () => {
    if (!inputValue) return;

    setLoading(true);
    const docRef = await addDoc(collection(db, `userDocs/${user.email}/docs`), {
      name: inputValue,
      timestamp: Timestamp.now(),
    });
    setLoading(false);
    router.push(`/doc/${docRef.id}`);
  };

  const CreateNewModal = (
    <Dialog open={isModalVisible} onClose={closeModal}>
      <DialogTitle>Enter a name for the document</DialogTitle>
      <DialogContent>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. My article"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={createDocument}
          disabled={loading}
          startIcon={loading && <CircularProgress color="inherit" size={16} />}
        >
          {loading ? "Creating" : "Create"}
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
          <div>
            <ButtonBase focusRipple onClick={() => setIsModalVisible(true)}>
              <Image
                src="/create_new.png"
                height="181"
                width="140"
                objectFit="contain"
                alt="blank template"
                className={style.image}
              />
            </ButtonBase>
            <h6>Blank</h6>
          </div>
        </div>
      </div>
      {CreateNewModal}
    </section>
  );
};

export default CreateNewSection;
