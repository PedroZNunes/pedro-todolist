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

import { Link as RouterLink, useHistory } from 'react-router-dom'

import { Link as MaterialLink } from '@material-ui/core'

import Alert from '@material-ui/lab/Alert'

import { useAuth } from '../../contexts/AuthContext'

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
        marginBottom:theme.spacing(2)
    },
    title: {
        textAlign: 'center'
    },
    reset: {
        marginLeft: theme.spacing(2),
    }
}))

export default function UpdateUser(props) {

    const classes = useStyles();

    const { currentUser, updateUser } = useAuth();

    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const [username, setUsername] = useState();

    const [usernameErrorText, setUsernameErrorText] = useState("");


    const handleUsernameUpdate = (e) => {
        if (!e.length > 4) {
            promptUsernameError("* must have at least 4 characters")
        }
        else {
            promptUsernameError("");
        }
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let isValid = true;
        promptUsernameError("")
        setMessage("")
        setError('');

        if (username.length < 4) {
            promptUsernameError("* must have at least 4 characters")
            isValid = false;
        }

        const promises = []
        setLoading(true);
        if(isValid)
            promises.push(updateUser(username));

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Update Failed')
        }).finally(()=>{
            setLoading(false)
        })

        // if (isValid) {
        //     try {
        //         setLoading(true);

        //         await updateUser(username)
        //         setMessage("User updated successfully")
        //     }
        //     catch {
        //         setError("Update failed");
        //     }

        //     setLoading(false);

        // }
    }

    const promptUsernameError = (message) => {
        setUsernameErrorText(message)
    }

    return (
        <Container maxWidth="sm">
            <div style={{ height: '10vh' }} />
            <Card aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.root} fullWidth >
                <CardHeader title="Update Profile" className={classes.title} />
                {message && <Alert severity="success"> {message} </Alert>}
                {error && <Alert severity="error"> {error} </Alert>}
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
                                defaultValue={currentUser.displayName}
                                value={username}
                                error={(usernameErrorText === "" ? false : true)}
                                helperText={usernameErrorText}
                                onChange={e => handleUsernameUpdate(e)}
                            />
                        </FormControl>
                    </CardContent>

                    <CardActions >
                        <Typography variant="body1" className={classes.reset}>
                            <MaterialLink component={RouterLink} to="/forgot-password" style={{ textDecoration: 'none', }}>Reset my Password</MaterialLink>
                        </Typography>
                    </CardActions>

                    <CardActions className={classes.button}>

                        <Button disabled={loading} type="submit" color="primary" size="large" variant="contained" >
                            Update
                        </Button>

                    </CardActions>
                </form>
                <CardActions className={classes.button}>
                    <Button disabled={loading} color="disabled" size="small" variant="contained">
                        <MaterialLink button size="large" component={RouterLink} to="/" >Back</MaterialLink>
                    </Button>
                </CardActions>


            </Card>
        </Container>
    )
}