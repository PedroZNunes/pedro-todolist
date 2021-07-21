import React from 'react';

import {
    Typography,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    IconButton,
    Collapse, Menu, MenuItem

} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


import {
    EditOutlined as EditIcon,
    CheckOutlined as CheckIcon,
    Delete as DeleteIcon,
    MoreHoriz as MoreHorizIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    }
}));

function TasksView(props) {
    const theme = useTheme();
    const classes = useStyles(props);

    const taskMenuOptions = [
        {
            title: 'Edit',
            onClick: (task) => {
                props.handleTaskDialogOpen(task);
                setAnchorEl(null)
            }
        },
        {
            title: 'Delete',
            onClick: (task) => {
                props.onTaskDone(task, false)
                setAnchorEl(null)
            }
        }
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedTask, setSelectedTask] = React.useState({});
    const taskSubMenuOpen = Boolean(anchorEl);


    const handleEditClick = (e) => {
        e.stopPropagation();
        props.handleTaskDialogOpen(selectedTask);
        setAnchorEl(null);
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        props.onTaskDone(selectedTask, false);
        setAnchorEl(null);
    }

    const handleTaskSubMenuClick = (e, task) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setSelectedTask(task);
    };

    const handleTaskSubMenuClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <div className="today_view" style={{
            padding: theme.spacing(0, 7),
            maxWidth: "800px",
            margin: "0 auto"
        }}
        >
            <header id="view_header">
                <Typography variant="h5" align="left" style={{ padding: theme.spacing(4, 7, 0, 7), marginBottom: theme.spacing(3) }}>Tasks</Typography>
            </header>

            <div id="view_content">
                <List subheader={
                    <ListSubheader component="div" id="list-subheader">
                        <b>Overview</b>
                    </ListSubheader>}
                >
                    {props.tasks.map((task) => (
                        <ListItem button divider={true} style={{ borderRadius: theme.spacing(1), paddingLeft: theme.spacing(0) }} key={task.id}>
                            <IconButton
                                variant="outlined"
                                onClick={() => props.onTaskDone(task, true)}
                                style={{ margin: theme.spacing(0, 1) }}
                            >
                                <CheckIcon color="primary" />
                            </IconButton>
                            <ListItemText
                                primary={task.description}
                                secondary={props.projects.find(project => project.id === task.projectID)?.name}
                            />

                            <div className={classes.grow} />
                            
                            <IconButton
                                aria-label="more"
                                aria-haspopup="true"
                                onClick={(e) => handleTaskSubMenuClick(e, task)}
                            >
                                <MoreHorizIcon />
                            </IconButton>

                        </ListItem>

                    ))}
                </List>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={taskSubMenuOpen}
                    onClose={handleTaskSubMenuClose}
                    PaperProps={{ width: '20ch' }}
                >
                    <MenuItem onClick={(e) => handleEditClick(e)}>
                        <Typography color='primary'> Edit </Typography>
                    </MenuItem>
                    <MenuItem onClick={(e) => handleDeleteClick(e)}>
                        <Typography color='secondary'> Delete </Typography>
                    </MenuItem>
                </Menu>
            </div>

        </div>

    );
}

export default TasksView;