import React, { useState } from "react";
import SignUp from './SignUp';
import { Button, Grid, Typography, Stack, TextField, Card, CardActions } from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Mauntain_Mist } from "../Colors";
import { Birch } from "../Colors";
import { Corn } from "../Colors";
import { Cafe_Royale } from "../Colors";
// import "../index.css";
import myImage from '../images/credit-details.png';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function SignIn({setEmail,openSignIn, setOpenSignIn, massage, setMassage, setSnackbarOpen}) {

    const [emailId, setEmailId] = useState("");
    const [password, setPassward] = useState("");
    const [openSignUp, setOpenSignUp] = useState(false);
    const Navigate = useNavigate();

    const handleClose = () => {
        setOpenSignIn(false);
    }
    return (
        <div>
            <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}></SignUp>
            <Dialog open={openSignIn} onClose={handleClose}>
                <Card sx={{
                    display: 'inline-block',
                    width: {
                        xs: 300,
                        md: 350
                    },
                    height: 400,
                    background: 'rgba(255, 255, 255,0.5)', //semi transparent background
                    backdropFilter: 'blur(8px)', // Apply a blur effect
                }}
                >
                    <Stack>
                        <Typography variant='h4' textAlign={'center'} sx={{ fontWeight: '400', padding: '10px' }}>Log In</Typography>
                        <TextField
                            label='email'
                            sx={{ margin: 2 }}
                            onChange={(e) => {
                                setEmailId(e.target.value);
                            }}

                        >
                        </TextField>
                        <TextField
                            label='password'
                            sx={{ margin: 2 }}
                            onChange={(e) => {
                                setPassward(e.target.value);
                            }}
                        >
                        </TextField>
                        <Typography textAlign={'center'} color={'red'} sx={{ fontSize: '15px' }}>{massage}</Typography>
                    </Stack>
                    <CardActions>
                        <Button
                            color='secondary'
                            variant='contained'
                            sx={{ ml: 2 }}
                            onClick={() => {
                                fetch("http://localhost:3000/user/signin", {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        email: emailId,
                                        password
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }

                                }).then((res) => {
                                    return res.json()
                                }).then((data) => {
                                    setMassage(data.massage);
                                    console.log(data);
                                    console.log("data.email",data.email);
                                    const token = data.token;
                                    if (token) {
                                        setSnackbarOpen(true);
                                        localStorage.setItem("token", token);
                                        setEmail(data.email);
                                        handleClose();

                                    }
                                })
                            }}
                        >Sign In</Button>
                    </CardActions>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography textAlign={'center'}>or Sign Up</Typography>
                        <Button
                            style={{ display: 'inline-block', width: 100 }}
                            onClick={() => { setOpenSignUp(true); handleClose() }}
                            size='small'
                        >SignUp</Button>
                    </div>
                </Card>
            </Dialog>
        </div>
    )
}
export default SignIn;