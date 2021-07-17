import Link from 'next/link';
import { Avatar, Button, IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack, Description, MessageOutlined, Share } from '@material-ui/icons';
import style from './style.module.css';
import { signOut } from 'next-auth/client';

const Header = ({ user, docName }) => {
  return (
    <header className={style.Header}>
      <div className="flex">
        <Link href="/">
        <IconButton>
          <ArrowBack />
        </IconButton></Link>
        <div className="mr-2 hide-on-mobile">
          <img src="/logo.png" alt="docs logo" width="40" height="40" />
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
          <IconButton size="small" onClick={signOut}>
            <Avatar src={user.image} alt="user avatar" />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
