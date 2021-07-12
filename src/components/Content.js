import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    Toolbar
} from '@material-ui/core';

import TasksView from './TasksView'

const useStyles = makeStyles((theme) => ({
    content: {
    width: props => `calc(100% - ${props.drawerWidth}px)`,
    flexGrow: 1,
    minHeight: '380px', 
    backgroundColor: '#fff',
    borderRight: '1px solid #f1f1f1',
  },
  editor:{
    verticalAlign: "top",
    paddingBottom: "84px",
    minWidth: "325px"
  }
}));

function Content(props) {
    const classes = useStyles(props);
    
        return (
        <main className={classes.content}>
            <Toolbar />
            <div id="editor" className={classes.editor}>
                <TasksView projects={props.projects} tasks={props.tasks} handleTaskDialogOpen={props.handleTaskDialogOpen} onTaskDone={props.onTaskDone} />
            </div>
        </main>
    );
}

export default Content;