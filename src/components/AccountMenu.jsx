import React, { useState } from "react";
import SignUp from "./SignUp";
import {
    Button,
    Grid,
    Typography,
    Stack,
    TextField,
    Card,
    CardActions,
    Divider,
    ListItemIcon,
    Avatar,
    Tooltip,
    IconButton,
} from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist } from "../Colors";
import { Birch } from "../Colors";
import { Corn } from "../Colors";
import { Cafe_Royale } from "../Colors";
import "../index.css";
import myImage from "../images/credit-details.png";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";

const AccountMenu = ({ email}) => {
    const Navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            {email ? (
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick}>
                        <Avatar alt={email} src="/static/images/avatar/1.jpg"></Avatar>
                    </IconButton>
                </Tooltip>
            ) : null}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                <MenuItem onClick={()=>{
                    Navigate('/profile')
                }}>
                    <Avatar 
                    sx={{ width: '2rem', height: '2rem',mr:1.5 }}
                    /> Profile
                </MenuItem>
                <Divider />

                <MenuItem onClick={() => {
                    localStorage.setItem("token", null);
                    location.reload();
                }}>
                    <ListItemIcon >
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AccountMenu;
