import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Birch, Cafe_Royale, Mauntain_Mist,Corn } from "../Colors";
import SignIn from "./SignIn";
import AccountMenu from "./AccountMenu";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";

const pages = [
  "Find SGPA",
  "Find Ygpa",
  "Find Dgpa",
  "find Percentage",
  "GPA Goal Analyzer",
];
const forAniPages = ["SGPA", "Ygpa", "Dgpa", "percentage", "GPA Goal Analyzer"];
function Appbar({email,setEmail}) {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [massage, setMassage] = useState("");
  const [snackbarOpen,setSnackbarOpen] = useState(false);
  useEffect(() => {
    const func = async ()=>{
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: {
          authorization: "Barrier " + localStorage.getItem("token"),
        }
      })
      setEmail(response.data.email);
    }
    func();
  },[]);

  return (
    <div>
      <MyAppbar email={email} setEmail={setEmail} pages={pages} setOpenSignIn={setOpenSignIn}></MyAppbar>
      <SignIn setEmail={setEmail} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} massage={massage} setMassage={setMassage} setSnackbarOpen={setSnackbarOpen}></SignIn>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={2000} 
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      }}
        >
        <Alert severity="success">Login Sucessfully</Alert>
      </Snackbar>
    </div>
  );
}



const MyAppbar = ({ email,setEmail, pages,setOpenSignIn }) => {
  const Navigate = useNavigate();
  return (
    <AppBar sx={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter:'blur(10px)'}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction={"row"}>
          <ResponsiveDrawer email={email}></ResponsiveDrawer>
          <Button size="large" sx={{color: 'white',fontSize:{
            xs:15,
            md:20
          },fontWeight:900,fontStyle:'italic'}} onClick={()=>{Navigate('/')}}>
            GPA Calc-ulater
          </Button>
        </Stack>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page, index) => (
            <Button
              sx={{ my: 2, color: 'white', ml: 2,fontSize:'1rem',fontWeight:'400' }}
              onClick={() => {
                if (index == 3) {
                  Navigate("/findPercentage");
                } else if (index == 4) {
                  Navigate("/gpaEquator");
                } else if (index == 1) {
                  Navigate("/findYgpa");
                } else if (index == 0) {
                  Navigate("/findSgpa");
                } else {
                  Navigate("/findDgpa");
                }
              }}>
              {page}
            </Button>
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#754B0F", display: (email)? 'none':'block'}}
        onClick={()=>{setOpenSignIn(true)}}
        >
          SignIn
        </Button>
        <AccountMenu email={email} ></AccountMenu>
      </Toolbar>
    </AppBar>
  );
};
export { Appbar,pages,forAniPages };
