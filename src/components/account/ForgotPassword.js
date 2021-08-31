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
import { Link } from 'react-router-dom'

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

export default function ForgotPassword(props) {

    const classes = useStyles();

    const { resetPassword } = useAuth();

    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);


    const [email, setEmail] = useState();

    const [emailErrorText, setUserErrorText] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        if (email.length < 4) {
            promptEmailError("* must have at least 4 characters")
            isValid = false;
        }

        if (isValid) {
            promptEmailError("");
            setMessage("");

            try {
                setError('');
                setLoading(true);
                setMessage("An email has been sent to your inbox with instructions to resetting your password.")

                await resetPassword(email);
            }
            catch {
                setError("Failed to send the email");
                setMessage("");
            }

            setLoading(false);
        }
    }

    const promptEmailError = (message) => {
        setUserErrorText(message)
    }

    return (
        <Container maxWidth="sm" >
            <div style={{ height: '10vh' }} />
            <Card aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.root} fullWidth >
                <CardHeader title="Reset Password" className={classes.title} />
                {error && <Alert severity="error"> {error} </Alert>}
                {message && <Alert severity="success"> {message} </Alert>}
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

                    <CardActions className={classes.button}>
                        <Button disabled={loading} type="submit" color="primary" size="large" variant="contained" >
                            Reset Password
                        </Button>
                    </CardActions>
                </form>
                <br />
                <CardActions className={classes.button}>
                    <Typography variant="subtitle1">
                        <Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link>
                    </Typography>
                </CardActions>


            </Card>
        </Container>
    )
}