/* eslint-disable react/prop-types */
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";
import ListIcon from "@material-ui/icons/List";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Label from "./Label";
import Priority from "./Priority";
import Status from "./Status";

const useStyles = makeStyles(() => ({
    iconContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
}));

const Form = ({
    token,
    editTodo,
    isEdit,
    setIsEdit,
    getTodo,
    labels,
    status,
    priorities,
}) => {
    const [todo, setTodo] = useState(
        editTodo || {
            text: "",
            dueDate: new Date(),
            label: null,
            status: null,
            priority: "P4",
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo({ ...todo, [name]: value });
    };
    const handleDelete = (name) => () => {
        setTodo({ ...todo, [name]: null });
    };
    const cancel = () => {
        setIsEdit(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await fetch(`http://localhost:3001/api/todo/${todo._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(todo), // body data type must match "Content-Type" header
            });
            setIsEdit(false);
            getTodo();
        } else {
            await fetch("http://localhost:3001/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify(todo), // body data type must match "Content-Type" header
            });
            getTodo();
        }
    };

    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <Box pb={2}>
                        <TextField
                            id="outlined-full-width"
                            name="text"
                            placeholder="e.g. Read "
                            onChange={handleChange}
                            value={todo.text}
                            fullWidth
                            margin="normal"
                        />
                        <Box component="span" p={1}>
                            Priority:{"  "}
                            <Chip
                                variant="outlined"
                                label={todo.priority}
                                className={classes.chip}
                            />
                        </Box>
                        {todo.label ? (
                            <Box component="span" pr={1}>
                                Label:{"  "}
                                <Chip
                                    color="secondary"
                                    variant="outlined"
                                    icon={<LocalOfferIcon />}
                                    label={
                                        labels.filter(
                                            (label) => label._id === todo.label
                                        )[0].text
                                    }
                                    onDelete={handleDelete("label")}
                                    className={classes.chip}
                                />
                            </Box>
                        ) : null}
                        {todo.status ? (
                            <Box component="span" p={1}>
                                Status:{"  "}
                                <Chip
                                    color="secondary"
                                    icon={<ListIcon />}
                                    variant="outlined"
                                    label={
                                        status.filter(
                                            (stat) => stat._id === todo.status
                                        )[0].text
                                    }
                                    onDelete={handleDelete("status")}
                                    className={classes.chip}
                                />
                            </Box>
                        ) : null}
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            name="dueDate"
                            margin="normal"
                            value={todo.dueDate}
                            onChange={handleChange}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <div className="form-row">
                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        {isEdit ? (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={cancel}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid item xs={10} className={classes.iconContainer}>
                        <Status
                            options={status}
                            todo={todo}
                            setTodo={setTodo}
                        />
                        <Label options={labels} todo={todo} setTodo={setTodo} />
                        <Priority
                            options={priorities}
                            todo={todo}
                            setTodo={setTodo}
                        />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
};

export default Form;
