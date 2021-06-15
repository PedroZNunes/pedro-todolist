import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Button,
    List, ListItem, ListItemText,
    TextField, ListItemIcon} from '@material-ui/core';

import {Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider,
    Collapse} from '@material-ui/core';

import {EditOutlined as EditIcon,
    CheckOutlined as CheckIcon,
    Delete as DeleteIcon,
    Clear as CancelIcon,
    Menu as MenuIcon,
    Inbox as InboxIcon,
    Today as TodayIcon,
    Event as UpcomingIcon,
    FiberManualRecord as ProjectColorIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Add as AddIcon} from '@material-ui/icons';

function App() {

  const [edit, setEdit] = React.useState(false);
  const [projectsOpen, setProjectsOpen] = React.useState(true);

  const handleOpen = () => {
    setEdit(true);
  }

  const handleClose = () => {
    setEdit(false);
  }


  const handleProjectsOpen = () => {
    setProjectsOpen(!projectsOpen);
  };

  
  const dialogBody = (
    <Dialog open={edit} onClose={handleClose} aria-labelledby="form-dialog-title">

    <DialogContent>
      <TextField margin="dense" id="task-title" label="Task Title" variant="outlined" defaultValue="Old title of the Task" fullWidth autoFocus/>
      <TextField margin="dense" id="task-desc" label="Task Description" variant="outlined" defaultValue="Old description of the Task" fullWidth/>
    </DialogContent>

    <DialogActions>
      <IconButton color="primary" onClick={handleClose}>
        <CheckIcon />
      </IconButton>

      <Button color="secondary" onClick={handleClose}>
        <CancelIcon />
      </Button>
    </DialogActions>
  </Dialog>

  );


  return (
  <div className="App">
    <div id="app_background">
      <header id="top_bar" style={{backgroundColor:'#f50057', display:'flex', alignItems:'center', justifyContent:'center', paddingLeft: '48px', paddingRight:'48px'}}>
        <div id="top_bar_inner" style={{height: "100%", width: "100%", display: "flex", justifyContent: "space-between"}}>
            
          <div className="left_control" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <IconButton >
              <MenuIcon />
            </IconButton>
          </div>
          <div className="right_control" style={{display: 'flex', alignItems: 'center'}}>
            <IconButton >
              <AddIcon />
            </IconButton>

          </div>
        </div>
      </header>
      <div id="left_menu" style={{position:"fixed", left:"0", overflow: "hidden hidden", width: '305px'}}>
        <div id="list_holder" style={{width:"285px", backgroundColor:"#eee", height:"100vh", paddingTop:"10px" }}>
          <List style={{margin:"0 10px", listStyleType:"none", textAlign:"left"}}> 
            <ListItem divider={false} button style={{paddingTop: '0px', paddingBottom: '0px'}}>
            <IconButton
              variant="outlined"
              color="primary"
              href="/#"
            >
              <InboxIcon />
            </IconButton>
            <ListItemText 
              primary="Inbox" 
            />
            <ListItemText style={{textAlign: "right"}}
              primary="3" 
            />
            </ListItem>
            
            <ListItem divider={false} button style={{borderRadius:"5px", paddingTop: '0px', paddingBottom: '0px'}}>
            <IconButton
              variant="outlined"
              color="primary"
              href="/#"
            >
              <TodayIcon />
            </IconButton>
            <ListItemText 
              primary="Today" 
            />
            <ListItemText 
              style={{textAlign: "right"}}
              primary="5" 
            />
            </ListItem>
            
            <ListItem divider={false} button style={{borderRadius:"5px", paddingTop: '0px', paddingBottom: '0px'}}>
            
            
            <IconButton
              variant="outlined"
              color="primary"
              href="/#"
            >
              <UpcomingIcon />
            </IconButton>
            <ListItemText 
              primary="Upcoming" 
            />
            <ListItemText 
              style={{textAlign: "right"}}
              primary="9" 
            />
            </ListItem>
            
            <Divider style={{margin:"5px 0"}} />
            
            <ListItem button onClick={handleProjectsOpen} style={{borderRadius:"5px"}}>
              <IconButton variant="outlined" style={{paddingTop:"0px", paddingBottom:"2px"}}>
                {projectsOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
              <ListItemText primary="Projects" />
            </ListItem>

            <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ paddingLeft: "15px"}}>
                
                <ListItem button style={{borderRadius:"5px"}}>
                  <IconButton variant="outlined" style={{paddingTop:"0px", paddingBottom:"2px"}} >
                    <ProjectColorIcon style={{color:"red"}} />
                  </IconButton>
                  <ListItemText primary="Project 1" />
                </ListItem>

                <ListItem button style={{borderRadius:"5px"}}>
                  <IconButton variant="outlined" style={{paddingTop:"0px", paddingBottom:"2px"}}>
                    <ProjectColorIcon />
                  </IconButton>
                  <ListItemText primary="Project 2" />
                </ListItem>
              </List>
            </Collapse>
            
          </List>
        </div>


      </div>
      <main id="content" style={{minHeight: '380px', 
        backgroundColor: '#fff',
        marginLeft: '305px',
        borderRight: '1px solid #f1f1f1',
        position: 'relative',
        overflow: 'hidden auto'}}>
      <List> 
        <ListItem divider={true}>
          <ListItemText 
            
            secondary="My first task to do on the day. the very first one. And it is very specific. Like VERY specific." 
          />
          <IconButton
            variant="outlined"
            
            color="primary"
            href="/#"
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={handleOpen}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            color="secondary"
            href="/#"
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>

        <ListItem divider={true}>
          <ListItemText 
            secondary="My second task" 
          />
          <IconButton
            variant="outlined"
            color="primary"
            href="/#"
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={handleOpen}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            color="secondary"
            href="/#"
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>

        <ListItem divider={true}>
          <ListItemText 
            secondary="My third task" 
          />
          <IconButton
            variant="outlined"
            color="primary"
            href="/#"
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={handleOpen}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            color="secondary"
            href="/#"
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      </List>
      </main>

        {dialogBody}
      </div>
    </div>
  );
}

export default App;
