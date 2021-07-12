import React, { useState, useEffect } from 'react';

import {
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  FormControl,
  MenuItem,
  Select
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  dialogActionBar: {
    justifyContent: "space-between",
    padding: theme.spacing(1, 3)
  },
  projectSelect: {}
}))

function TaskDialog(props) {
  const classes = useStyles();
  
  const [description, setDescription] = useState(props.task?.description);

  const [projectID, setProjectID] = useState(props.task?.projectID );
  
  const [id, setID] = useState(props.task?.id );

  useEffect(() => {
    setDescription(props.task.description);
    setProjectID(props.task.projectID);
    setID(props.task.id);
  }, [props.isOpen])

  // if ( !isNewTask ) {
  //   setDescription(props.task.description);
  //   setProjectID(props.task.projectID);
  // }

  // let task = {}
  // if (props.task === undefined) {
  //   task = {
  //     id: null,
  //     description: '',
  //     projectID: props.projects[0].id
  //   }
  // } else {
  //   task = props.task;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    let out = {
      id: id,
      description: description,
      projectID: projectID
    }

    console.log('sending');
    console.log(out);

    props.handleClosing(out);
  }

  const handleProjectUpdate = (e) => {
    setProjectID(e.target.value);
    console.log(projectID);
  
  }

  const handleDescriptionUpdate = (e) => {
    if (e.nativeEvent.inputType === 'insertLineBreak') {
      handleSubmit();
      return;
    }
    setDescription(e.target.value);
    console.log(description);
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClosing(null)} aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.dialog} fullWidth >
      <form onSubmit={handleSubmit}>
        <DialogContent >
          <FormControl required className={classes.formControl}>
            <TextField
              multiline
              rowsMax={4}
              required
              autoFocus
              onFocus={(e) => {
                //getting the carret to last position on first focus
                let temp_value = e.target.value
                e.target.value = ''
                e.target.value = temp_value
              }}
              margin="dense"
              id="task-desc"
              label="Task Description"
              variant="outlined"
              placeholder={"what u gon do?"}
              onChange={e => handleDescriptionUpdate(e)}
              fullWidth
              defaultValue={description}
            />
          </FormControl>

          <FormControl required className={classes.formControl}>
            <Select
              // value={task.projectID}
              value={projectID}
              onChange={e => handleProjectUpdate(e)}
              className={classes.projectSelect}
            >
              {// get projects array. update array on app.js? maybe update async
                props.projects.map((project) => (
                    <MenuItem value={project.id}>
                      {project.name.toString()}
                    </MenuItem>
                ))
              }
            </Select>
          </FormControl>

        </DialogContent>


        <DialogActions className={classes.dialogActionBar}>
          <Button type="submit" color="primary" variant="contained" >
            Done
          </Button>
          <div className={classes.grow} />
          <Button color="secondary" variant="contained" onClick={() => (props.handleClosing(null))}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default TaskDialog;