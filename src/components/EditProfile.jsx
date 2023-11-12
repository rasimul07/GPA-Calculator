import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Stack, TextField, Divider } from "@mui/material";

import { Box } from "@mui/material";


import { CustomFormControl } from "./FindPercentage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist, Light_Gray } from "../Colors";
import { Birch } from "../Colors";
import { Corn } from "../Colors";
import { Cafe_Royale } from "../Colors";

import Checkbox from '@mui/material/Checkbox';
import "../index.css";
import { DialogBox } from "./FindPercentage";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { forAniPages } from "./Appbar";
import { useNavigate } from "react-router-dom";
import { Appbar } from "./Appbar";
import axios from "axios";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import { MyBackDrop } from "./Profile";

const EditProfile = ({ email, setEmail }) => {
    return (

        <CustomProfile email={email} setEmail={setEmail}></CustomProfile>

    )
}
const CustomProfile = ({ email, setEmail }) => {
    const Navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({})
    const [numOfSemester, setNumOfSemester] = useState(1);
    const [arrayOfSems, setArrayOfSems] = useState(
        new Array(numOfSemester).fill().map((_, index) => index + 1)
    );
    const [creditValues, setCreditValues] = useState(
        new Array(numOfSemester * 2).fill("")
    );
    const [isVisited, setIsVisited] = useState(
        new Array(numOfSemester).fill(false)
    );
    const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
        new Array(numOfSemester).fill(true)
    );
    useEffect(() => {
        const func = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/getUserInfo", {
                    headers: {
                        authorization: "Barrier " + localStorage.getItem("token")
                    }
                })
                setUserInfo(response.data);
                const noSem = response.data.credits.length / 2;
                console.log("noSem", noSem);
                setNumOfSemester(noSem)
                setArrayOfSems(new Array(noSem).fill().map((_, index) => index + 1));
                const temp = [...response.data.credits];
                setCreditValues(temp);
            } catch (err) {
                console.error(err);
            }
        }
        func();
        console.log("Hello World");
    }, [email])
    const [formSubmitted, setFormSubmitted] = useState(false);
    console.log(creditValues);

    const handleChange = (e) => {
        const curr = e.target.value;
        setNumOfSemester(curr);
        setArrayOfSems(new Array(curr).fill().map((_, index) => index + 1));
        const len = creditValues.length / 2;
        const temp = [...creditValues];
        let count = Math.abs(len - curr) * 2;
        if (len < curr) {
            while (count) {
                temp.push("");
                count = count - 1;
            }
        } else {
            while (count) {
                temp.pop();
                count = count - 1;
            }
        }
        setCreditValues(temp);
        setIsVisited(new Array(curr * 2).fill(false));
    };
    const handleCreditValues = (index, value) => {
        const temp = [...creditValues];
        temp[index] = value;
        setCreditValues(temp);
    };
    const isVisitedHandler = (index) => {
        const temp = [...isVisited];
        temp[index] = true;
        setIsVisited(temp);
    };
    const handleSubmit = () => {
        // Check if any TextField is empty
        if (creditValues.some((value) => value === "")) {
            alert("Please fill in all TextFields before submitting.");
            const temp = [...checkedBeforeSubmit];
            creditValues.forEach((value, index) => {
                if (value === "") {
                    temp[index] = false;
                }
            });
            setCheckedBeforeSubmit(temp);
        } else {
            // Submit the form or take the desired action
            // You can add your submission logic here
            const func = async () => {
                const body = {
                    credits: creditValues,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    contact: userInfo.contact,
                    email: userInfo.email,
                    password: userInfo.password
                }
                console.log(body);
                try {

                    const response = await axios.put("http://localhost:3000/user/updateUserInfo",
                        body, {
                        headers: {
                            authorization: "Barrier " + localStorage.getItem("token")
                        }
                    })

                    console.log(response);
                    if (response.status === 200) {
                        alert("Saved Sucessfully");
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            func();

        }
    };
    return (
        <Box overflow={'auto'} sx={{ height: '100vh', background: Corn }} >
            <Box style={{
                backgroundImage:
                    "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
                backgroundSize: "cover",
                height: "100vh",
                backgroundPosition: "center center",
            }}>
                <Box height={"4.5rem"}></Box>

                <Box>
                    <Typography
                        textAlign={"center"}
                        variant="h4"
                        color={Birch}
                        fontWeight={"bold"}
                        padding={2}>
                        Edit Profile
                    </Typography>
                    {(Object.keys(userInfo).length === 0 && email) ? <MyBackDrop></MyBackDrop> : null}
                    <Box
                        borderRadius={2}
                        sx={{
                            padding: "1.5rem",
                            background: "white",
                            boxShadow: "2px 4px 5px 1px black",
                            margin: "1.5rem",
                            height: {
                                xs: '60vh',
                                md: '40vh',
                                lg: '40vh'
                            },
                            overflow: {
                                xs: 'auto'
                            }
                        }}

                        boxShadow={"2px 2px"}>

                        <Grid container columnGap={10} rowGap={2} mb={5}>
                            <Grid item md={3}>
                                <Typography fontSize={'1rem'} p={0.5}>First Name:</Typography>
                                <TextField size="small" value={userInfo.firstName} onChange={(e) => {
                                    const temp = { ...userInfo };
                                    temp.firstName = e.target.value;
                                    setUserInfo(temp)
                                }
                                }></TextField>
                            </Grid>

                            <Grid item md={3}>
                                <Typography fontSize={'1rem'} p={0.5}>Last Name:</Typography>
                                <TextField size="small" value={userInfo.lastName} onChange={(e) => {
                                    const temp = { ...userInfo };
                                    temp.lastName = e.target.value;
                                    setUserInfo(temp)
                                }
                                }></TextField>
                            </Grid>


                            <Grid item md={3}>
                                <Typography fontSize={'1rem'} p={0.5}>Phone No:</Typography>
                                <TextField size="small" type="number" value={userInfo.contact} onChange={(e) => {
                                    const temp = { ...userInfo };
                                    temp.contact = e.target.value;
                                    setUserInfo(temp)
                                }
                                }></TextField>

                            </Grid>


                            <Grid item md={3}>
                                <Typography fontSize={'1rem'} p={0.5} >Email Id:</Typography>
                                <TextField size="small" value={userInfo.email} onChange={(e) => {
                                    const temp = { ...userInfo };
                                    temp.email = e.target.value;
                                    setUserInfo(temp)
                                }
                                } ></TextField>
                            </Grid>

                            <Grid item md={3}>
                                <Typography fontSize={'1rem'} p={0.5} >Password:</Typography>
                                <PasswordField password={userInfo.password} userInfo={userInfo} setUserInfo={setUserInfo}></PasswordField>
                            </Grid>
                            <Grid item md={3}>
                                <Typography fontSize={'1rem'} p={0.5}>Select no of semester:</Typography>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="select no of sems">No of sems</InputLabel>
                                    <Select
                                        labelId="select no of sems"
                                        value={(numOfSemester) ? numOfSemester : 1}
                                        label="No of sems"
                                        onChange={handleChange}>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            {/* <Box sx={{ height: '100px', border: '2px solid green', display: 'block', background: Corn }}>

            </Box> */}

            <Box sx={{
                background: Corn
            }} >

                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box
                            borderRadius={2}
                            sx={{
                                padding: "1.5rem",
                                background: "white",
                                boxShadow: "2px 4px 5px 1px black",
                                margin: "1.5rem",
                                mt:'5rem'
                              
                            }}
                            boxShadow={"2px 2px"}
                        >
                            <Typography textAlign={'center'} variant="h5">Edit Your Credit Points</Typography>
                            <Divider sx={{ mb: '2rem' }}></Divider>
                            <DialogBox></DialogBox>

                            <Grid container

                                rowGap={'2rem'}
                                columnGap={'5rem'}
                                marginTop={'2rem'}
                                marginBottom={'2rem'}
                            >
                                {arrayOfSems.map((item, index) => (
                                    <Grid
                                        item
                                        md={5}
                                        sx={{
                                            background: Light_Gray,
                                            borderRadius: '10px',
                                            pb: 2,
                                            pl: 2,
                                            pr: 2,
                                            boxShadow: `0px 0px 1px 0px black`
                                        }}>
                                        <Typography
                                            fontWeight={"bold"}
                                            padding={1}
                                            textTransform={"uppercase"}
                                            color={Mauntain_Mist}>
                                            For semester {item}:
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    required
                                                    label={`Obtained credit`}
                                                    onChange={(e) =>
                                                        handleCreditValues(index * 2, e.target.value)
                                                    }
                                                    onFocus={() => isVisitedHandler(index * 2)}
                                                    value={creditValues[index * 2]}
                                                    error={
                                                        (creditValues[index * 2] === "" &&
                                                            isVisited[index * 2]) ||
                                                            (checkedBeforeSubmit[index * 2] == false &&
                                                                isVisited[index * 2] == false)
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        (creditValues[index * 2] === "" &&
                                                            isVisited[index * 2]) ||
                                                            (checkedBeforeSubmit[index * 2] == false &&
                                                                isVisited[index * 2] == false)
                                                            ? "Requied field"
                                                            : "Enter obtained credit points"
                                                    }
                                                    // placeholder=" Enter SGPA"
                                                    type="number"></TextField>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    required
                                                    label={`Full credit Point`}
                                                    type="number"
                                                    onChange={(e) =>
                                                        handleCreditValues(index * 2 + 1, e.target.value)
                                                    }
                                                    onFocus={() => isVisitedHandler(index * 2 + 1)}
                                                    value={creditValues[index * 2 + 1]}
                                                    error={
                                                        (creditValues[index * 2 + 1] === "" &&
                                                            isVisited[index * 2 + 1]) ||
                                                            (checkedBeforeSubmit[index * 2 + 1] == false &&
                                                                isVisited[index * 2 + 1] == false)
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        (creditValues[index * 2 + 1] === "" &&
                                                            isVisited[index * 2 + 1]) ||
                                                            (checkedBeforeSubmit[index * 2 + 1] == false &&
                                                                isVisited[index * 2 + 1] == false)
                                                            ? "Requied field"
                                                            : "Enter Full credit points"
                                                    }></TextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{display:'flex',justifyContent:'center',m:5}}>
                    <Button variant="contained" sx={{ display: 'block', background: Cafe_Royale }} onClick={handleSubmit} >Save Changes</Button>
                </Box>
            </Box>
        </Box>
    )
}

const PasswordField = ({ password, userInfo, setUserInfo }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <FormControl variant="outlined" size="small" >
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                    const temp = { ...userInfo };
                    temp.password = e.target.value;
                    setUserInfo(temp)
                }
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
export default EditProfile;