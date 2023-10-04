import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import TimePicker from "react-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server_address } from "./variables/addresses";

function ApplyDoctor() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [specialization, setspecialization] = useState("");
  const [experience, setexperience] = useState("");
  const [feePerConsultation, setfeePerConsultation] = useState("");
  const [website, setwebsite] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");

  const {userDetails} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !specialization ||
      !experience ||
      !feePerConsultation ||
      !website ||
      !startTime ||
      !endTime
    ) {
      toast.error("Please Enter All Details");
      return;
    }
    try {
      const response = await axios.post(
        `${server_address}/api/users/apply-doctor-account`,
        {
          firstName,
          lastName,
          phoneNumber,
          address,
          specialization,
          experience,
          feePerConsultation,
          website,
          startTime,
          endTime,
          userId: userDetails._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
console.log(response.data)
      if(response.data.success){
        toast.success("Succesfully applied for doctor account");
      } else {
        toast.error("error in applying, please try again");
      }
    } catch(err) {
        console.log("error occured in requesting apply doctor account")
    }
  };

  const h1style = {
    fontSize: "28px",
    mx: "5px",
    fontWeight: "600",
  };

  const h2style = {
    fontSize: "24px",
    color: "#454444",
    fontWeight: "500",
    mb: "5px",
    pl: "10px",
  };

  const typoStyle = {
    mb: "8px",
    ml: "6px",
    width: "100%",
  };

  const griditemStyle = {
    p: "10px",
  };

  return (
    <Layout>
      <Typography sx={h1style}>Apply Doctor</Typography>
      <hr />

      <Grid container>
        <Grid item xs={12}>
          <Typography sx={h2style}>Personal Information</Typography>
        </Grid>

        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>First Name</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setfirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Last Name</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setlastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Phone Number</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setphoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Website</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setwebsite(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Address</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setaddress(e.target.value)}
          />
        </Grid>
      </Grid>
      <hr />

      <Grid container>
        <Grid item xs={12}>
          <Typography sx={h2style}>Professional Information</Typography>
        </Grid>

        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Specialization</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setspecialization(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Experience</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setexperience(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} lg={4} sx={griditemStyle}>
          <Typography sx={typoStyle}>Fee Per Consultation (in Rs)</Typography>
          <TextField
            fullWidth
            size="small"
            onChange={(e) => setfeePerConsultation(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={h2style}>Timings</Typography>
        </Grid>
        <Grid item xs={12} lg={2} sx={griditemStyle}>
          <Typography sx={typoStyle}>Start Time</Typography>

          <TimePicker onChange={(val) => setstartTime(val)} value={startTime} />
        </Grid>

        <Grid item xs={12} lg={2} sx={griditemStyle}>
          <Typography sx={typoStyle}>End Time</Typography>

          <TimePicker
            className="timepicker"
            minutePlaceholder="MM"
            hourPlaceholder="HH"
            onChange={(val) => setendTime(val)}
            value={endTime}
          />
        </Grid>

        <Grid
          item
          xs={12}
          lg={8}
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <Button
            onClick={onFinish}
            sx={{ backgroundColor: "#005555", mr: "70px" }}
            variant="contained"
            size="large"
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ApplyDoctor;
