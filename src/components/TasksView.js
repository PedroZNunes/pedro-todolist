import React from 'react';

import {
    Typography,
    List,
    ListSubheader, 
    ListItem, 
    ListItemText,
    IconButton
} from '@material-ui/core';

import {
    EditOutlined as EditIcon,
    CheckOutlined as CheckIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';


function TasksView(props) {

    return (
        <div className="today_view" style={{
            paddingLeft: "55px",
            paddingRight: "55px",
            maxWidth: "800px",
            margin: "0 auto"
        }}
        >
            <header id="view_header">
                <Typography variant="h5" align="left" style={{ padding: "36px 55px 0px 55px", marginBottom: "24px" }}>Tasks</Typography>
            </header>

            <div id="view_content">
                <List subheader={
                    <ListSubheader component="div" id="list-subheader">
                        <b>Overview</b>
                    </ListSubheader>}
                >
                    {props.tasks.map((task) => (
                        <ListItem button divider={true} style={{ borderRadius: "5px", paddingLeft: "0px" }} key={task.id}>
                        <IconButton
                            variant="outlined"
                            onClick={() => props.onTaskDone(task)}
                            style={{ margin: "0 5px" }}
                        >
                            <CheckIcon color="primary" />
                        </IconButton>
                        <ListItemText
                            primary={task.description}
                            secondary="Today"
                        />
                        <span style={{ position: "absolute", right: "5px", bottom: "15px" }}>
                            <IconButton
                                variant="outlined"
                                size='small'
                                onClick={() => props.onEditOpen(task)}
                                style={{ marginRight: "5px" }}
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

                    ))}
                </List>
            </div>

        </div>

    );
}

export default TasksView;