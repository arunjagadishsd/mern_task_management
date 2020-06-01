import { Box, Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/Edit";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import React, { useState } from "react";
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import TodoForm from "./TodoForm";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
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
}));

export default function PersistentDrawerLeft() {
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
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
                                {items.map((value) => {
                                    const labelId = `checkbox-list-label-${value._id}`;

                                    return (
                                        <React.Fragment key={value._id}>
                                            <ListItem
                                                dense
                                                button
                                                onClick={handleToggle(value)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={
                                                            checked.indexOf(
                                                                value
                                                            ) !== -1
                                                        }
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={value.text}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="Delete"
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
                                            <Divider />
                                        </React.Fragment>
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
        </div>
    );
}
