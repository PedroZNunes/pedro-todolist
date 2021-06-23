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

function AddModal(props) {

    const [description, setDescription] = React.useState('');

    const onSend = () => {
        const task = {
            id: 0,
            description: description
        };

        props.handleClosing(task);
    }

    const onUpdateDescription = (e) => {
        setDescription(e);
    }

    return (
        <Dialog open={props.isOpen} onClose={props.handleClosing} aria-labelledby="form-dialog-title" maxWidth="xl" >
        <div className="dialog-container" style={{padding:"2px 6px"}}>
          <DialogContent >
            <TextField rowsMax={6} multiline={true} margin="dense" id="task-desc" label="Task Description" variant="outlined" placeholder="new task, lets goooo!" onChange={ e => onUpdateDescription(e.target.value) }/>
          </DialogContent>
  
          <DialogActions style={{justifyContent:"space-between", padding:"6px 24px"}}>
            <Button color="primary" variant="contained" onClick={onSend}>
                Add Task
            </Button>
  
            <Button color="secondary" variant="contained" onClick={()=>(props.handleClosing(null))}>
              <CancelIcon />
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
}
export default AddModal;