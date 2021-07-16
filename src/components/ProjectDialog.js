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

import { ColorPalette } from 'material-ui-color';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 0, 2, 0),
    minWidth: 120
  },
  dialogActionBar: {
    justifyContent: "space-between",
    padding: theme.spacing(1, 3)
  },
  projectSelect: {}
}))

          

const colorPalette = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  yellow: 'yellow',
  cyan: 'cyan',
  lime: 'lime',
  gray: 'gray',
  orange: 'orange',
  purple: 'purple',
  black: 'black',
  pink: 'pink',
  darkblue: 'darkblue',
};

function ProjectDialog(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [color, setColor] = useState('red');

  useEffect(() => {
    setName(props.project.name);
    setColor(props.project.color)
  }, [props.isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    let out = {
      id: null,
      name: name,
      color: color
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

  const handleColorUpdate = (e) => {
    setColor(e);
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClosing(null)} aria-labelledby="form-dialog-title" maxWidth="xs" className={classes.dialog} fullWidth >
      <form onSubmit={handleSubmit} >
        <DialogContent >
          <FormControl required className={classes.formControl} fullWidth >
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

          <FormControl required className={classes.formControl} fullWidth >
            <ColorPalette palette={colorPalette} onSelect={e => handleColorUpdate(e)} />
            {/* <ColorPicker defaultValue="white" hideTextfield onFocusOut={e => handleColorUpdate(e)}/> */}
          </FormControl>
        </DialogContent>


        <DialogActions className={classes.dialogActionBar} >
          <Button type="submit" color="primary" variant="contained" >
            Done
          </Button>
          <div className={classes.grow} />
          <Button color="secondary" variant="contained" onClick={() => (props.handleClosing(null))}  >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

}

export default ProjectDialog;