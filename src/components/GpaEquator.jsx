import React, { useState } from "react";
import { Button, Grid, Typography, Stack, TextField } from "@mui/material";

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
// // import "../index.css";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


const GpaEquator = () => {
  const maxYears = 5;
  const arrayOfMaxYears = new Array(maxYears)
    .fill()
    .map((_, index) => index + 1);
  const [numOfYear, setNumOfYear] = useState(4);
  const maxArrayOfPassoutYears = new Array(numOfYear - 1)
    .fill()
    .map((_, index) => index + 1);
  const [arrayOfYear, setArrayOfYear] = useState(
    new Array(numOfYear).fill().map((_, index) => index + 1)
  );
  const [isLateralEntry, setIsLateralEntry] = useState(false);
  console.log("islareral entry", isLateralEntry);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [numOfPassoutYear, setNumOfPassoutYear] = useState(3);
  const [arrayOfPassOutYears, setArrayOfPassOutYears] = useState(
    new Array(numOfYear - 1).fill().map((_, index) => index + 1)
  );
  console.log("numOfYear", numOfYear);
  console.log("arrayOfYear", arrayOfYear);
  console.log("numOfPassoutYear", numOfPassoutYear);
  console.log("arrayOfPassOutYears", arrayOfPassOutYears);

  const [yearValues, setYearValues] = useState(new Array(numOfYear).fill(""));
  const [validValues, setValidValues] = useState(
    new Array(numOfPassoutYear).fill(true)
  );
  // console.log(validValues);
  const [isVisited, setIsVisited] = useState(
    new Array(numOfPassoutYear).fill(false)
  );
  const [checkedBeforeSubmit, setCheckedBeforeSubmit] = useState(
    new Array(numOfYear).fill(true)
  );
  const [targetDGPA, setTargetDGPA] = useState("");
  // console.log(typeof (targetDGPA), targetDGPA);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // console.log("yearvalues", yearValues);
  // console.log("form sumbitted", formSubmitted);

  const handleChange1 = (event) => {
    const curr = event.target.value;
    // console.log("curr",curr);
    setNumOfYear(curr);
    setArrayOfYear(new Array(curr).fill().map((_, index) => index + 1));
    setNumOfPassoutYear(curr - 1);
    setArrayOfPassOutYears(
      new Array(curr - 1).fill().map((_, index) => index + 1)
    );
    const temp = [...yearValues];
    let count =
      curr > yearValues.length
        ? curr - yearValues.length
        : yearValues.length - curr;
    while (count) {
      if (curr > yearValues.length) {
        temp.push("");
      } else {
        temp.pop();
      }
      count = count - 1;
    }
    console.log("temp", temp);
    setYearValues(temp);
    setValidValues(new Array(curr - 1).fill(true));
  };

  const handleChange2 = (event) => {
    const curr = event.target.value;
    setNumOfPassoutYear(curr);
    setArrayOfPassOutYears(new Array(curr).fill().map((_, index) => index + 1));
  };

  const passoutHandler = (index) => {
    if (index + 1 <= numOfPassoutYear) return true;
    else return false;
  };
  const isVisitedHandler = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };

  const handleValueChange = (index, value) => {
    const newTextValues = [...yearValues];
    newTextValues[index] = value;
    setYearValues(newTextValues);
    const temp = [...validValues];
    if (
      (parseFloat(value) > 10 || parseFloat(value) < 0) &&
      passoutHandler(index)
    ) {
      temp[index] = false;
    } else {
      temp[index] = true;
    }
    setValidValues(temp);
  };

  const SgpaOrYgpaValueValidityHandler = (value) => {
    if (parseFloat(value) > 10 || parseFloat(value) < 0) return false;
    else return true;
  };
  const focusHandler = (index) => {
    if (index + 1 > numOfPassoutYear) {
      return true;
    }
  };

  const handleSubmit = () => {
    // Check if any TextField is empty
    if (
      yearValues.some((value, index) => {
        if (passoutHandler(index)) {
          return value === "";
        }
      })
    ) {
      alert("Please fill all TextFields before submitting.");
      const temp = [...checkedBeforeSubmit];
      yearValues.forEach((value, index) => {
        if (passoutHandler(index) && value === "") {
          temp[index] = false;
        }
      });
      setCheckedBeforeSubmit(temp);
    } else if (
      yearValues.some((value, index) => {
        if (passoutHandler(index)) {
          return parseFloat(value) > 10 || parseFloat(value) < 0;
        }
      })
    ) {
      alert(
        "some text value are invalid , YGPAs shoud not be greater than 10 or less than 0"
      );
      const temp = [...validValues];
      yearValues.forEach((value, index) => {
        if (
          (parseFloat(value) > 10 || parseFloat(value) < 0) &&
          passoutHandler(index)
        ) {
          temp[index] = false;
        } else {
          temp[index] = true;
        }
      });
      setValidValues(temp);
    } else {
      // const sum = yearValues.reduce((accumulator, currentValue) => {
      //     return accumulator + parseFloat(currentValue);
      // }, 0);
      // const per = (sum / (numOfYear * 10)) * 100 - 0.75;

      // setPercentage(per);
      // alert("hello")
      // console.log(parseFloat(targetDGPA))

      let sum = 0;
      // console.log("tempMUL", tempMul);
      // console.log("numOfYear", numOfYear);
      const temp = [...yearValues];
      let ans = 0;
      if (
        numOfYear == 5 ||
        numOfYear == 2 ||
        (numOfYear == 3 && isLateralEntry == false)
      ) {
        for (let i = 0; i < numOfPassoutYear; i++) {
          // console.log(parseFloat(temp[i]));
          sum += parseFloat(temp[i]);
        }
        const tempMul = numOfYear * parseFloat(targetDGPA);

        // console.log("sum", sum);
        ans = (tempMul - sum) / (numOfYear - numOfPassoutYear);

        // console.log("ans", ans);
        for (let i = numOfPassoutYear; i < numOfYear; i++) {
          temp[i] = String(ans);
        }
      } else if (numOfYear == 4) {
        const tempMul = (numOfYear + 1) * parseFloat(targetDGPA);
        for (let i = 0; i < numOfPassoutYear; i++) {
          // console.log(parseFloat(temp[i]));

          if (i > 1) {
            sum += 1.5 * parseFloat(temp[i]);
          } else {
            sum += parseFloat(temp[i]);
          }
        }
        // console.log("sum", sum);
        if (numOfYear - numOfPassoutYear == 1) {
          ans = (tempMul - sum) / 1.5;
        } else if (numOfYear - numOfPassoutYear == 2) {
          ans = (tempMul - sum) / 3;
        } else {
          ans = (tempMul - sum) / 4;
        }
        for (let i = numOfPassoutYear; i < numOfYear; i++) {
          temp[i] = String(ans.toFixed(2));
        }
        if (ans > 10) {
          alert(
            "you don't have any change to achive you target, your desired ygpa's are more than 10"
          );
        }
      } else {
        const tempMul = (numOfYear + 1) * parseFloat(targetDGPA);
        for (let i = 0; i < numOfPassoutYear; i++) {
          // console.log(parseFloat(temp[i]));

          if (i > 0) {
            sum += 1.5 * parseFloat(temp[i]);
          } else {
            sum += parseFloat(temp[i]);
          }
        }
        if (numOfYear - numOfPassoutYear == 1) {
          ans = (tempMul - sum) / 1.5;
        } else {
          ans = (tempMul - sum) / 3;
        }
        for (let i = numOfPassoutYear; i < numOfYear; i++) {
          temp[i] = String(ans.toFixed(2));
        }
        if (ans > 10) {
          alert(
            "you don't have any change to achive you target, your desired ygpa's are more than 10"
          );
        }
      }
      setFormSubmitted(true);
      setYearValues(temp);
    }
  };
  return (
    <Box
      overflow={'auto'}
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

      <Box

      >
        {/* <Appbar></Appbar> */}
        <Typography
          textAlign={"center"}
          variant="h4"
          color={Birch}
          fontWeight={"bold"}
          padding={2}>
          GPA Goal Analyzer
        </Typography>
        <Box>
          <Grid
            container
            columnGap={1}
            display={"flex"}
            justifyContent={"center"}>
            <Grid
              item
              xs={12}
              md={5}
              // style={{ width: "50vw" }}
              borderRadius={2}
              sx={{
                padding: "1.5rem",
                margin: "1.5rem",
                marginTop: "1rem",
                background: "white",
                boxShadow: "2px 4px 5px 1px black",
              }}
              boxShadow={"2px 2px"}>
              <Box>
                <Typography
                  textAlign={"center"}
                  fontWeight={"bold"}
                  color={Mauntain_Mist}
                  // variant="h6"
                  fontSize={15}
                  paddingBottom={2}>
                  PlEASE SELECT TOTAL NUMBER OF YEARS OF YOUR DEGREE
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="select no of years">No of years</InputLabel>
                  <Select
                    labelId="select no of years"
                    value={numOfYear}
                    label="No of years"
                    onChange={handleChange1}>
                    {arrayOfMaxYears.map((v) => {
                      if (v > 1) {
                        return <MenuItem value={v}>{v}</MenuItem>;
                      }
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              // style={{ width: "50vw" }}
              borderRadius={2}
              sx={{
                padding: "1.5rem",
                margin: "1.5rem",
                marginTop: "1rem",
                background: "white",
                boxShadow: "2px 4px 5px 1px black",
              }}
              boxShadow={"2px 2px"}>
              <Box>
                <Typography
                  textAlign={"center"}
                  fontWeight={"bold"}
                  color={Mauntain_Mist}
                  // variant="h6"
                  fontSize={15}
                  paddingBottom={2}>
                  PlEASE SELECT TOTAL NUMBER OF PASSOUT YEARS
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="select no of years">No of years</InputLabel>
                  <Select
                    labelId="select no of years"
                    value={numOfPassoutYear}
                    label="No of years"
                    onChange={handleChange2}>
                    {maxArrayOfPassoutYears.map((v) => (
                      <MenuItem value={v}>{v}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Box
            borderRadius={2}
            sx={{
              padding: "1.5rem",
              margin: "1.5rem",
              marginTop: "1rem",
              background: "white",
              boxShadow: "2px 4px 5px 1px black",

              width: {
                xs: "100vw",
                md: "80vw",
              },
            }}
            boxShadow={"2px 2px"}>
            <Grid
              container
              rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={3}>
                <Typography color={Mauntain_Mist} sx={{ pt: 2 }}>
                  Enter target DGPA:
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                sx={{
                  marginLeft: {
                    md: "-5rem",
                  },
                  marginRight: {
                    md: "12rem",
                  },
                }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  sx={{ pb: 3 }}
                  type="number"
                  onChange={(e) => {
                    setTargetDGPA(e.target.value);
                  }}
                  error={
                    SgpaOrYgpaValueValidityHandler(targetDGPA) ? false : true
                  }
                  helperText={
                    SgpaOrYgpaValueValidityHandler(targetDGPA)
                      ? ""
                      : "Not valid"
                  }></TextField>
              </Grid>
              <Grid
                item
                xs={6}
                md={2}
                sx={{ display: numOfYear != 3 ? "none" : "block" }}>
                <Typography color={Mauntain_Mist} sx={{ pt: 1 }}>
                  Lateral Entry:
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                md={2}
                sx={{ display: numOfYear != 3 ? "none" : "block" }}>
                <Checkbox
                  {...label}
                  onChange={(e) => {
                    setIsLateralEntry(e.target.checked);
                  }}
                  sx={{
                    ml: {
                      md: "-3rem",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                borderTop: 1,
                borderStyle: "dashed",
                borderColor: Mauntain_Mist,
                borderBottom: "none",
                borderLeft: "none",
                borderRight: "none",
                paddingTop: 1,
              }}>
              <Typography color={Mauntain_Mist} pb={1}>
                Enter YGPAs:
              </Typography>
            </Box>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {arrayOfYear.map((item, index) => (
                <Grid item xs={6} md={3}>
                  <TextField
                    variant={"outlined"}
                    label={`for year ${item}`}
                    value={yearValues[index]}
                    required={passoutHandler(index)}
                    placeholder={
                      passoutHandler(index) ? "Enter YGPA " : "Estimated YGPA"
                    }
                    InputProps={
                      passoutHandler(index)
                        ? {
                          readOnly: false,
                        }
                        : { readOnly: true }
                    }
                    focused={focusHandler(index)}
                    onFocus={() => isVisitedHandler(index)}
                    error={
                      (isVisited[index] == true &&
                        yearValues[index] === "" &&
                        passoutHandler(index)) ||
                        (passoutHandler(index) && !validValues[index])
                        ? true
                        : false
                    }
                    helperText={
                      passoutHandler(index)
                        ? validValues[index]
                          ? ""
                          : "invalid value"
                        : "Read only"
                    }
                    type="number"
                    onChange={(e) =>
                      handleValueChange(index, e.target.value)
                    }></TextField>
                </Grid>
              ))}
            </Grid>
            <Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 4 }}
                style={{ backgroundColor: Cafe_Royale }}
                onClick={handleSubmit}>
                Analyze
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GpaEquator;
