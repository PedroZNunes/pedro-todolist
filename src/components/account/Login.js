import React, { useState } from 'react'

import {
  Card,
  TextField,
  CardContent,
  CardActions,
  Button,
  FormControl,
  makeStyles,
  CardHeader,
  Container,
  Typography
} from '@material-ui/core'

import Alert from '@material-ui/lab/Alert'

import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  password: {
    marginTop: theme.spacing(2)
  },
  button: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center'
  }
}))

export default function Login(props) {

  const classes = useStyles();

  const { login } = useAuth();


  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [emailErrorText, setUserErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const isEmailValid = (email) => {

    let isValid = true;
    if (email === undefined)
      return false

    if (email === null)
      return false


    if (!email.includes("@")) {
      isValid = false;
    }
    else {
      let splits = email.split('@');

      if (splits.length !== 2) {
        isValid = false;
      }
      else {
        if (splits[0].length <= 2)
          isValid = false;

        if (!splits[1].includes("."))
          isValid = false;

        if (splits[1].length < 5)
          isValid = false;
      }
    }

    return isValid
  }

  const handleEmailUpdate = (e) => {
    if (!isEmailValid(e.target.value)) {
      promptEmailError("* must be a valid email")
    }
    else {
      promptEmailError("");
    }
    setEmail(e.target.value);
  }

  const handlePasswordUpdate = (e) => {
    if (e.target.value.length < 6) {
      promptPasswordError("* must have at least 6 characters")
    }
    else {
      promptPasswordError("")
    }
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (email.length < 4) {
      promptEmailError("* must have at least 4 characters")
      isValid = false;
    }

    if (password.length < 6) {
      promptPasswordError("* must have at least 6 characters")
      isValid = false;
    }


    if (isValid) {
      promptEmailError("")
      promptPasswordError("")

      try {
        setError('');
        setLoading(true);

        await login(email, password)
        history.push("/");
      }
      catch {
        setError("Failed signing in");
      }

      setLoading(false);

    }
  }


  const promptEmailError = (message) => {
    setUserErrorText(message)
  }

  const promptPasswordError = (message) => {
    setPasswordErrorText(message)
  }


  return (
    <Container maxWidth="sm" >
      <div style={{ height: '10vh' }} />
      <Card aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.root} fullWidth >
        <CardHeader title="Sign In" className={classes.title} />
        {error && <Alert severity="error"> {error} </Alert>}
        <form onSubmit={handleSubmit}>
          <CardContent >
            <FormControl required fullWidth>
              <TextField
                required
                autoFocus
                autoComplete="false"
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                error={(emailErrorText === "" ? false : true)}
                helperText={emailErrorText}
                onChange={e => handleEmailUpdate(e)}
              />
            </FormControl>
          </CardContent>

          <CardContent className={classes.password}>
            <FormControl required fullWidth>
              <TextField
                required
                autoFocus
                autoComplete="false"
                id="pwd"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                error={(passwordErrorText === "" ? false : true)}
                helperText={passwordErrorText}
                onChange={e => handlePasswordUpdate(e)}
              />
            </FormControl>
          </CardContent>

          <CardActions className={classes.button}>
            <Button disabled={loading} type="submit" color="primary" size="large" variant="contained" >
              Sign In
            </Button>
          </CardActions>
        </form>
        <CardActions className={classes.button}>
          <Typography variant="subtitle1">
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>Forgot your Password?</Link>
          </Typography>
        </CardActions>
        <br />
        <CardActions className={classes.button}>
          <Typography variant="subtitle1">
            <Link to="/signup" style={{ textDecoration: 'none' }}>Need an Account?</Link>
          </Typography>
        </CardActions>


      </Card>
    </Container>
  )
}