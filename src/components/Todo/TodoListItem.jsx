/* eslint-disable react/prop-types */
import React from "react";
import {
    Checkbox,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemIcon,
    IconButton,
    Divider,
} from "@material-ui/core";

import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/Edit";

const TodoListItem = ({ item, deleteItem, labelId, handleToggle, checked }) => {
    return (
        <React.Fragment>
            <ListItem dense button onClick={handleToggle(item)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(item) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                            "aria-labelledby": labelId,
                        }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.text} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                        onClick={deleteItem}
                        edge="end"
                        aria-label="Delete"
                    >
                        <DeleteForeverRoundedIcon color="secondary" />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </React.Fragment>
    );
};

export default TodoListItem;
