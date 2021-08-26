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
  ThemeProvider
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),

  },
  password: {
    marginTop: theme.spacing(2)
  },
  button: {
    justifyContent:'center',
  },
  title: {
    textAlign: 'center'
  }
}))

export default function Signup(props) {

  const classes = useStyles();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const [userErrorText, setUserErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [passwordConfirmErrorText, setPasswordConfirmErrorText] = useState("");


  const handleUsernameUpdate = (e) => {
    if (e.target.value.length < 4) {
      promptUsernameError("* must have at least 4 characters")
    }
    else {
      promptUsernameError("");
    }
    setUsername(e.target.value);
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

  const handlePasswordConfirmUpdate = (e) => {
    if (e.target.value.length < 6) {
      promptPasswordConfirmError("* must have at least 6 characters")
    }
    else {
      promptPasswordConfirmError("")
    }
    setPasswordConfirm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (username.already in firebase) {
    //   promptUsernameError("username already exists");
    //  setPassword("");
    //  setPasswordConfirm("");
    // }
    let isValid = true;
    if (username.length < 4) {
      promptUsernameError("* must have at least 4 characters")
      isValid = false;
    }

    if (password.length < 6) {
      promptPasswordError("* must have at least 6 characters")
      isValid = false;
    }

    if (password !== passwordConfirm) {
      promptPasswordConfirmError('* passwords must match');
      isValid = false;
    }

    if(isValid) {
      //submit stuff to firebase db
      console.log("submit stuff to firebase db")
    }
  }

  
  const promptUsernameError = (message) => {
    setUserErrorText(message)
  }

  const promptPasswordError = (message) => {
    setPasswordErrorText(message)
  }

  const promptPasswordConfirmError = (message) => {
    setPasswordConfirmErrorText(message)
  }


  return (
    <Card aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.root} fullWidth >
      <CardHeader title="Sign Up" className={classes.title} />
      <form onSubmit={handleSubmit}>
        <CardContent >
          <FormControl required fullWidth>
            <TextField
              required
              autoFocus
              autoComplete="false"
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              error={(userErrorText === "" ? false : true )}
              helperText={userErrorText}
              onChange={e => handleUsernameUpdate(e)}
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
              error={(passwordErrorText === "" ? false : true )}
              helperText={passwordErrorText}
              onChange={e => handlePasswordUpdate(e)}
            />
          </FormControl>
          </CardContent>

          <CardContent >
          <FormControl required fullWidth>
            <TextField
              required
              autoFocus
              autoComplete="false"
              id="pwd-confirm"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={passwordConfirm}
              error={(passwordConfirmErrorText === "" ? false : true )}
              helperText={passwordConfirmErrorText}
              onChange={e => handlePasswordConfirmUpdate(e)}
            />
          </FormControl>

        </CardContent>

        <CardActions className={classes.button}>
          <Button type="submit" color="primary" size="large" variant="contained" >
            Sign Up
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}