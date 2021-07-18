import { useRouter } from 'next/router';
import { IconButton } from '@material-ui/core';
import { Delete, Description } from '@material-ui/icons';
import db from 'database';
import style from './style.module.css';

const RecentDocRow = ({ id, data, userEmail }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/doc/${id}`);
  };

  const handleDelete = e => {
    e.stopPropagation();
    db.collection('userDocs')
      .doc(userEmail)
      .collection('docs')
      .doc(id)
      .delete();
  };

  return (
    <div
      className={style.Row}
      onClick={handleClick}
      tabIndex="0"
      onKeyPress={e => e.key === 'Enter' && handleClick()}
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
          onKeyPress={e => e.key === 'Enter' && handleDelete(e)}
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default RecentDocRow;
