import { useRef, useState } from "react";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "@/firebase";
import style from "./style.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const formRef = useRef();

  const loginUser = async () => {
    try {
      const data = new FormData(formRef.current);
      await signInWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMsg("Email or Password is incorrect");
          break;
        default:
          setErrorMsg(error.message);
      }
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    loginUser();
  };

  const handleSignup = async () => {
    setSubmitting(true);
    try {
      const data = new FormData(formRef.current);
      await createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Email address already in use.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMsg("Error during sign up.");
          break;
        case "auth/weak-password":
          setErrorMsg("Password is not strong enough. Try something else.");
          break;
        default:
          setErrorMsg(error.message);
          break;
      }
      setSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setErrorMsg(null);
  };

  return (
    <div className={style.Login}>
      <Paper>
        <Image
          src="/full_logo.png"
          alt="logo with branding"
          width="67"
          height="70"
          objectFit="contain"
        />
        <Typography variant="h3" component="h1" align="center">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} ref={formRef}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            required
            defaultValue="test@example.com"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            required
            type={showPassword ? "text" : "password"}
            defaultValue="test1234"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((pre) => !pre)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            size="large"
            disabled={submitting}
          >
            Login
          </Button>
          <Button
            color="primary"
            fullWidth
            size="large"
            onClick={handleSignup}
            disabled={submitting}
          >
            Create Account
          </Button>
        </form>
      </Paper>
      <Snackbar open={!!errorMsg} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
