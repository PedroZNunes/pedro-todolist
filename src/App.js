import './App.css';
import React from 'react';
import clsx from 'clsx';

import { makeStyles, useTheme  } from '@material-ui/core/styles';

import {IconButton, Button,
    List, ListItem, ListItemText,
    TextField, ListItemIcon} from '@material-ui/core';

import {Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider,
    Collapse, Typography,
    ListSubheader,
    Drawer, Hidden, AppBar, Toolbar,
    CssBaseline} from '@material-ui/core';

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


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow:{
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]:{
      width: drawerWidth,
      flexShrink: 0,
    }
      
  },
  drawerPaper:{
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    flexGrow: 1,
    minHeight: '380px', 
    backgroundColor: '#fff',
    borderRight: '1px solid #f1f1f1',
  },
  editor:{
    verticalAlign: "top",
    paddingBottom: "84px",
    minWidth: "325px"
  }
}));



function App() {

  const [edit, setEdit] = React.useState(false);
  const [projectsOpen, setProjectsOpen] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);

  let isMenuOpen;
  const classes = useStyles();
  const theme = useTheme();

  const handleEditOpen = () => {
    setEdit(true);
  }

  const handleEditClose = () => {
    setEdit(false);
  }

  const handleMenuClose = () => {
    setMenuOpen(false);
  }

  const handleProjectsOpen = () => {
    setProjectsOpen(!projectsOpen);
  };

  const handleDone = () => {
    console.log ("completing task");
  }

  const handleToggleMenu = () => {
    isMenuOpen = !menuOpen;
    setMenuOpen(isMenuOpen);
  }

  const flexTest = (
    <div style={{display:'flex', flexDirection:'column', height:'500px'}}>
      <div style={{backgroundColor:"red", flexGrow:'0', height:'50px'}}>

      </div>
      <div style={{backgroundColor:"blue", flexGrow:'2', display:'flex', flexDirection:'row'}}>
        <div style={{backgroundColor:"cyan", flexGrow:'1'}} />
        <div style={{backgroundColor:"green", flexGrow:'1'}} />
      </div>
      <div style={{backgroundColor:"yellow", flexGrow:'1'}}>

      </div>
    </div>
  )
  
  const dialogBody = (
    <Dialog open={edit} onClose={handleEditClose} aria-labelledby="form-dialog-title" maxWidth="xl" >
      <div className="dialog-container" style={{padding:"2px 6px"}}>
        <DialogContent >
          <TextField rowsMax={6} multiline={true} margin="dense" id="task-desc" label="Task Description" variant="outlined" defaultValue="Old description of the Task" />
        </DialogContent>

        <DialogActions style={{justifyContent:"space-between", padding:"6px 24px"}}>
          <Button color="primary" variant="contained">
            Add Task
          </Button>

          <Button color="secondary" variant="contained" onClick={handleEditClose}>
            <CancelIcon />
          </Button>
        </DialogActions>
      </div>
    </Dialog>

  );

  const drawerBody = (
      <div id="list_holder" style={{backgroundColor:"#eee", height:"100vh", paddingTop:"10px", overflow: 'auto' }}>
        <List style={{padding:"0 10px", listStyleType:"none", textAlign:"left"}}> 
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
  );

  const tasks = (
    <div id="view_content">
      <List subheader={
        <ListSubheader component="div" id="list-subheader">
          <b>Overview</b>
        </ListSubheader> }
      > 
        <ListItem button style={{borderRadius:"5px", paddingLeft:"0px"}}>
          <IconButton
            variant="outlined"
            onClick={handleDone}
            style={{margin:"0 5px"}}
          >
            <CheckIcon color="primary" />
          </IconButton>
          <ListItemText 
            primary="My firaaaaaaaaaaaast task to do on the day. the very first one. And it is very specific. Like VERY specific." 
            secondary="Today"
          />
          <span style={{position:"absolute", right:"5px", bottom:"15px"}}>
          <IconButton
            variant="outlined"
            size='small'
            onClick={handleEditOpen}
            style={{marginRight:"5px"}}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            href="/#"
            size='small'
          >
            <DeleteIcon />
          </IconButton>
          </span>
        </ListItem>

        <Divider />
      
        <ListItem button style={{borderRadius:"5px", paddingLeft:"0px"}}>
          <IconButton
            variant="outlined"
            onClick={handleDone}
            style={{margin:"0 5px"}}
          >
            <CheckIcon color="primary" />
          </IconButton>
          <ListItemText 
            primary="My firaaaaaaaaaaaast task to do on the day. the very first one. And it is very specific. Like VERY specific." 
            secondary="Today"
          />
          <span style={{position:"absolute", right:"5px", bottom:"15px"}}>
          <IconButton
            variant="outlined"
            size='small'
            onClick={handleEditOpen}
            style={{marginRight:"5px"}}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            href="/#"
            size='small'
          >
            <DeleteIcon />
          </IconButton>
          </span>
        </ListItem>

        <Divider />

        <ListItem button style={{borderRadius:"5px", paddingLeft:"0px"}}>
          <IconButton
            variant="outlined"
            onClick={handleDone}
            style={{margin:"0 5px"}}
          >
            <CheckIcon color="primary" />
          </IconButton>
          <ListItemText 
            primary="My firaaaaaaaaaaaast task to do on the day. the very first one. And it is very specific. Like VERY specific." 
            secondary="Today"
          />
          <span style={{position:"absolute", right:"5px", bottom:"15px"}}>
          <IconButton
            variant="outlined"
            size='small'
            onClick={handleEditOpen}
            style={{marginRight:"5px"}}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            href="/#"
            size='small'
          >
            <DeleteIcon />
          </IconButton>
          </span>
        </ListItem>

      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleToggleMenu} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <IconButton >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={menuOpen}
          onClose={handleMenuClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerBody}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <Drawer 
          variant="permanent" 
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          open 
          onClose={handleMenuClose}
        >
          <Toolbar />
          {drawerBody}
        </Drawer>
        </Hidden> 
        <main className={classes.content}>
          <Toolbar />
          <div id="editor" className={classes.editor}>
            <div class="today_view" style={{ paddingLeft: "55px",
              paddingRight: "55px",
              maxWidth: "800px",
              margin: "0 auto"}}
            >
              <header id="view_header">
                <Typography variant="h5" align="left" style={{padding:"36px 55px 0px 55px", marginBottom: "24px"}}>Tasks</Typography>
              </header>
              {tasks}
            </div>
          </div>
        </main>
      
      {dialogBody}
      {flexTest}
    </div>
  );
}

export default App;
