import React from 'react';

import {    
    Inbox as InboxIcon,
    Today as TodayIcon,
    Event as UpcomingIcon,
    FiberManualRecord as ProjectColorIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'

import {
    List,
    ListItem, 
    Divider, 
    IconButton, 
    ListItemText,
    Collapse
} from '@material-ui/core'



function MenuBody(props) {
    
    const [projectsOpen, setProjectsOpen] = React.useState(true);

    const handleProjectsOpen = () => {
        setProjectsOpen(!projectsOpen);
    };

    return (
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
                    <ListItemText 
                        style={{textAlign: "right"}}
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
}

export default MenuBody;