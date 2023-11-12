
import React, { useState } from "react";
import { Button, Grid, Typography, Stack, TextField, Card, Divider } from "@mui/material";
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
import { DialogBox } from "./FindPercentage";
import Checkbox from '@mui/material/Checkbox';
import "../index.css";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
// import { Login } from "@mui/icons-material";

// import { CustomFormControl } from "./FindPercentage";
const FindYgpa = ({ email, setEmail }) => {
    const [userInfo, setUserInfo] = useState({})
    // const [numOfSemester, setNumOfSemester] = useState(1);
    const [whichYear, setWhichYear] = useState(1);
    const [arrayOfYears, setArrayOfYears] = useState([1]);
    const [isLogin, setIsLogin] = useState(false);
    const [arrayOfSems, setArrayOfSems] = useState(
        new Array(2).fill().map((_, index) => index + 1)
    );
    const [creditValuesForYgpa, setCreditValuesForYgpa] = useState(
        new Array(4).fill("")
    );
    const [isVisited, setIsVisited] = useState(
        new Array(4).fill(false)
    );
    const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
        new Array(4).fill(true)
    );
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [ygpa, setYgpa] = useState(null);

    console.log("arrayOfYears", arrayOfYears);
    console.log("credit values", creditValuesForYgpa);
    console.log("arrayofsems", arrayOfSems);
    console.log("isVisited", isVisited);
    console.log("checkedBeforeSubmit", checkedBeforeSubmit);

    const handleFetchData = () => {
        const func = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/getUserInfo", {
                    headers: {
                        authorization: "Barrier " + localStorage.getItem("token")
                    }
                })
                setUserInfo(response.data);
                const noSem = response.data.credits.length / 2;
                // console.log("noSem", parseInt(noSem / 2));
                const years = parseInt(noSem / 2);
                // setNumOfSemester(noSem)
                // setArrayOfSems(new Array(noSem).fill().map((_, index) => index + 1));
                setArrayOfYears(new Array(years).fill().map((_, index) => index + 1))
                setArrayOfSems(new Array(2).fill().map((_, index) => index + 1));
                console.log("response.data.credits", response.data.credits);
                if (response.data.credits) {
                    setCreditValuesForYgpa(new Array(4).fill().map((_, index) => response.data.credits[index]))
                }

                // setCreditValuesForYgpa(new Array(4).fill().map((_, index) => userInfo.credits[index]))
                // const temp = [...response.data.credits];
                // setCreditValues(temp);
                // console.log(response);
                // setWhichYear(1);
                setIsLogin((email) ? true : false);
            } catch (err) {
                alert("login required");
                console.log(err);
            }
        }
        func();

    }
    const handleChange = (e) => {
        const curr = e.target.value;
        console.log(curr);
        setWhichYear(curr);
        const temp = [];
        let startInd;
        if (curr == 1) {
            startInd = 0;
        } else {
            startInd = Math.pow(2, curr);
        }
        for (let i = startInd; i < startInd + 4; i++) {
            temp.push(userInfo.credits[i]);
        }
        setCreditValuesForYgpa(temp);

        const temp2 = [];
        temp2.push(2 * curr - 1);
        temp2.push(2 * curr);
        setArrayOfSems(temp2)

        // setIsVisited(new Array(curr * 2).fill(false));
    };
    const handleCreditValues = (index, value) => {
        const temp = [...creditValuesForYgpa];
        temp[index] = value;
        setCreditValuesForYgpa(temp);
    };
    const isVisitedHandler = (index) => {
        const temp = [...isVisited];
        temp[index] = true;
        setIsVisited(temp);
    };
    const handleSubmit = () => {
        // Check if any TextField is empty
        if (creditValuesForYgpa.some((value) => value === "")) {
            alert("Please fill in all TextFields before submitting.");
            const temp = [...checkedBeforeSubmit];
            creditValuesForYgpa.forEach((value, index) => {
                if (value === "") {
                    temp[index] = false;
                }
            });
            setCheckedBeforeSubmit(temp);
        } else {
            // Submit the form or take the desired action
            // You can add your submission logic here
            let obcredit = 0;
            let total_full_credit = 0;
            creditValuesForYgpa.forEach((value, index) => {
                if (index % 2 == 0) {
                    obcredit = obcredit + parseFloat(value);
                } else {
                    total_full_credit = total_full_credit + parseFloat(value);
                }
            });
            const ygpa = (obcredit / total_full_credit);
            setYgpa(ygpa.toFixed(2));
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
                overflow: 'auto'
            }}>
            <Box height={"4.5rem"}></Box>
            <Box>
                <Typography textAlign={"center"}
                    variant="h4"
                    color={Birch}
                    fontWeight={"bold"}
                    padding={1}>Find YGPA</Typography>

                <Box
                    borderRadius={2}
                    sx={{
                        padding: "1.5rem",
                        background: "white",
                        boxShadow: "2px 4px 5px 1px black",
                        margin: "1.5rem",

                    }}
                    boxShadow={"2px 2px"}>
                    <Grid container columnGap={1} rowGap={1}>
                        <Grid item>
                            <Button onClick={handleFetchData} variant="outlined" sx={{color:'black'}}>Use Your Profile data</Button>
                        </Grid>
                        <Grid item>
                            <DialogBox></DialogBox>
                        </Grid>
                    </Grid>
                    <Divider sx={{mt:2}}></Divider>
                    <Box>
                        {(isLogin) ?
                            <Box>
                                <Typography fontSize={
                                    '1.2rem'
                                }>Enter which year you want to calculate</Typography>
                                <FormControl sx={{
                                    mb: 3, width: {
                                        xs: '100%',
                                        md: '100%',
                                        lg: '50%'
                                    }
                                }}>
                                    <InputLabel >year</InputLabel>
                                    <Select
                                        value={whichYear}
                                        label="year"
                                        onChange={handleChange}
                                    >
                                        {arrayOfYears.map((v) => {

                                            return <MenuItem value={v}>{v}</MenuItem>;

                                        })}
                                    </Select>
                                </FormControl>
                            </Box> : null}
                        <Grid container rowSpacing={1}>
                            {arrayOfSems.map((item, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    sx={{
                                        ml: {
                                            md: 5,
                                        },
                                    }}>
                                    <Typography
                                        fontWeight={"bold"}
                                        padding={1}
                                        textTransform={"uppercase"}
                                        color={Mauntain_Mist}>
                                        For semester {item}:
                                    </Typography>
                                    <Grid container spacing={2} sx={{}}>

                                        <Grid item xs={6} md={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                label={`Obtained credit`}
                                                onChange={(e) =>
                                                    handleCreditValues(index * 2, e.target.value)
                                                }
                                                onFocus={() => isVisitedHandler(index * 2)}
                                                value={creditValuesForYgpa[index * 2]}
                                                error={
                                                    (creditValuesForYgpa[index * 2] === "" &&
                                                        isVisited[index * 2]) ||
                                                        (checkedBeforeSubmit[index * 2] == false &&
                                                            isVisited[index * 2] == false)
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    (creditValuesForYgpa[index * 2] === "" &&
                                                        isVisited[index * 2]) ||
                                                        (checkedBeforeSubmit[index * 2] == false &&
                                                            isVisited[index * 2] == false)
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
                                                    handleCreditValues(index * 2 + 1, e.target.value)
                                                }
                                                onFocus={() => isVisitedHandler(index * 2 + 1)}

                                                value={creditValuesForYgpa[index * 2 + 1]}
                                                error={
                                                    (creditValuesForYgpa[index * 2 + 1] === "" &&
                                                        isVisited[index * 2 + 1]) ||
                                                        (checkedBeforeSubmit[index * 2 + 1] == false &&
                                                            isVisited[index * 2 + 1] == false)
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    (creditValuesForYgpa[index * 2 + 1] === "" &&
                                                        isVisited[index * 2 + 1]) ||
                                                        (checkedBeforeSubmit[index * 2 + 1] == false &&
                                                            isVisited[index * 2 + 1] == false)
                                                        ? "Requied field"
                                                        : "Enter Full credit points"
                                                }

                                            ></TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box>
                        <Button variant="contained" sx={{ mt: 4 }} style={{ backgroundColor: Cafe_Royale }} onClick={handleSubmit}>
                            Calculate YGPA
                        </Button>
                        {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ p: 1, backgroundColor: Corn }}>
                                <Typography fontWeight={'bold'} color={'white'}>
                                    Your Ygpa is: {ygpa}
                                </Typography>
                            </Card> </Box> : null}

                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

// const ControlDialog = ({isLogin})=>{

//     return(
//         <Box>
//             <Dialog open={!isLogin}>
//                 <DialogActions></DialogActions>
//             </Dialog>
//         </Box>
//     )
// }

export default FindYgpa;

