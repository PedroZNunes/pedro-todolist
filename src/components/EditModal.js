import React from 'react';

import {
    Dialog,
    TextField,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'

import {
    Clear as CancelIcon,
} from '@material-ui/icons'

function EditModal(props) {
  let newTaskDescription = props.task.description;
  
  const updateDescription = (newDescription) => {
    newTaskDescription = newDescription;
  }

  const onSend = () => {
    let editedTask = props.task;
    editedTask.description = newTaskDescription;
    console.log(`edited task:`); 
    console.log(editedTask); 
    props.handleClosing(editedTask);
  }

  return (
      <Dialog open={props.isOpen} onClose={props.handleClosing} aria-labelledby="form-dialog-title" maxWidth="xl" >
      <div className="dialog-container" style={{padding:"2px 6px"}}>
        <DialogContent >
          <TextField rowsMax={6} multiline={true} margin="dense" id="task-desc" label="Task Description" variant="outlined" defaultValue={props.task.description} onChange={(e) => updateDescription(e.target.value)} />
        </DialogContent>

        <DialogActions style={{justifyContent:"space-between", padding:"6px 24px"}}>
          <Button color="primary" variant="contained" onClick={ onSend } >
            Done
          </Button>

          <Button color="secondary" variant="contained" onClick={ ()=> (props.handleClosing(null)) }>
            <CancelIcon />
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default EditModal;