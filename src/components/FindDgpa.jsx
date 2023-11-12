import React, { useState } from "react";
import { Button, Grid, Typography, Stack, TextField } from "@mui/material";
import { Appbar } from "./Appbar";

import { Box } from "@mui/material";
import { CustomFormControl } from "./FindPercentage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist } from "../Colors";
import { Birch } from "../Colors";
import { Corn } from "../Colors";
import { Cafe_Royale } from "../Colors";

import Checkbox from '@mui/material/Checkbox';
// // import "../index.css";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


const FindDgpa = ()=>{
    return(
        <Box
            style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                width: "100vw",
                backgroundPosition: "center center",
                height: "100vh",
            }}>
            {/* <Appbar></Appbar> */}

            <Box height={"4.5rem"}></Box>
            <Box>
                <Typography textAlign={"center"}
                    variant="h4"
                    color={Birch}
                    fontWeight={"bold"}
                    padding={1}>Find DGPA</Typography>

                <Box
                    borderRadius={2}
                    sx={{
                        padding: "1.5rem",
                        background: "white",
                        boxShadow: "2px 4px 5px 1px black",
                        margin: "1.5rem",
                        width:'50vw'
                    }}

                    boxShadow={"2px 2px"}>
                        <Typography>Service is Comming Soon</Typography>
                    </Box>

            </Box>
        </Box>
    )
}

export default FindDgpa;