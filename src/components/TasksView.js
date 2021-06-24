import React from 'react';

import {
    Typography,
    List,
    ListSubheader, 
    ListItem, 
    ListItemText,
    IconButton,
} from '@material-ui/core';

import { useTheme  } from '@material-ui/core/styles';

import {
    EditOutlined as EditIcon,
    CheckOutlined as CheckIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

function TasksView(props) {
    const theme = useTheme();

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
                            primary= {task.description}
                            secondary= 'asd'
                        />
                        <span style={{ position: "absolute", right: theme.spacing(1), bottom: theme.spacing(2) }}>
                            <IconButton
                                variant="outlined"
                                size='small'
                                onClick={() => props.onEditOpen(task)}
                                style={{ marginRight: theme.spacing(1) }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                variant="outlined"
                                size='small'
                                onClick={() => props.onTaskDone(task, false)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </ListItem>

                    ))}
                </List>
            </div>

        </div>

    );
}

export default TasksView;