import React, { useState } from 'react'

import {
  Card,
  TextField,
  CardContent,
  CardActions,
  Button,
  FormControl,
  makeStyles,
  CardHeader
} from '@material-ui/core'


const useStyles = makeStyles(() => ({
  root: {
    
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
    if (e.target.value.length <= 4) {
      setUserErrorText("* must have at least 4 characters")
    }
    else {
      setUsername(e.target.value);
    }
  }

  const promptUsernameError = () => {
    setUserErrorText("* username already exists")
  }

  const promptPasswordError = () => {
    setPasswordErrorText("* must match")
  }

  const promptPasswordConfirmError = () => {
    setPasswordConfirmErrorText("* must match")
  }

  const handlePasswordUpdate = (e) => {
    if (e.target.value.length <= 4) {
      console.log('password too small' + e);
    }
    else {
      setPassword(e.target.value);
    }

  }

  const handlePasswordConfirmUpdate = (e) => {
    if (e.target.value.length <= 4) {
      console.log('password confirm too small' + e);
    }
    else {
      setPasswordConfirm(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (username.already in firebase) {
    //   promptUsernameError("username already exists");
    //  setPassword("");
    //  setPasswordConfirm("");
    // }
    if (password !== passwordConfirm) {
      promptPasswordError(); 
      promptPasswordConfirmError();
    }
    else {
      //submit stuff to firebase db
      console.log("submit stuff to firebase db")
    }
  }

  return (
    <Card aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.root} fullWidth >
      <CardHeader title="Sign Up" />
      <form onSubmit={handleSubmit}>
        <CardContent >
          <FormControl required fullWidth>
            <TextField
              required
              autoFocus
              autoComplete="false"
              id="task-desc"
              label="Username"
              variant="outlined"
              error={(userErrorText === "" ? false : true )}
              errorText={userErrorText}
              onChange={e => handleUsernameUpdate(e)}
            />
          </FormControl>
        </CardContent>
        <CardContent className={classes.dialogContent}>
          <FormControl required fullWidth>
            <TextField
              required
              autoFocus
              autoComplete="false"
              id="task-desc"
              label="Pasword"
              type="password"
              helperText="at least 6 characters"
              variant="outlined"
              error={(passwordErrorText === "" ? false : true )}
              errorText={passwordErrorText}
              onChange={e => handlePasswordUpdate(e)}
            />
          </FormControl>

          <FormControl required fullWidth>
            <TextField
              required
              autoFocus
              autoComplete="false"
              id="task-desc"
              label="Confirm Password"
              type="password"
              variant="outlined"
              error={(passwordConfirmErrorText === "" ? false : true )}
              errorText={passwordConfirmErrorText}
              onChange={e => handlePasswordConfirmUpdate(e)}
            />
          </FormControl>

        </CardContent>

        <CardActions className={classes.dialogActionBar}>
          <Button type="submit" color="primary" size="large" variant="contained" >
            Sign Up
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}