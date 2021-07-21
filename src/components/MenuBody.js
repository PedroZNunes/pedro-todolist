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
    Add as AddIcon,
    MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'

import {
    List,
    ListItem,
    Divider,
    IconButton,
    Icon,
    ListItemText,
    Collapse, Menu, MenuItem
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
        marginLeft: theme.spacing(4),
        width: 'auto'
    },
    grow: {
        flexGrow: 1
    }
}));



function MenuBody(props) {

    const theme = useTheme();

    const classes = useStyles(props);

    const projectMenuOptions = [
        {
            title: 'Edit',
            onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleProjectSubMenuClose(e);
                props.handleAddProjectOpen(e, selectedProject); }
        },
        {
            title: 'Delete',
            onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleProjectSubMenuClose(e);
                    props.handleProjectDelete(selectedProject); 
                }
        }
    ];

    const [projectsOpen, setProjectsOpen] = React.useState(true);
    const handleProjectsOpen = () => {
        setProjectsOpen(!projectsOpen);
    };

    const projects = props.projects;

    const filters = [
        { text: 'Inbox', icon: <InboxIcon />, onClick: () => props.handleProjectFilter(null) },
        { text: 'Today', icon: <TodayIcon />, onClick: () => { } },
        { text: 'Upcoming', icon: <UpcomingIcon />, onClick: () => { } }
    ]

    const [selectedProject, setSelectedProject] = React.useState({ });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const projectSubMenuOpen = Boolean(anchorEl);

    const handleProjectSubMenuClick = (e, project) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setSelectedProject(project);
    };

    const handleProjectSubMenuClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
        // setSelectedProject({});
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
                                    <ProjectColorIcon style={{ color: project.color }} />
                                </Icon>

                                <ListItemText primary={project.name} />
                                <div className={classes.grow} />
                                {(projects.length > 1) && 
                                <IconButton
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    size='small'
                                    onClick={(e) => handleProjectSubMenuClick(e, project)}
                                >
                                    <MoreHorizIcon />
                                </IconButton>}
                            </ListItem>

                        ))}
                        <ListItem 
                            className={classes.subListItem} 
                            style={{paddingTop: theme.spacing(1)}}
                            onClick={(e) => props.handleAddProjectOpen(e, null)}
                            button
                        >
                        <div className={classes.grow} />

                        <Icon size='small' >
                            <AddIcon />
                        </Icon>
                        <div className={classes.grow} />

                        </ListItem>
                    </List>
                </Collapse>



            </List>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={projectSubMenuOpen}
                onClose={handleProjectSubMenuClose}
                PaperProps={{ width: '20ch' }}
            >
                {projectMenuOptions.map((option) => (
                    <MenuItem key={option} onClick={(e) => option.onClick(e)}>
                        {option.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default MenuBody;