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
    Modal,
    Fade,
    TextField,
    Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/Edit";
import TodoForm from "./TodoForm";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
    },
}));

const TodoListItem = ({
    item,
    deleteItem,
    labelId,
    handleToggle,
    checked,
    token,
}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {};

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
                    <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={handleOpen}
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <TextField
                            id="outlined-full-width"
                            name="text"
                            placeholder="e.g. Read every day @goals #learning"
                            onChange={handleChange}
                            value={item.text}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
};

export default TodoListItem;
