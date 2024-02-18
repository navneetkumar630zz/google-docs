import Image from "next/image";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Apps, Menu, Search } from "@mui/icons-material";
import { signOutAndRedirect } from "@/firebase/utils";
import style from "./style.module.css";

const Header = ({ user }) => {
  console.log(user.email);
  const handleSignOut = () => {
    signOutAndRedirect()
  };

  return (
    <header className={style.Header}>
      <div className="flex">
        <IconButton className="hide-on-mobile">
          <Menu />
        </IconButton>
        <div className={style.branding}>
          <Image src="/logo.png" alt="docs logo" width={40} height={40} />
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
          <IconButton size="small" onClick={handleSignOut}>
            <Avatar>{user.email.substr(0, 1).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
