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
    MoreHoriz as MoreHorizIcon,
    FiberManualRecord as ProjectColorIcon
} from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    inline: {
        paddingRight: theme.spacing(2)
    },
    inlineProject: {
        marginRight: theme.spacing(2),
        padding: '2px',
        border: "1px solid",
        borderRadius:"3px"
    },
    itemContent: {
        flexGrow: 3
    },
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
    console.log(`today ${moment().endOf('day').format("DD-MM-YYYY hh:mm")}`);
    console.log(`tomorrow ${moment().endOf('day').add(1, 'd').format("DD-MM-YYYY hh:mm")}`);
    console.log(`week ${moment().endOf('day').add(6, 'd').format("DD-MM-YYYY hh:mm")}`);

    const getDateToScreen = (dateString) => {
        let out = '';

        if(dateString !== null){
            let date = moment(dateString);
            if (date.isSameOrAfter(moment())){
                console.log(`date is ${date.format("DD-MM-YYYY hh:mm")}`)


                let a = date.isSameOrBefore(moment().endOf('day'));
                if(date.isSameOrBefore(moment().endOf('day'))){
                    out = "Today";
                } 
                else if (date.isSameOrBefore(moment().endOf('day').add(1, 'd'))) {
                    out= 'Tomorrow';
                }
                else if (date.isSameOrBefore(moment().add(6, 'd'))){
                    out = date.format('dddd');
                } 
                else {
                    out= date.format('MMM Do YYYY');
                }

            }
            // date.toLocaleString();
        }
        return out;
    }

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
                            <div className={classes.itemContent}>
                                
                            <ListItemText
                                primary={
                                    <React.Fragment>

                                    <Typography
                                        component="span"
                                        variant="body1"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {task.description}
                                    </Typography>
                                    </React.Fragment>
                                }
                                    
                                secondary={
                                    <React.Fragment>

                                    
                                    <Typography
                                        component="span"
                                        variant="caption"
                                        className={classes.inlineProject}
                                        style={{borderColor:  props.projects.find(project => project.id === task.projectID)?.color}}
                                        color="textPrimary"
                                    >
                                        {props.projects.find(project => project.id === task.projectID)?.name}
                                    </Typography>

                                    <Typography
                                        component="span"
                                        variant="caption"
                                        className={classes.inline}
                                        color="textSecondary"
                                    >
                                        {getDateToScreen(task.date)}
                                    </Typography>

                                    </React.Fragment>
                                }
                            />
                            </div>
                            
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