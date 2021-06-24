import React from 'react';

import {
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
  },
  dialogActionBar: {
    justifyContent: "space-between",
    padding: theme.spacing(1, 3) 
  }
}))

function TaskDialog(props) {

  const classes = useStyles();

  let description = (props.task === undefined) ? '' : props.task.description;
  console.log(description);
  

  const onSend = () => {
    const task = {
      id: (props.type === 'add') ? null : props.task.id,
      description: description
    };

    console.log(task); 

    props.handleClosing(task);
  }

  const onUpdateDescription = (e) => {
    if(e.nativeEvent.inputType === 'insertLineBreak'){
      onSend();
      return;
    }

    description = e.target.value;
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClosing(null)} aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.dialog} fullWidth >
      <DialogContent >
        <TextField
          multiline
          rowsMax={4}
          required
          autoFocus
          onFocus={(e) => {
            let temp_value = e.target.value
            e.target.value = ''
            e.target.value = temp_value
          }}
          margin="dense"
          id="task-desc"
          label="Task Description"
          variant="outlined"
          placeholder={(props.type === 'add' ) ? "new task, lets goooo!" : ''}
          onChange={e => onUpdateDescription(e)}
          fullWidth
          defaultValue={description}
        />
      </DialogContent>

      <DialogActions className={classes.dialogActionBar}>
        <Button type="submit" color="primary" variant="contained" onClick={onSend} >
          {(props.type === 'add' ) ? 'Add Task' : 'Done'}
        </Button>
        <div className={classes.grow} />
        <Button color="secondary" variant="contained" onClick={() => (props.handleClosing(null))}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default TaskDialog;