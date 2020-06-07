/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Collapse, List } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Checkbox, Typography, Button } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ListIcon from "@material-ui/icons/List";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FlagIcon from "@material-ui/icons/Flag";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Navbar = ({
    open,
    handleDrawerOpen,
    handleDrawerClose,
    labels,
    status,
    priorities,
    selectedLabels,
    setSelectedLabels,
    selectedStatus,
    setSelectedStatus,
    selectedPriorities,
    setSelectedPriorities,
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const [isLabelOpen, setisLabelOpen] = React.useState(false);
    const [isStatusOpen, setisStatusOpen] = React.useState(false);
    const [isPriorityOpen, setisPriorityOpen] = React.useState(false);

    const googleSignin = () => {
        window.open("http://localhost:3001/api/auth/google", "_self");
    };
    const handleLabelOpen = () => {
        setisLabelOpen(!isLabelOpen);
    };
    const handleStatusOpen = () => {
        setisStatusOpen(!isStatusOpen);
    };
    const handleStatusToggle = (value) => {
        const currentIndex = selectedStatus.indexOf(value);
        const newSelectedStatus = [...selectedStatus];
        if (currentIndex === -1) {
            newSelectedStatus.push(value);
        } else {
            newSelectedStatus.splice(currentIndex, 1);
        }

        setSelectedStatus(newSelectedStatus);
    };
    const handleLabelToggle = (value) => {
        const currentIndex = selectedLabels.indexOf(value);
        const newSelectedLabels = [...selectedLabels];
        if (currentIndex === -1) {
            newSelectedLabels.push(value);
        } else {
            newSelectedLabels.splice(currentIndex, 1);
        }

        setSelectedLabels(newSelectedLabels);
    };
    const handlePriorityToggle = (value) => {
        const currentIndex = selectedPriorities.indexOf(value);
        const newSelectedPrioritiess = [...selectedPriorities];
        if (currentIndex === -1) {
            newSelectedPrioritiess.push(value);
        } else {
            newSelectedPrioritiess.splice(currentIndex, 1);
        }

        setSelectedPriorities(newSelectedPrioritiess);
    };
    const handlePriorityOpen = () => {
        setisPriorityOpen(!isPriorityOpen);
    };
    return (
        <Fragment>
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
                    <Typography style={{ flexGrow: 1 }} variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                    <Button color="inherit" onClick={googleSignin}>
                        Google Signin
                    </Button>
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

                <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItem button onClick={handleLabelOpen}>
                        <ListItemIcon>
                            <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText primary="Labels" />
                        {isLabelOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isLabelOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {labels.map((label) => (
                                <ListItem
                                    key={label._id}
                                    button
                                    className={classes.nested}
                                    onClick={() => handleLabelToggle(label._id)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            checked={
                                                selectedLabels.indexOf(
                                                    label._id
                                                ) !== -1
                                            }
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={label.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleStatusOpen}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Status" />
                        {isStatusOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isStatusOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {status.map((item) => (
                                <ListItem
                                    key={item._id}
                                    button
                                    className={classes.nested}
                                    onClick={() => handleStatusToggle(item._id)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            checked={
                                                selectedStatus.indexOf(
                                                    item._id
                                                ) !== -1
                                            }
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    <ListItem button onClick={handlePriorityOpen}>
                        <ListItemIcon>
                            <FlagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Priorities" />
                        {isPriorityOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isPriorityOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {priorities.map((priority) => (
                                <ListItem
                                    key={priority}
                                    button
                                    className={classes.nested}
                                    onClick={() =>
                                        handlePriorityToggle(priority)
                                    }
                                >
                                    <Checkbox
                                        edge="start"
                                        tabIndex={-1}
                                        checked={
                                            selectedPriorities.indexOf(
                                                priority
                                            ) !== -1
                                        }
                                        disableRipple
                                    />
                                    <ListItemText primary={priority} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </Fragment>
    );
};
export default Navbar;
