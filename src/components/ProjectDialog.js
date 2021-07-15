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

import { ColorPicker } from 'material-ui-color';

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

function ProjectDialog(props) {
  const classes = useStyles();

  const [name, setName] = useState('');

  useEffect(() => {
    setName(props.project.name);
  }, [props.isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    let out = {
      name: name,
    }
    props.handleClosing(out);
  }

  const handleNameUpdate = (e) => {
    if (e.nativeEvent.inputType === 'insertLineBreak') {
      handleSubmit();
      return;
    }
    setName(e.target.value);
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClosing(null)} aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.dialog} fullWidth >
      <form onSubmit={handleSubmit} >
        <DialogContent >
          <FormControl required className={classes.formControl} >
            <TextField
              required
              autoFocus
              margin="dense"
              id="task-desc"
              label="Task Description"
              variant="outlined"
              placeholder={"what u gon do?"}
              onChange={e => handleNameUpdate(e)}
              fullWidth
              defaultValue={name}
            />
          </FormControl>

          <FormControl required >
            <ColorPicker defaultValue="white" hideTextfield/>
          </FormControl>
        </DialogContent>


        <DialogActions className={classes.dialogActionBar} >
          <Button type="submit" color="primary" variant="contained" >
            Done
          </Button>
          <div className={classes.grow} />
          <Button color="secondary" variant="contained" onClick={() => (props.handleClosing(null))} >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

}

export default ProjectDialog;