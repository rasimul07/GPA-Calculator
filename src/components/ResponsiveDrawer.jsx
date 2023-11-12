import { Drawer, Box, Typography, Divider, Avatar, List, ListItemButton, ListItemText, Stack } from "@mui/material"
import Icon from '@mui/material/IconButton';
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { pages } from "./Appbar";
import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
function ResponsiveDrawer(props) {
  const Navigate = useNavigate();
  const email = props.email;
  const drpages = [...pages]
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>


      <IconButton
        edge="start" // Adjust this to position the button (e.g., "start" or "end")
        color="inherit" // Adjust this to set the icon color
        aria-label="menu" // Accessibility label
        onClick={() => setIsDrawerOpen(true)}
        sx={{
          ml: 1, display: {
            md: 'none'
          }
        }}
      >
        <MenuIcon sx={{ height: 30, width: 30 }} />
      </IconButton>

      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box width={'250px'} sx={{ background: "#9F9CA4", height: '100vh' }}>
          <Stack style={{ alignItems: 'center', padding: '20px' }} >
            <Avatar sx={{ height: { md: 70, xs: 45 }, width: { md: 70, xs: 45 }, fontSize: 30 }}
              alt={email}
              src="/static/images/avatar/1.jpg"
            ></Avatar>
            <Typography variant="h6" paddingTop={'5px'} fontSize={15}>{email}</Typography>
          </Stack>

          <Divider></Divider>
          <List>
            <ListItemButton onClick={() => {
              Navigate('/');
            }}>
              <ListItemText primary="DashBoard" />
            </ListItemButton>
            <ListItemButton onClick={() => {
              Navigate('/profile');
            }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
          <List>
            {drpages.map((item, index) => <ListItemButton onClick={() => {
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
              <ListItemText primary={`${item}`} />
            </ListItemButton>)}
            <LogInLogOut email={email}></LogInLogOut>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

function LogInLogOut(props) {
  const Navigate = useNavigate();
  const email = props.email;
  if (!email)
    return (
      <ListItemButton onClick={() => { window.location = './signin' }} >
        <ListItemText primary="Log in" />
      </ListItemButton>
    )
  return (
    <ListItemButton onClick={() => {
      localStorage.setItem("token", null);
      Navigate('/');
    }}>
      <ListItemText primary="Log out" />
    </ListItemButton>
  )
}
export default ResponsiveDrawer;