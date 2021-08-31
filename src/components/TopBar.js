import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

import {
    Menu as MenuIcon,
    Add as AddIcon
} from '@material-ui/icons'

import { useAuth } from '../contexts/AuthContext';

import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1
    }
}));



function TopBar(props) {

    const classes = useStyles();
    const { currentUser, logout } = useAuth();

    const [error, setError] = useState();

    const history = useHistory();

    const handleLogout = async () => {
        setError('');
        try{
            await logout();
            history.push("/login");
        } 
        catch{
            setError('Failed to log out');
        }
    }
    return (
        <AppBar color="primary" className={classes.appBar}>
            <Toolbar>
                <Typography variant="subtitle"> {currentUser.email} </Typography>
                <Link to="/update-profile" style={{ textDecoration: 'none' }}>
                    <Button>
                        Update Profile
                    </Button>
                </Link>

                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                
                <IconButton onClick={props.onOpenMenu} className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <div className={classes.grow} />
                <IconButton onClick={() => props.handleAddTaskOpen(null)}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;