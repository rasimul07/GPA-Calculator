import React, { useState } from "react";
import { Button, Grid, Typography, Stack, TextField,Card } from "@mui/material";
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
import { Appbar } from "./Appbar";
import "../responsiveImage.css";



const FindPercentage = () => {
  const [formType, setFormType] = useState(1);

  return (
    <Box
      overflow={'auto'}
      style={{
        backgroundImage:
          "URL(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)",
        backgroundSize: "cover",
        // width: "100vw",
        height: '100vh',
        backgroundPosition: "center center",


      }}>
      {/* <Appbar></Appbar> */}
      <Box height={'4.5rem'}></Box>

      <Box >
        <Typography
          textAlign={"center"}
          variant="h4"
          color={Birch}
          fontWeight={"bold"}
          padding={2}>
          Find Percentage
        </Typography>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={5}
          // style={{ border: "2px solid green" }}

          >
            <Box>
              <Box
                // border={"2px solid red"}
                borderRadius={2}
                sx={{ background: "white", p: 3, boxShadow: "2px 4px 5px 1px black", margin: 2 }}>

                <Stack>
                  <Typography textAlign={"center"} fontWeight={"bold"} color={Mauntain_Mist}>
                    PlEASE SELECT A METHOD FROM BELOW
                  </Typography>
                  <Button
                    // sx={{ background: Cafe_Royale, color: 'white' }}
                    size="large"
                    variant={formType === 1 ? "contained" : null}
                    style={formType === 1 ? { background: Cafe_Royale } : {}}
                    className="custom-button"
                    onClick={() => {
                      setFormType(1);
                    }}>
                    Using Sgpa
                  </Button>
                  <Button
                    size="large"

                    style={formType === 2 ? { background: Cafe_Royale } : {}}
                    variant={formType === 2 ? "contained" : null}
                    onClick={() => {
                      setFormType(2);
                    }}>
                    Using Credit Score
                  </Button>
                  <Button
                    size="large"
                    variant={formType === 3 ? "contained" : null}
                    style={formType === 3 ? { background: Cafe_Royale } : {}}

                    onClick={() => {
                      setFormType(3);
                    }}>
                    Using Ygpa
                  </Button>
                </Stack>
              </Box>
              {/* <Box>
                <Box paddingTop={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={handleClickOpen} variant="outlined" sx={{ color: Birch }}>Where I found Credit point</Button>
                </Box>
                <Dialog onClose={handleClose} open={open} maxWidth={'maxwidth'}>
                  <DialogTitle>Result of a semester that help you to found the full credit and obtained credit</DialogTitle>
                  <DialogContent width={'fit-content'}>
                    <img src={myImage} alt="" height={'400px'} width={'600px'}></img>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      OK
                    </Button>
                  </DialogActions>

                </Dialog>
              </Box> */}
              <DialogBox></DialogBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={7} style={{}}>
            <Box
              borderRadius={2}
              sx={{ padding: "2rem", margin: "2rem", marginTop: '1rem', background: "white", boxShadow: "2px 4px 5px 1px black" }}
              boxShadow={"2px 2px"}>
              <CustomForm formType={formType}></CustomForm>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const CustomForm = ({ formType }) => {
  if (formType == 1) {
    return <SgpaToPercentage></SgpaToPercentage>;
  } else if (formType == 2) {
    return <CreditPointToPercentage></CreditPointToPercentage>;
  } else {
    return <Typography>Service is comming soon</Typography>;
  }
};

const CreditPointToPercentage = () => {
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [percentage, setPercentage] = useState(null);
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
      let obcredit = 0;
      let total_full_credit = 0;
      creditValues.forEach((value, index) => {
        if (index % 2 == 0) {
          obcredit = obcredit + parseFloat(value);
        } else {
          total_full_credit = total_full_credit + parseFloat(value);
        }
      });
      const per = (obcredit / (total_full_credit * 10)) * 100;
      // console.log(per);
      setPercentage(per);
      setFormSubmitted(true);
    }
  };
  return (
    <Box>
      <CustomFormControl numOfSemester={numOfSemester} handleChange={handleChange}></CustomFormControl>
      <Box>
        <Grid container rowSpacing={1} id='sgpa_to_percentage_form'>
          {arrayOfSems.map((item, index) => (
            <Grid
              item
              xs={12}
              md={12}
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
      <FindPercentageButton handleSubmit={handleSubmit}></FindPercentageButton>
      <ShowPercentage
        formSubmitted={formSubmitted}
        percentage={percentage}></ShowPercentage>
    </Box>
  );
};
const SgpaToPercentage = () => {
  const [numOfSemester, setNumOfSemester] = useState(2);
  const [arrayOfSems, setArrayOfSems] = useState(
    new Array(numOfSemester).fill().map((_, index) => index + 1)
  );
  const [semValues, setSemValues] = useState(new Array(numOfSemester).fill(""));
  const [isVisited, setIsVisited] = useState(
    new Array(numOfSemester).fill(false)
  );
  const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
    new Array(numOfSemester).fill(true)
  );
  const [percentage, setPercentage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    const curr = event.target.value;
    setNumOfSemester(curr);
    setArrayOfSems(new Array(curr).fill().map((_, index) => index + 1));
    const temp = [...semValues];
    console.log("temp", temp);
    let count =
      curr > semValues.length
        ? curr - semValues.length
        : semValues.length - curr;
    while (count) {
      if (curr > semValues.length) {
        temp.push("");
      } else {
        temp.pop();
      }
      count = count - 1;
    }
    console.log("temp", temp);
    setSemValues(temp);
    setCheckedBeforeSubmit(new Array(curr).fill(true));
  };

  const isVisitedHandler = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };
  const handleValueChange = (index, value) => {
    const newTextValues = [...semValues];
    newTextValues[index] = value;
    setSemValues(newTextValues);
  };

  const handleSubmit = () => {
    // Check if any TextField is empty
    if (semValues.some((value) => value === "")) {
      alert("Please fill in all TextFields before submitting.");
      const temp = [...checkedBeforeSubmit];
      semValues.forEach((value, index) => {
        if (value === "") {
          temp[index] = false;
        }
      });
      setCheckedBeforeSubmit(temp);
    } else {
      // Submit the form or take the desired action
      // You can add your submission logic here
      const sum = semValues.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue);
      }, 0);
      const per = (sum / (numOfSemester * 10)) * 100 - 0.75;

      setPercentage(per);
      setFormSubmitted(true);
    }
  };

  return (
    <Box>
      <CustomFormControl numOfSemester={numOfSemester} handleChange={handleChange}></CustomFormControl>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {arrayOfSems.map((item, index) => (
            <Grid item xs={6} md={6}>
              <TextField
                variant="outlined"
                required
                label={`Sem ${item}`}
                value={semValues[index]}
                error={
                  (semValues[index] === "" && isVisited[index]) ||
                    (checkedBeforeSubmit[index] == false &&
                      isVisited[index] == false)
                    ? true
                    : false
                }
                onFocus={() => isVisitedHandler(index)}
                helperText={
                  (semValues[index] === "" && isVisited[index]) ||
                    (checkedBeforeSubmit[index] == false &&
                      isVisited[index] == false)
                    ? "Requied field"
                    : "Enter sgpa"
                }
                placeholder=" Enter SGPA"
                type="number"
                sx={{ ml: 1 }}
                onChange={(e) =>
                  handleValueChange(index, e.target.value)
                }></TextField>
            </Grid>
          ))}
        </Grid>
      </Box>
      <FindPercentageButton handleSubmit={handleSubmit}></FindPercentageButton>
      <ShowPercentage
        formSubmitted={formSubmitted}
        percentage={percentage}></ShowPercentage>
    </Box>
  );
};


