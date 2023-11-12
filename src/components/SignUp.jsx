// import {Appbar} from './Appbar';
import React, { useState } from "react";
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

function SignUp({openSignUp,setOpenSignUp}) {
    const [massage, setMassage] = React.useState("");
    const [email, setEmail] = useState("");
    const [password, setPassward] = useState("");
    // console.log(email,password);
    // const [openSignUp, setOpenSignUp] = useState(false);

    const handleClose = () => {
        setOpenSignUp(false)
    }
    return (
        <div>
            {/* <Appbar ></Appbar> */}
            <Dialog open={openSignUp} onClose={handleClose} >
                <Card sx={{
                    display: 'inline-block',
                    width: {
                        xs: 300,
                        md: 350
                    },
                    background: 'rgba(255, 255, 255,0.5)', //semi transparent background
                    backdropFilter: 'blur(8px)', // Apply a blur effect
                }}
                >
                    <Stack>
                        <Typography variant='h4' textAlign={'center'} sx={{ fontWeight: '400', padding: '10px' }}>Signup</Typography>
                        <TextField
                            label='email'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{ margin: 2 }}>
                        </TextField>
                        <TextField
                            label='password'
                            onChange={(e) => {
                                setPassward(e.target.value);
                            }}
                            sx={{ margin: 2 }}>
                        </TextField>
                        <Typography textAlign={'center'} color={'red'} sx={{ fontSize: '15px' }}>{massage}</Typography>
                    </Stack>
                    <CardActions>
                        <Button
                            color='primary'
                            onClick={() => {
                                fetch("http://localhost:3000/user/signup", {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        email: email,
                                        password
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }

                                }).then((res) => {
                                    return res.json()
                                }).then((data) => {
                                    setMassage(data.massage);
                                    const token = data.token;
                                    if (token) {
                                        localStorage.setItem("token", token);
                                        // window.location = '/';
                                    }
                                })
                            }}
                        >Sign Up</Button>
                    </CardActions>
                </Card>
            </Dialog>
        </div>
    )
}
export default SignUp;