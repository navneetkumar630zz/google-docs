import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { Apps, Menu, Search } from '@material-ui/icons';
import { signOut } from 'next-auth/client';
import style from './style.module.css';

const Header = ({ user }) => {
  return (
    <header className={style.Header}>
      <div className="flex">
        <IconButton className="hide-on-mobile">
          <Menu />
        </IconButton>
        <div className={style.branding}>
          <img src="/logo.png" alt="docs logo" width="40" height="40" />
          Docs
        </div>
      </div>
      <div className={`hide-on-mobile ${style.search}`}>
        <IconButton size="small">
          <Search />
        </IconButton>
        <input type="text" placeholder="Search" />
      </div>
      <div className="flex">
        <div className="mr-2">
          <IconButton>
            <Apps />
          </IconButton>
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
