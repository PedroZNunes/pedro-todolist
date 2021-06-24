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

  form: {
    flexGrow:1,
    flexShrink: 1
  },
  formControl: {
    margin: theme.spacing(1),
  },
  dialogActionBar: {
    justifyContent: "space-between",
    padding: theme.spacing(1, 3) 
  }
}))

function TaskDialog(props) {

  const [description, setDescription] = React.useState(() => (props.type === 'add') ? '' : props.task.description);
  const classes = useStyles();

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

    setDescription(e.target.value);
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClosing(null)} aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.dialog} fullWidth >
      <form onSubmit={onSend} className={classes.form}>
        <DialogContent >
          <TextField
            multiline
            rowsMax={4}
            required
            autoFocus
            margin="dense"
            id="task-desc"
            label="Task Description"
            variant="outlined"
            placeholder="new task, lets goooo!"
            onChange={e => onUpdateDescription(e)}
            fullWidth
            defaultValue={(props.type === 'edit') ? props.task.description : ''}
          />
        </DialogContent>

        <DialogActions className={classes.dialogActionBar}>
          <Button type="submit" color="primary" variant="contained">
            {(props.type === 'add' ) ? 'Add Task' : 'Done'}
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