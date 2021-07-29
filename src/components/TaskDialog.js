import React, { useState, useEffect } from 'react';

import moment from 'moment';

import {
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  FormControl,
  MenuItem,
  Select,InputLabel
} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  dialog:{
    minWidth: 120
  },
  dialogContent: {
    display: 'flex', 
    flexFlow:'row wrap', 
    justifyContent:'space-between'
  },
  formControl: {
    margin: theme.spacing(3,0,0,0),
    minWidth: 120,
    flexGrow: 1
  },
  dialogActionBar: {
    padding: theme.spacing(3, 3)
  },
  grow: {
    minWidth:theme.spacing(3),
    flexGrow: 1
  },
  description: {
    flexGrow: 1
  },
}))

function TaskDialog(props) {
  const classes = useStyles();

  const [description, setDescription]   = useState(props.task.description ?? '');

  const [projectID, setProjectID]       = useState(props.task.projectID   ?? 0);

  const [id, setID]                     = useState(props.task.id          ?? null);

  const [dueDate, setDueDate]           = useState(props.task.date ?? moment());
  
  const getDateToScreen = () => {
    //let newDate = dueDate.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replaceAll('. ', '-').replaceAll('.', '')
    let newDate = dueDate.format("YYYY-MM-DD");
    return newDate;
  }

  useEffect(() => {
    setDescription(props.task.description ?? '');
    setProjectID(props.task.projectID ?? 0);
    setID(props.task.id         ?? null);
    setDueDate(props.task.date  ?? moment())
    console.log(props.task.date ?? moment())
  }, [props.isOpen])


  const handleDescriptionUpdate = (e) => {
    if (e.nativeEvent.inputType === 'insertLineBreak') {
      handleSubmit();
      return;
    }
    setDescription(e.target.value);
    console.log(description);

  }

  const handleProjectUpdate = (e) => {
    setProjectID(e.target.value);
    console.log(projectID);

  }
  
  const handleDateUpdate = (e) => {
    // let tempDate  = new Date(e.target.valueAsNumber);
    // let offset    = tempDate.getTimezoneOffset() * 60 * 1000;
    // let newDate   = new Date(e.target.valueAsNumber + offset)

    let tempDate = e.target.value + " +0000";
    let date = moment(tempDate, "YYYY-MM-DD Z");
    console.log( date.utc() );
    setDueDate(date);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let out = {
      id: id,
      description: description,
      projectID: projectID,
      date: dueDate
    }

    props.handleClosing(out);
  }


  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClosing(null)} aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.dialog} fullWidth >
      <form onSubmit={handleSubmit}>
        <DialogContent >
          <FormControl required className={classes.formControl, classes.description} fullWidth>
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
              id="task-desc"
              label="Task Description"
              variant="outlined"
              placeholder={"what u gon do?"}
              onChange={e => handleDescriptionUpdate(e)}
              defaultValue={description}
            />
          </FormControl>
        </DialogContent>
        <DialogContent className={classes.dialogContent}>
          <FormControl required className={classes.formControl} style={{maxWidth: '188px'}}>
            <InputLabel style={{transform: 'translate(14px, -6px) scale(0.75)'}}> Project </InputLabel>
            <Select
              id="project"
              variant="outlined"
              label="Project *"
              value={projectID}
              onChange={e => handleProjectUpdate(e)}
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
          <FormControl required className={classes.formControl} style={{maxWidth: '188px'}}>
          <TextField
            id="date"
            variant="outlined"
            label="Due"
            type="date"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={getDateToScreen()}
            onChange={e => handleDateUpdate(e)}
            onChangeRaw={(e) => e.preventDefault()}
          />
          </FormControl>

        </DialogContent>

        <DialogActions className={classes.dialogActionBar}>
          <Button color="secondary" variant="contained" size="large" onClick={() => (props.handleClosing(null))}>
            Cancel
          </Button>
          <div className={classes.grow} />
          <Button type="submit" color="primary" size="large" variant="contained" >
            Done
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default TaskDialog;