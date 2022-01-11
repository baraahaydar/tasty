import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useContext, useState } from "react";
import SessionContext from "../components/session/SessionContext";
import { useRouter } from "next/router";
import { getServerSidePropsHandler, usePrivacyChecker } from "../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "linear-gradient(0.25turn,#e74c3c, #f1c40f)",
    color: "#2d3436",
  },
  lock: {
    backgroundColor: "#f1c40f",
    color: "#2d3436",
  },
}));

export const getServerSideProps = getServerSidePropsHandler(null, false);

export default function Login() {

  usePrivacyChecker(false);
  const classes = useStyles();

  const {
    actions: { login },
  } = useContext(SessionContext);

  const [state, setValue] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
    console.log(state);
  }
  const router = useRouter();
  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    login(state);
    router.push("/userlist");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.lock}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            color="secondary"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color="secondary"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
Login.layout = "withoutheader";
