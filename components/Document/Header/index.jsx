import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import { ArrowBack, MessageOutlined, Share } from '@mui/icons-material';
import { signOutAndRedirect } from '@/firebase/utils';
import style from './style.module.css';

const Header = ({ user, docName }) => {
  const handleSignOut = () => {
    signOutAndRedirect()
  };

  return (
    <header className={style.Header}>
      <div className="flex">
        <Link href="/">
        <IconButton>
          <ArrowBack />
        </IconButton></Link>
        <div className="mr-2 hide-on-mobile">
          <Image src="/logo.png" alt="docs logo" width={40} height={40} />
        </div>
        <div className={style.center}>
          <h4>{docName}</h4>
          <ul>
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Insert</li>
            <li>Format</li>
            <li>Tools</li>
            <li>Add-ons</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <div className="flex">
        <div className="mr-2 hide-on-mobile">
          <IconButton>
            <MessageOutlined />
          </IconButton>
        </div>
        <div className="mr-2 hide-on-mobile">
          <Button variant="contained" color="primary" startIcon={<Share />}>
            Share
          </Button>
        </div>
        <Tooltip title="Log out">
          <IconButton size="small" onClick={handleSignOut}>
            <Avatar src={user.image} alt="user avatar" />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
