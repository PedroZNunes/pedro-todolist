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
    },
    {
      id: 1,
      description: "sleep",
    },
    {
      id: 2,
      description: "take dog outside",
    },
    {
      id: 3,
      description: "get GrandChampion in Rocket League",
    },
    {
      id: 4,
      description: "finish todo project",
    },
    {
      id: 5,
      description: "get a job",
    }
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const onMenuOpen = () => setMenuOpen(true);
  const onMenuClose = () => setMenuOpen(false);

  const [addOpen, setAddOpen] = useState(false);
  const onAddOpen = () => setAddOpen(true);
  const onAddClose = (newTask) => {
    setAddOpen(false);
    addTask(newTask);
  }

  const [editOpen, setEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({ id: 0, description: null });
  const onEditOpen = (task) => {
    console.log('edit open');
    setTaskToEdit(task);
    setEditOpen(true);
  }
  const onEditClose = (newTask) => {
    setEditOpen(false);
    editTask(newTask);
  }

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

  const addTask = (newTask) => {
    if (newTask === null) {
      console.log("no task returned by new task dialog");
      return;
    }

    let lastID = 0;
    tasks.forEach((task) => {
      lastID = (lastID < task.id) ? task.id : lastID;
    });

    newTask.id = lastID + 1;

    let joined = tasks.concat(newTask);
    setTasks(joined);
    console.log(joined);
  }

  const editTask = (editedTask) => {
    if (editedTask === null) {
      console.log('editing canceled');
      return;
    }

    let tempTasks = [...tasks];
    tempTasks.map((task) => {
      if (task.id === editedTask.id) {
        task.description = editedTask.description;
      }
      return tempTasks;
    })
    setTasks(tempTasks);
    console.log(tempTasks);
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar onOpenMenu={onMenuOpen} onAddTaskOpen={onAddOpen} />
      <Menu isOpen={menuOpen} handleClose={onMenuClose} drawerWidth={drawerWidth} />
      <Content tasks={tasks} onEditOpen={onEditOpen} onTaskDone={onTaskDone} />
      <TaskDialog isOpen={addOpen} handleClosing={onAddClose} type="add" />
      <TaskDialog isOpen={editOpen} handleClosing={onEditClose} type="edit" task={taskToEdit} />
    </div>
  );
}

export default App;
