import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    AppBar,
    IconButton,
    Toolbar
} from '@material-ui/core'

import {
    Menu as MenuIcon,
    Add as AddIcon
} from '@material-ui/icons'



const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow:{
        flexGrow: 1
    }
}));

function TopBar(props) {

    const classes = useStyles();

    return (
        <AppBar color="primary" className={classes.appBar}>
            <Toolbar>
            <IconButton onClick={props.onOpenMenu} className={classes.menuButton}>
                <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <IconButton onClick={props.onAddTaskOpen}>
                <AddIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;