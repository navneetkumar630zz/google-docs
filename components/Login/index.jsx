import { Button, CircularProgress } from '@material-ui/core';
import { signIn } from 'next-auth/client';
import Image from 'next/image';
import style from './style.module.css';

const Login = ({ loading }) => {
  return (
    <div className={style.Login}>
      <div>
        <Image
          src="/full_logo.png"
          alt="logo with branding"
          width="200"
          height="210"
          objectFit="contain"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => signIn('google')}
          >
            Login with Google
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
