import React, { useState } from "react";
import { Button, Grid, Typography, Stack, TextField, Divider,Card } from "@mui/material";
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
import { DialogBox } from "./FindPercentage";

const FindSgpa = () => {

    const [sgpa, setSgpa] = useState(null);
    const [creditValuesForSgpa, setCreditValuesForSgpa] = useState(
        new Array(2).fill("")
    );
    const [isVisited, setIsVisited] = useState(
        new Array(2).fill(false)
    );
    const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
        new Array(2).fill(true)
    );
    const [formSubmitted, setFormSubmitted] = useState(false);

    console.log("creditvaluesforsgpa",creditValuesForSgpa);
    console.log("sgpa",sgpa);
    const handleCreditValues = (index, value) => {
        const temp = [...creditValuesForSgpa];
        temp[index] = value;
        setCreditValuesForSgpa(temp);
    };
    const isVisitedHandler = (index) => {
        const temp = [...isVisited];
        temp[index] = true;
        setIsVisited(temp);
    };
    const handleSubmit = () => {
        // Check if any TextField is empty
        if (creditValuesForSgpa.some((value) => value === "")) {
            alert("Please fill in all TextFields before submitting.");
            const temp = [...checkedBeforeSubmit];
            creditValuesForSgpa.forEach((value, index) => {
                if (value === "") {
                    temp[index] = false;
                }
            });
            setCheckedBeforeSubmit(temp);
        } else {
            // Submit the form or take the desired action
            // You can add your submission logic here
            
            const ans = (creditValuesForSgpa[0] / creditValuesForSgpa[1]);
            setSgpa(ans.toFixed(2));
            setFormSubmitted(true);
        }
    }
    return (
        <Box
            style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                width: "100vw",
                backgroundPosition: "center center",
                height: "100vh",
            }}>

            <Box height={"4.5rem"}></Box>
            <Box>
                <Typography textAlign={"center"}
                    variant="h4"
                    color={Birch}
                    fontWeight={"bold"}
                    padding={1}>Find SGPA</Typography>

                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={6} lg={6}>
                        <Box
                            borderRadius={2}
                            sx={{
                                padding: "1.5rem",
                                background: "white",
                                boxShadow: "2px 4px 5px 1px black",
                                margin: "1.5rem",
                            }}

                            boxShadow={"2px 2px"}>
                            <DialogBox></DialogBox>
                            <Divider sx={{ m: '1.5rem',mb:'1rem' }}></Divider>

                            <Typography variant="h6" color={Mauntain_Mist} textAlign={'center'} sx={{mb:2}}>Enter Credits Of a Semester</Typography>

                            <Grid container spacing={2} sx={{}}>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        label={`Obtained credit`}
                                        onChange={(e) =>
                                            handleCreditValues(0, e.target.value)
                                        }
                                        onFocus={() => isVisitedHandler(0)}
                                        value={creditValuesForSgpa[0]}
                                        error={
                                            (creditValuesForSgpa[0] === "" &&
                                                isVisited[0]) ||
                                                (checkedBeforeSubmit[0] == false &&
                                                    isVisited[0] == false)
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            (creditValuesForSgpa[0] === "" &&
                                                isVisited[0]) ||
                                                (checkedBeforeSubmit[0] == false &&
                                                    isVisited[0] == false)
                                                ? "Requied field"
                                                : "Enter obtained credit points"
                                        }
                                        // placeholder=" Enter "
                                        type="number"></TextField>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        label={`Full credit Point`}
                                        type="number"
                                        onChange={(e) =>
                                            handleCreditValues(1, e.target.value)
                                        }
                                        onFocus={() => isVisitedHandler(1)}

                                        value={creditValuesForSgpa[1]}
                                        error={
                                            (creditValuesForSgpa[1] === "" &&
                                                isVisited[1]) ||
                                                (checkedBeforeSubmit[1] == false &&
                                                    isVisited[1] == false)
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            (creditValuesForSgpa[1] === "" &&
                                                isVisited[1]) ||
                                                (checkedBeforeSubmit[1] == false &&
                                                    isVisited[1] == false)
                                                ? "Requied field"
                                                : "Enter Full credit points"
                                        }

                                    ></TextField>
                                </Grid>
                            </Grid>
                            <Button variant="contained" sx={{ mt: 4 }} style={{ backgroundColor: Cafe_Royale }} onClick={handleSubmit}>
                                Calculate SGPA
                            </Button>
                            {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Card sx={{ p: 1, backgroundColor: Corn }}>
                                    <Typography fontWeight={'bold'} color={'white'}>
                                        Your Sgpa is: {sgpa}
                                    </Typography>
                                </Card> </Box> : null}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default FindSgpa;