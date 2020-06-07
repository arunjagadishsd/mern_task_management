import React from "react";
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
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
            />
            <TodoList open={open} token={token} />
        </div>
    );
};

export default Home;
