import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline
} from '@material-ui/core';


import Menu from './components/Menu'
import TopBar from './components/TopBar'
import Content from './components/Content';
import TaskDialog from './components/TaskDialog';
import ProjectDialog from './components/ProjectDialog';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
}));


function App() {
  const classes = useStyles();

//#region menu
  const [menuOpen, setMenuOpen] = useState(false);
  const onMenuOpen = () => setMenuOpen(true);
  const onMenuClose = () => setMenuOpen(false);

  const filterTasks = (projectID) => {
    console.log(`filtering by project id: ${projectID}`);
    if (projectID === null) {
      setTasksOnScreen(allTasks);
      return;
    }

    let filteredTasks = [];
    allTasks.forEach((task) => {
      if (task.projectID === projectID) {
        filteredTasks.push(task);
      }
    })
    setTasksOnScreen(filteredTasks);
    console.log(filteredTasks);
  }
//#endregion

  //#region tasks
  // this will later be changed when I get the backend working
  
  const [allTasks, setAllTasks] = useState([
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

  const [taskDialogState, setTaskDialogState] = useState(false);

  const handleTaskDialogOpen = (task) => {
    let outTask;
    if (task === null) {
      console.log('adding new task');
      let newID = 0;
      allTasks.forEach((task) => {
        if (task.id >= newID)
          newID = task.id + 1;
      })

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


  const [taskToEdit, setTaskToEdit] = useState({ id: 0, description: null });

  const onTaskDone = (task, isDone) => {
    (isDone) ?
      console.log("completed task. logging data") :
      console.log("task deleted. no logging.");

    let tempTasks = [...allTasks];
    const index = tempTasks.indexOf(task);
    if (index > -1) {
      tempTasks.splice(index, 1);
    }
    console.log(tempTasks);
    console.log(allTasks);

    setAllTasks(tempTasks);
  }

  const addOrUpdateTask = (newTask) => {
    if (newTask === null) {
      console.log("no task returned by the task dialog");
      return;
    }

    // add
    if (newTask.id === null) {
      newTask.id = allTasks[allTasks.length - 1].id + 1;
      let joined = allTasks.concat(newTask);
      setAllTasks(joined);
      console.log(joined);
    }
    // edit
    else {
      let tempTasks = [...allTasks];

      let isEdited = false;

      tempTasks.map((task) => {
        if (task.id === newTask.id) {
          task.description = newTask.description;
          task.projectID = newTask.projectID;
          isEdited = true;
        }
        return tempTasks;
      })

      if (!isEdited)
        tempTasks.push(newTask);

      setAllTasks(tempTasks);
      console.log(tempTasks);
    }

  }
//#endregion

//#region projects
  const [projects, setProjects] = useState([
    {
      id: 0,
      name: 'Alpha',
      color: '#aa0000'
    },
    {
      id: 1,
      name: 'Phoenix',
      color: '#a4a4a4'
    },
    {
      id: 2,
      name: 'House',
      color: '#cc33cc'
    }
  ]);

  const [projectToEdit, setProjectToEdit] = useState({ id: 0, name: null });
  
  const [projectDialogState, setProjectDialogState] = useState(false);
  
  const handleProjectDialogOpen = (project) => {
    console.log('adding new project');
    let newID = 0;
    projects.forEach((project) => {
      if (project.id >= newID)
      newID = project.id + 1;
    })
    let newProject = {
      id: newID,
      name: ''
    }
    
    setProjectToEdit(newProject);
    setProjectDialogState(true);
  }
  
  const handleProjectDialogClose = (newProject) => {
    setProjectDialogState(false);
    addProject(newProject);
  }
  
  const addProject = (newProject) => {
    newProject.id = projects[projects.length - 1].id + 1;
    let joined = projects.concat(newProject);
    setProjects(joined);
    console.log(joined);
  }
  
  const handleProjectFilter = (projectID) => {
    setProjectIDOnScreen(projectID)
  }
  //#endregion
  
  //#region filter
  const [projectIDOnScreen, setProjectIDOnScreen] = useState(null);
  const [tasksOnScreen, setTasksOnScreen] = useState(allTasks);
  
  // update tasks on screen
  useEffect(() => {
    filterTasks(projectIDOnScreen);
  }, [projects, projectIDOnScreen]);
  
  //#endregion

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar
        onOpenMenu={onMenuOpen}
        handleAddTaskOpen={handleTaskDialogOpen}
      />
      <Menu
        isOpen={menuOpen}
        handleClose={onMenuClose}
        drawerWidth={drawerWidth}
        handleProjectFilter={handleProjectFilter}
        handleAddProjectOpen={handleProjectDialogOpen}
        projects={projects}
      />
      <Content
        tasks={tasksOnScreen}
        handleTaskDialogOpen={handleTaskDialogOpen}
        onTaskDone={onTaskDone}
        projects={projects}
      />

      <TaskDialog
        isOpen={taskDialogState}
        handleClosing={handleTaskDialogClose}
        projects={projects}
        task={taskToEdit}
      />

      <ProjectDialog
        isOpen={projectDialogState}
        handleClosing={handleProjectDialogClose}
        projects={projects}
        project={projectToEdit}
      />

    </div>
  );
}

export default App;
