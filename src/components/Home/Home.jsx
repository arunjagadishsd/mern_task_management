import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import TodoList from "../Todo/TodoList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: theme.palette.background.paper,
    },
}));
// eslint-disable-next-line react/prop-types
const Home = ({ token }) => {
    const [selectedLabels, setSelectedLabels] = React.useState([]);
    const [selectedStatus, setSelectedStatus] = React.useState([]);
    const [selectedPriorities, setSelectedPriorities] = React.useState([]);
    const [items, setItems] = useState([]);
    const [labels, setLabels] = useState([]);
    const [status, setStatus] = useState([]);
    const priorities = ["P1", "P2", "P3", "P4"];
    const classes = useStyles();
    const [query, setQuery] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const getItems = (url) => {
        let promiseList = fetch(
            `https://frozen-scrubland-45920.herokuapp.com/api/${url}`,
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
    useEffect(() => {
        const newQuery = {};
        if (selectedLabels.length !== 0) {
            newQuery.label = [];
            selectedLabels.forEach((label) => newQuery.label.push(label));
        }
        if (selectedStatus.length !== 0) {
            newQuery.status = [];
            selectedStatus.forEach((status) => newQuery.status.push(status));
        }
        if (selectedLabels.length !== 0) {
            newQuery.priority = [];
            selectedPriorities.forEach((priority) =>
                newQuery.priority.push(priority)
            );
        }
        setQuery(newQuery);
    }, [selectedLabels, selectedStatus, selectedPriorities]);
    useEffect(() => {
        getItems("label")
            .then((list) => {
                console.log("label", list);
                setLabels(list);
            })
            .catch((error) => console.log(error));
        getItems("status")
            .then((list) => {
                setStatus(list);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Navbar
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                token={token}
                labels={labels}
                status={status}
                priorities={priorities}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedPriorities={selectedPriorities}
                setSelectedPriorities={setSelectedPriorities}
            />
            <TodoList
                open={open}
                token={token}
                labels={labels}
                status={status}
                priorities={priorities}
                items={items}
                setItems={setItems}
                query={query}
            />
        </div>
    );
};

export default Home;
