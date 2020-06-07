/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
    Checkbox,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemIcon,
    IconButton,
    Divider,
    Box,
    Chip,
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/Edit";
import TodoForm from "./TodoForm";

import ListIcon from "@material-ui/icons/List";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const TodoListItem = ({
    item,
    deleteItem,
    labelId,
    handleToggle,
    checked,
    token,
    getTodo,
    labels,
    priorities,
    status,
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <React.Fragment>
            {isEdit ? (
                <TodoForm
                    token={token}
                    editTodo={item}
                    isEdit={true}
                    setIsEdit={setIsEdit}
                    getTodo={getTodo}
                    labels={labels}
                    status={status}
                    priorities={priorities}
                />
            ) : (
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
                        {/* <ListItemText id={labelId} primary={item.text} /> */}
                        {item.text}
                        <Box Box component="span" p={1}>
                            <Chip variant="outlined" label={item.priority} />
                        </Box>
                        {item.label ? (
                            <Box component="span" pr={1}>
                                <Chip
                                    color="secondary"
                                    variant="outlined"
                                    icon={<LocalOfferIcon />}
                                    label={
                                        labels.length !== 0
                                            ? labels.filter(
                                                  (label) =>
                                                      label._id === item.label
                                              )[0].text
                                            : null
                                    }
                                />
                            </Box>
                        ) : null}
                        {item.status ? (
                            <Box component="span" p={1}>
                                <Chip
                                    color="secondary"
                                    icon={<ListIcon />}
                                    variant="outlined"
                                    label={
                                        status.length !== 0
                                            ? status.filter(
                                                  (stat) =>
                                                      stat._id === item.status
                                              )[0].text
                                            : null
                                    }
                                />
                            </Box>
                        ) : null}

                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="Delete"
                                onClick={() => setIsEdit(true)}
                            >
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
                </React.Fragment>
            )}
            <Divider />
        </React.Fragment>
    );
};

export default TodoListItem;