const CustomFormControl = ({ numOfSemester, handleChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 3 }} size="small">
      <InputLabel id="select no of sems">No of sems</InputLabel>
      <Select
        labelId="select no of sems"
        value={numOfSemester}
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
  )
}

const FindPercentageButton = ({ handleSubmit }) => {
  return (
    <Button variant="contained" sx={{ mt: 4 }} style={{ backgroundColor: Cafe_Royale }} onClick={handleSubmit}>
      Calculate Percentage
    </Button>
  );
};

const ShowPercentage = ({ formSubmitted, percentage }) => {
  return (
    <Box>
      {(formSubmitted) ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ p: 1, backgroundColor: Corn, m:2 }}>
          <Typography fontWeight={'bold'} color={'white'}>
            Your Percentage is: {percentage}
          </Typography>
        </Card> </Box> : null}
    </Box>
  );
};

const DialogBox = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => { setOpen(true) }} variant="outlined" sx={{ color: Birch }}>Where I found Credit point</Button>
      </Box>
      <Dialog onClose={() => { setOpen(false) }} open={open} maxWidth={'maxwidth'} sx={{ height: { xs : '80%', md: '100%', lg:'100%'}, marginTop:{xs:'4rem',md:'0rem'} }}>
        <DialogTitle sx={{fontSize:{xs:'1rem',md:'1.2rem'}}}>Result of a semester that help you to found the full credit and obtained credit</DialogTitle>
        <DialogContent width={'fit-content'}>
          <img src={myImage} alt="" className="resposive_image"></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export { FindPercentage, CustomFormControl, DialogBox };
