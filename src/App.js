import './App.css';

import React, { useEffect } from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline
} from '@material-ui/core';


import LeftMenu from './components/LeftMenu'
import TopBar from './components/TopBar'
import Content from './components/Content';
import TaskDialog from './components/TaskDialog';
import ProjectDialog from './components/ProjectDialog';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    height: 'fit-content'

  },
  content: {
    height: 'fit-content'
  }
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
      projectID: 2,
      date: new Date(2021, 7, 28)
    },
    {
      id: 1,
      description: "sleep",
      projectID: 2,
      date: new Date(2021, 9, 28)
    },
    {
      id: 2,
      description: "take dog outside",
      projectID: 2,
      date: new Date(2021, 7, 28)
    },
    {
      id: 3,
      description: "get GC in RL",
      projectID: 0,
      date: new Date(2021, 6, 28)
    },
    {
      id: 4,
      description: "finish project",
      projectID: 1,
      date: new Date(2021, 10, 28)
    },
    {
      id: 5,
      description: "get a job",
      projectID: 1,
      date: new Date(2021, 11, 28)
    },
    {
      id: 6,
      description: "trip to TI",
      projectID: 0,
      date: new Date(2021, 6, 20)
    },
    {
      id: 7,
      description: "get decent chair",
      projectID: 0,
      date: new Date(2021, 6, 19)
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
        projectID: 0,
        date: new Date()
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
  const [allProjects, setAllProjects] = useState([
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

  const [projectToEdit, setProjectToEdit] = useState({});

  const [projectDialogState, setProjectDialogState] = useState(false);

  const handleProjectDialogOpen = (e, project) => {
    let newProject = {}
    if (project === null) {
      console.log('adding new project');
      let newID = 0;
      allProjects.forEach((project) => {
        if (project.id >= newID)
          newID = project.id + 1;
      })
      newProject = {
        id: newID,
        name: '',
        color: 'red',
      }
    }
    else {
      console.log('editing existing task');
      newProject = project;
    }

    setProjectToEdit(newProject);
    setProjectDialogState(true);
  }

  const handleProjectDialogClose = (newProject) => {
    setProjectDialogState(false);
    addOrUpdateProject(newProject);
  }

  const addOrUpdateProject = (newProject) => {
    if (newProject === null) {
      console.log("no task returned by the task dialog");
      return;
    }
    //add
    if (newProject.id === null) {
      newProject.id = allProjects[allProjects.length - 1].id + 1;
      let joined = allProjects.concat(newProject);
      setAllProjects(joined);
      console.log(joined);
    }
    //edit
    else {
      let tempProjects = [...allProjects];

      let isEdited = false;

      tempProjects.map((project) => {
        if (project.id === newProject.id) {
          project.name = newProject.name;
          project.color = newProject.color;
          isEdited = true;
        }
        return tempProjects;
      })

      if (!isEdited)
        tempProjects.push(newProject);

      setAllProjects(tempProjects);
      console.log(tempProjects);
    }

  }

  const handleProjectDelete = (project) => {
    console.log("project deleted.");

    let tempProjects = [...allProjects];
    const index = tempProjects.indexOf(project);
    if (index > -1) {
      tempProjects.splice(index, 1);
    }
    console.log(tempProjects);
    setAllProjects(tempProjects);

    if (projectIDOnScreen === project.id)
      setProjectIDOnScreen(null);

    let tempTasks = []
    allTasks.forEach((task) => {
      if (task.projectID !== project.id)
        tempTasks.push(task);
    })

    console.log(tempTasks);
    setAllTasks(tempTasks);
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
  }, [allProjects, projectIDOnScreen, allTasks]);

  //#endregion

  return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar
          onOpenMenu={onMenuOpen}
          handleAddTaskOpen={handleTaskDialogOpen}
        />
        <LeftMenu
          isOpen={menuOpen}
          handleClose={onMenuClose}
          drawerWidth={drawerWidth}
          handleProjectFilter={handleProjectFilter}
          handleProjectEdit={addOrUpdateProject}
          handleProjectDelete={handleProjectDelete}
          handleAddProjectOpen={handleProjectDialogOpen}
          projects={allProjects}
        />
        <Content
          tasks={tasksOnScreen}
          handleTaskDialogOpen={handleTaskDialogOpen}
          onTaskDone={onTaskDone}
          projects={allProjects}
          className={classes.content}
        />

        <TaskDialog
          isOpen={taskDialogState}
          handleClosing={handleTaskDialogClose}
          projects={allProjects}
          task={taskToEdit}
        />

        <ProjectDialog
          isOpen={projectDialogState}
          handleClosing={handleProjectDialogClose}
          projects={allProjects}
          project={projectToEdit}
        />

      </div>
  );
}

export default App;
