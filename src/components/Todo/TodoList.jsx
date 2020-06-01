/* eslint-disable react/prop-types */
import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useState } from "react";
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";

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

const TodoList = ({ open }) => {
    const [checked, setChecked] = React.useState([0]);
    const [items, setItems] = useState([]);
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
        console.log(newChecked);
        setChecked(newChecked);
    };

    const getItems = () => {
        let promiseList = fetch(CONSTANTS.ENDPOINT.LIST).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            console.log(response);
            return response.json();
        });
        return promiseList;
    };

    const deleteItem = (item) => {
        fetch(`${CONSTANTS.ENDPOINT.LIST}/${item._id}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((result) => {
                setItems(items.filter((item) => item._id !== result._id));
            })
            .catch((error) => {
                setWarningMessage({
                    warningMessageOpen: true,
                    warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`,
                });
            });
    };

    const addItem = (textField) => {
        // Warning Pop Up if the user submits an empty message
        if (!textField) {
            setWarningMessage({
                warningMessageOpen: true,
                warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE,
            });
            return;
        }

        fetch(CONSTANTS.ENDPOINT.LIST, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: textField,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((itemAdded) => {
                setItems([itemAdded, ...items]);
            })
            .catch((error) =>
                setWarningMessage({
                    warningMessageOpen: true,
                    warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`,
                })
            );
    };

    const closeWarningMessage = () => {
        setWarningMessage({
            warningMessageOpen: false,
            warningMessageText: "",
        });
    };

    React.useEffect(() => {
        getItems()
            .then((list) => {
                setItems(list);
            })
            .catch((error) => ({
                warningMessageOpen: true,
                warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`,
            }));
    }, []);
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
                                    addItem={addItem}
                                    setWarningMessage={setWarningMessage}
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
                                            deleteItem={deleteItem}
                                            handleToggle={handleToggle}
                                            checked={checked}
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
