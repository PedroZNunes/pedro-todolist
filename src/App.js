import './App.css';
import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline
} from '@material-ui/core';

import Menu from './components/Menu'
import TopBar from './components/TopBar'
import Content from './components/Content';
import TaskDialog from './components/TaskDialog';
import { SortByAlpha } from '@material-ui/icons';


const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));


function App() {

  const classes = useStyles();


  // this will later be changed when I get the backend working
  const [tasks, setTasks] = useState([
    {
      id: 0,
      description: "eat",
      projectID: 2
    },
    {
      id: 1,
      description: "sleep",
      projectID: 2
    },
    {
      id: 2,
      description: "take dog outside",
      projectID: 2
    },
    {
      id: 3,
      description: "get GC in RL",
      projectID: 0
    },
    {
      id: 4,
      description: "finish project",
      projectID: 1
    },
    {
      id: 5,
      description: "get a job",
      projectID: 1
    },
    {
      id: 6,
      description: "trip to TI",
      projectID: 0
    },
    {
      id: 7,
      description: "get decent chair",
      projectID: 0
    }
  ]);

  let projects = 
  [
    {
      id:     0,
      name:   'Alpha', 
      color:  '#f1f1f1'
    },
    {
      id:     1,
      name:   'Phoenix', 
      color:  '#a4a4a4'
    },
    {
      id:     2,
      name:   'House', 
      color:  '#cc33cc'
    }
  ]

  const [menuOpen, setMenuOpen] = useState(false);
  const onMenuOpen = () => setMenuOpen(true);
  const onMenuClose = () => setMenuOpen(false);

  const [taskDialogState, setTaskDialogState] = useState(false);
  const handleTaskDialogOpen = (task) => {
    let outTask;
    if (task === null) {
      console.log('adding new task');
      let newID = 0;
      tasks.forEach((task) => {
        if (task.id >= newID)
          newID = task.id + 1;
      }
    )
      outTask = {
        id: newID,
        description: '',
        projectID: 0
      }

    }
    else {
      console.log('editing existing task');
      outTask = task;
    }
    setTaskToEdit(outTask);
    setTaskDialogState(true);
  }

  const handleTaskDialogClose = (newTask) => {
    setTaskDialogState(false);
    addOrUpdateTask(newTask);
  }

  // const [editOpen, setEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({ id: 0, description: null });
  // const onEditOpen = (task) => {
  //   console.log('edit open');
  //   setTaskToEdit(task);
  //   setTaskDialogState(true);
  // }
  // const onEditClose = (newTask) => {
  //   setEditOpen(false);
  //   addOrUpdateTask(newTask);
  // }

  const onTaskDone = (task, isDone) => {
    (isDone) ? 
      console.log("completed task. logging data") :
      console.log("task deleted. no logging.") ; 

    let tempTasks = [...tasks];
    const index = tempTasks.indexOf(task);
    if (index > -1) {
      tempTasks.splice(index, 1);
    }
    console.log(tempTasks);
    console.log(tasks);

    setTasks(tempTasks);
  }

  const addOrUpdateTask = (newTask) => {
    if (newTask === null) {
      console.log("no task returned by the task dialog");
      return;
    }

    // add
    if (newTask.id === null) {
      newTask.id = tasks[tasks.length - 1].id + 1;
      let joined = tasks.concat(newTask);
      setTasks(joined);
      console.log(joined);
    } 
    // edit
    else {
      let tempTasks = [...tasks];
      
      let isEdited = false;
      
      tempTasks.map((task) => {
        if (task.id === newTask.id) {
          task.description = newTask.description;
          task.projectID = newTask.projectID;
          isEdited = true;
        }
        return tempTasks;
      })

      if(!isEdited)
        tempTasks.push(newTask);
        
      setTasks(tempTasks);
      console.log(tempTasks);
    }

  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar onOpenMenu={onMenuOpen} handleAddTaskOpen={handleTaskDialogOpen} />
      <Menu isOpen={menuOpen} handleClose={onMenuClose} drawerWidth={drawerWidth} />
      <Content tasks={tasks} handleTaskDialogOpen={handleTaskDialogOpen} onTaskDone={onTaskDone} projects={projects} />
      <TaskDialog isOpen={taskDialogState} handleClosing={handleTaskDialogClose} projects={projects} task={taskToEdit} />
    </div>
  );
}

export default App;
