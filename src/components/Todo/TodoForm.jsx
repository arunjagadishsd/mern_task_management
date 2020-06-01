import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
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

const Form = () => {
    // const [textField, setTextField] = useState('')
    // const [dueField, setDueField] = useState(new Date())
    const [labels, setLabels] = useState([]);
    const [status, setStatus] = useState([]);
    const priorities = ["P1", "P2", "P3", "P4"];
    const [todo, setTodo] = useState({
        text: "",
        due_date: new Date(),
        label: null,
        status: null,
        priority: "P4",
    });

    const getItems = (url) => {
        let promiseList = fetch(`http://localhost:3001/api/${url}`).then(
            (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }
        );
        return promiseList;
    };

    useEffect(() => {
        getItems("label")
            .then((list) => {
                setLabels(list);
            })
            .catch((error) => console.log(error));
        getItems("status")
            .then((list) => {
                setStatus(list);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo({ ...todo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:3001/api/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo), // body data type must match "Content-Type" header
        });
    };

    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <TextField
                        id="outlined-full-width"
                        name="text"
                        placeholder="e.g. Read every day @goals #learning"
                        onChange={handleChange}
                        value={todo.text}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            name="due_date"
                            margin="normal"
                            value={todo.due_date}
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
                        <Button color="secondary" variant="contained">
                            Cancel
                        </Button>
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
