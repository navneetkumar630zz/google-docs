import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { IconButton } from "@mui/material";
import { Delete, Description } from "@mui/icons-material";
import { db } from "@/firebase";
import style from "./style.module.css";

const RecentDocRow = ({ id, data, userEmail }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/doc/${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteDoc(doc(db, `userDocs/${userEmail}/docs/${id}`));
  };

  return (
    <div
      className={style.Row}
      onClick={handleClick}
      tabIndex="0"
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="flex">
        <Description color="primary" className="mr-2 hide-on-mobile" />
        <div>{data.name}</div>
      </div>

      <div className="flex">
        <div>{data.timestamp?.toDate().toLocaleDateString()}</div>

        <IconButton
          className={style.deleteIcon}
          onClick={handleDelete}
          onKeyPress={(e) => e.key === "Enter" && handleDelete(e)}
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default RecentDocRow;
