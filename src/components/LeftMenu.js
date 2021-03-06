import React from 'react';

import { makeStyles, useTheme  } from '@material-ui/core/styles';


import {
    Drawer, Hidden, Toolbar,
} from '@material-ui/core';

import MenuBody from './MenuBody'


const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]:{
            width: props => props.drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper:{
        width: props => props.drawerWidth,
    },
}));

function LeftMenu(props) {

    const classes = useStyles(props);
    const theme = useTheme();

    return (
        <nav>
            <Hidden smUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.isOpen}
                onClose={props.handleClose}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                <MenuBody />
            </Drawer>
            </Hidden>

            <Hidden xsDown implementation="css">
            <Drawer 
                variant="permanent" 
                className={classes.drawer}
                classes={{
                paper: classes.drawerPaper
                }}
                open 
                onClose={props.handleClose}
            >
                <Toolbar />
                <MenuBody 
                    projects={props.projects} 
                    handleProjectFilter={props.handleProjectFilter}
                    handleDateFilter={props.handleDateFilter}
                    handleAddProjectOpen={props.handleAddProjectOpen}
                    handleProjectDelete={props.handleProjectDelete}
                />
            </Drawer>
            </Hidden> 

        </nav>
    );
}

export default LeftMenu;