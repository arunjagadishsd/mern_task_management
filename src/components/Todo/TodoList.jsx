/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";
import qs from "query-string";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
    },
}));

const TodoList = ({
    open,
    token,
    labels,
    status,
    priorities,
    items,
    setItems,
    query,
}) => {
    const [checked, setChecked] = React.useState([0]);

    const [warningMessage, setWarningMessage] = useState({
        warningMessageOpen: false,
        warningMessageText: "",
    });

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const getItems = (query) => {
        let promiseList = fetch(
            CONSTANTS.ENDPOINT.LIST + "?" + qs.stringify(query),
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        ).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        });
        return promiseList;
    };

    const deleteItem = (item) => {
        fetch(`${CONSTANTS.ENDPOINT.LIST}/${item._id}`, {
            method: "DELETE",
            headers: { Authorization: token },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(() => {
                getTodo();
            })
            .catch((error) => {
                setWarningMessage({
                    warningMessageOpen: true,
                    warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`,
                });
            });
    };

    const closeWarningMessage = () => {
        setWarningMessage({
            warningMessageOpen: false,
            warningMessageText: "",
        });
    };
    const getTodo = () => {
        getItems(query)
            .then((list) => {
                setItems(list);
            })
            .catch((error) => ({
                warningMessageOpen: true,
                warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`,
            }));
    };
    useEffect(() => getTodo(), [query]);
    const classes = useStyles();

    return (
        <React.Fragment>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <React.Fragment>
                    <CssBaseline>
                        <Box>
                            <div>
                                <TodoForm
                                    setWarningMessage={setWarningMessage}
                                    token={token}
                                    getTodo={getTodo}
                                    editTodo={null}
                                    isEdit={false}
                                    labels={labels}
                                    status={status}
                                    priorities={priorities}
                                />
                            </div>
                            <List>
                                {items.map((item) => {
                                    const labelId = `checkbox-list-label-${item._id}`;

                                    return (
                                        <TodoListItem
                                            key={item._id}
                                            item={item}
                                            labelId={labelId}
                                            deleteItem={() => deleteItem(item)}
                                            handleToggle={handleToggle}
                                            checked={checked}
                                            token={token}
                                            getTodo={getTodo}
                                            labels={labels}
                                            status={status}
                                            priorities={priorities}
                                        />
                                    );
                                })}
                            </List>

                            <WarningMessage
                                open={warningMessage.warningMessageOpen}
                                text={warningMessage.warningMessageText}
                                onWarningClose={closeWarningMessage}
                            />
                        </Box>
                    </CssBaseline>
                </React.Fragment>
            </main>
        </React.Fragment>
    );
};
export default TodoList;
