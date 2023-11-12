import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    Typography,
    Stack,
    TextField,
    Divider,
} from "@mui/material";

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

import Checkbox from "@mui/material/Checkbox";
import "../index.css";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { forAniPages } from "./Appbar";
import { Navigate, useNavigate } from "react-router-dom";
import { Appbar } from "./Appbar";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = ({ email, setEmail }) => {

    return (
        <Box>
            <ViewProfile email={email} setEmail={setEmail}></ViewProfile>
        </Box>
    );
};


const calculateYgpas = (creditScores) => {
    let obcredit = 0;
    let total_full_credit = 0;
    const temp = [];
    // console.log(creditScores);

    creditScores.forEach((value, index) => {
        if (index % 2 == 0) {
            obcredit = obcredit + parseFloat(value);
        } else {
            total_full_credit = total_full_credit + parseFloat(value);
        }
        if (index % 4 === 3) {
            const ygpa = (obcredit / total_full_credit);
            temp.push(ygpa.toFixed(2));
            obcredit = 0;
            total_full_credit = 0;
        }
    });

    return temp;
}

const calculateSgpas = (creditScores) => {
    const temp = [];
    creditScores.forEach((value, index) => {
        if (index % 2 === 0) {
            const sgpa = (value / creditScores[index + 1])
            temp.push(sgpa.toFixed(2));
        }
    });
    return temp;
}

const calculateDgpa = (arrayOfYgpas, isLateralEntry) => {
    // const temp;
    let sum = 0;
    // console.log("tempMUL", tempMul);
    // console.log("numOfYear", numOfYear);
    // const temp = [...yearValues];
    // console.log(arrayOfYgpas);
    let dgpa = 0;
    let numOfYear = arrayOfYgpas.length;
    if (
        numOfYear == 5 ||
        numOfYear == 2 ||
        (numOfYear == 3 && isLateralEntry == false)
    ) {
        for (let i = 0; i < numOfYear; i++) {
            // console.log(parseFloat(temp[i]));
            sum += parseFloat(arrayOfYgpas[i]);
        }
        dgpa = sum / numOfYear;
        // console.log("sum", sum);
        // console.log("dgpa", dgpa);

    } else if (numOfYear == 4) {
        // const tempMul = (numOfYear + 1) * parseFloat(targetDGPA);
        for (let i = 0; i < numOfYear; i++) {
            // console.log(parseFloat(temp[i]));

            if (i > 1) {
                sum += 1.5 * parseFloat(arrayOfYgpas[i]);
            } else {
                sum += parseFloat(arrayOfYgpas[i]);
            }
        }
        // // console.log("sum", sum);
        dgpa = sum / numOfYear;

    } else {
        // const tempMul = (numOfYear + 1) * parseFloat(targetDGPA);
        for (let i = 0; i < numOfYear; i++) {
            // console.log(parseFloat(temp[i]));

            if (i > 0) {
                sum += 1.5 * parseFloat(arrayOfYgpas[i]);
            } else {
                sum += parseFloat(arrayOfYgpas[i]);
            }
        }
        dgpa = sum / numOfYear;
    }
    return dgpa.toFixed(2);
}


const ViewProfile = ({ email, setEmail }) => {
    const Navigate = useNavigate();

    const [creditScores, setCreditScores] = useState([]);


    const [userInfo, setUserInfo] = useState({})
    const [arrayOfYgpas, setArrayOfYgpas] = useState([]);
    const [arrayOfSgpas, setArrayOfSgpas] = useState([]);
    const [dgpa, setDgpa] = useState("");
    const [arrayOfPercentagePerYear, setArrayOfPercentagePerYear] = useState([]);
    const [isLateralEntry, setIsLateralEntry] = useState(false);


    // console.log("arrayOfYgpas", arrayOfYgpas);
    // console.log("arrayOfSgpas", arrayOfSgpas);
    useEffect(() => {
        const func = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/getUserInfo", {
                    headers: {
                        'authorization': "Barrier " + localStorage.getItem('token')
                    }
                });
                setUserInfo(response.data);
                setCreditScores(response.data.credits);
                const temp = calculateYgpas(response.data.credits);
                setArrayOfYgpas(temp);
                const temp2 = calculateSgpas(response.data.credits);
                setArrayOfSgpas(temp2);
                const temp3 = calculateDgpa(temp, false);
                setDgpa(temp3)
                // console.log("temp3", temp3)

            } catch (error) {
                console.log(error);
            }
        }
        func();
        // console.log("inside profile");
    }, [email])

    // console.log(creditScores);
    console.log("userInfo",userInfo)


    return (
        <Box
            style={{
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
                    Profile
                </Typography>
                {(Object.keys(userInfo).length === 0 && email)? <MyBackDrop></MyBackDrop> : null }
                
                <Grid container columnGap={5}>
                    <Grid item md={9} xs={12}>
                        <Box
                            borderRadius={2}
                            sx={{
                                padding: "1.5rem",
                                background: "white",
                                boxShadow: "2px 4px 5px 1px black",
                                margin: "1.5rem",
                            }}
                            boxShadow={"2px 2px"}>
                            <Typography>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Name:</span> {userInfo.firstName}{" "}
                                {userInfo.lastName}{" "}
                            </Typography>
                            <Typography>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Email Id: </span> {userInfo.email}{" "}
                            </Typography>
                            <Typography>
                                <span style={{ fontWeight: "bold" }}>Phone No:</span> {userInfo.contact}{" "}
                            </Typography>
                            <Divider></Divider>
                            <Typography fontWeight={"bold"} textTransform={"uppercase"} pt={'2rem'} textAlign={'center'} p={2}>
                                {" "}
                                Semester results
                            </Typography>
                            <Box overflow={'auto'}>
                                <table border={1} width={"100%"} style={{ borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th>Semester</th>
                                            <th>Obtained Credit</th>
                                            <th>Full Credit</th>
                                            <th>SGPA</th>
                                            <th>YGPA</th>
                                            <th>DGPA</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {creditScores.map((crd, index) => (
                                            <>
                                                {(index % 2 == 0) ?
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>{index / 2 + 1}</td>
                                                        <td style={{ textAlign: 'center' }}>{crd}</td>
                                                        <td style={{ textAlign: 'center' }}>{creditScores[index + 1]}</td>
                                                        <td style={{ textAlign: 'center' }}>{arrayOfSgpas[index / 2]}</td>
                                                        {(index % 4 == 0) ? <td style={{ textAlign: 'center' }} rowSpan={2}>{arrayOfYgpas[index / 4]}</td> : null}
                                                        {(index == 0) ? <td style={{ textAlign: 'center' }} rowSpan={arrayOfSgpas.length}>{dgpa}</td> : null}

                                                    </tr>
                                                    : null}
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={2} xs={12}>
                        <Box>
                            <Button
                                variant="contained"
                                sx={{ color: "white", background: Cafe_Royale, m: '1.5rem' }}
                                onClick={() => {
                                    Navigate('/editProfile')
                                }}>
                                Edit Profile
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export const MyBackDrop = ()=>{
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default Profile;
