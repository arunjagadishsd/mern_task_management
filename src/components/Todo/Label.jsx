/* eslint-disable react/prop-types */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const ITEM_HEIGHT = 48;

function Label({ options, todo, setTodo }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = (event, label) => {
        setTodo({ ...todo, label });
        handleClose();
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <LocalOfferIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option._id}
                        onClick={(event) => handleSelect(event, option._id)}
                    >
                        {option.text}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}
export default Label;
