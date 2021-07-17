import { Description } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import style from './style.module.css';

const RecentDocRow = ({ id, data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/doc/${id}`);
  };

  return (
    <div className={style.Row} onClick={handleClick}>
      <div className="flex">
        <Description color="primary" className="mr-2 hide-on-mobile" />
        <div>{data.name}</div>
      </div>
      <div>{data.timestamp?.toDate().toLocaleDateString()}</div>
    </div>
  );
};

export default RecentDocRow;
