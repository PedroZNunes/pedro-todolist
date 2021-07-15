import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';

import {
    Inbox as InboxIcon,
    Today as TodayIcon,
    Event as UpcomingIcon,
    FiberManualRecord as ProjectColorIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Add as AddIcon
} from '@material-ui/icons'

import {
    List,
    ListItem,
    Divider,
    IconButton,
    Icon,
    ListItemText,
    Collapse,
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    list: {
        padding: theme.spacing(0, 1), listStyleType: "none", textAlign: "left" 
    },
    listItem: {
        paddingBottom: theme.spacing(0)
    },
    listItemIcon: {
        margin: theme.spacing(0, 1, 1, 0)
    },
    subListItem: {
        paddingLeft: theme.spacing(7)
    }
}));

function MenuBody(props) {

    const theme = useTheme();

    const classes = useStyles(props);
    
    const [projectsOpen, setProjectsOpen] = React.useState(true);

    const projects = props.projects;

    const filters = [
        { text: 'Inbox', icon: <InboxIcon />,       onClick: () => props.handleProjectFilter(null) },
        { text: 'Today', icon: <TodayIcon />,       onClick: () => {} },
        { text: 'Upcoming', icon: <UpcomingIcon />, onClick: () => {} },
    ]

    const handleProjectsOpen = () => {
        setProjectsOpen(!projectsOpen);
    };

    return (
        <div id="list_holder" style={{ backgroundColor: "#eee", height: "100vh", paddingTop: theme.spacing(1), overflow: 'auto' }}>
            <List className={classes.list}>
                {filters?.map((filter) => (
                    <ListItem divider={false} button className={classes.listItem} onClick={filter.onClick}>
                        <IconButton
                            variant="outlined"
                            color="primary"
                            href="/#"
                        >
                            {filter.icon}
                        </IconButton>
                        <ListItemText
                            primary={filter.text}
                        />
                        <ListItemText
                            style={{ textAlign: "right" }}
                            primary="3"
                        />
                    </ListItem>

                ))}

                <Divider style={{ margin: theme.spacing(1, 0) }} />

                <ListItem button onClick={handleProjectsOpen} className={classes.listItem}>
                    <IconButton variant="outlined" >
                        {projectsOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                    <ListItemText primary="Projects" />
                </ListItem>

                <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
                    <List component="div" className={classes.List} disablePadding>
                        {projects?.map((project) => (
                            <ListItem button className={classes.subListItem} key={project.id} onClick={() => props.handleProjectFilter(project.id)}>
                                <Icon variant="outlined" className={classes.listItemIcon} >
                                    <ProjectColorIcon  style={{ color: project.color }} />
                                </Icon>
                                <ListItemText primary={project.name} />
                            </ListItem>

                        ))}
                        <ListItem className={classes.subListItem} onClick={props.handleAddProjectOpen}>
                            <IconButton >
                                <AddIcon />
                            </IconButton>
                        </ListItem>
                    </List>
                </Collapse>

                

            </List>
        </div>
    );
}

export default MenuBody;