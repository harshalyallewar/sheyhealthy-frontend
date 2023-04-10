import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import Layout from "../components/layout";
import bookNow from "../images/bookNow.jpeg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment from "moment";
import { server_address } from "./variables/addresses";

function BookAppointments() {
  const [time, setTime] = useState("12:00");
  const [date, setDate] = useState("");
  const [isAvailable, setisAvailable] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const bookAppointment = async () => {
    try {
      const response = await axios.post(
        `${server_address}/api/doctor/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: userDetails._id,
          time,
          date,
          doctorInfo: doctor,
          userInfo: userDetails,
          status: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setisAvailable(false);
        navigate("/user/appointments");
        toast.success("Succesfully booked for doctor appointment");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const checkAppointment = async () => {
    try {
      const response = await axios.post(
        `${server_address}/api/doctor/check-appointment`,
        {
          doctorId: params.doctorId,
          time,
          date,
          doctor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setisAvailable(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const getDoctorInfo = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${server_address}/api/doctor/get-doctor-info-by-id`,
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        const res = response.data.data;

        setDoctor(res);
      } else {
        toast.error("error in getting doctor info, please try again");
      }
    } catch (err) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorInfo();
    setDate(moment().format("YYYY-MM-DD"));
    setTime(moment().format("HH:mm"));
  }, []);

  return (
    <Layout>
      <Grid container sx={{ p: "20px" }} className="bookAppGridContainer">
        <Grid item xs={12} sx={{mb:'50px'}}>
          <Typography variant="h2" sx={{ fontSize: "27px", fontWeight: "400",mb:'5px' }}>
            Dr. {doctor?.firstName} {doctor?.lastName}
          </Typography>
          <hr />
        </Grid>
   

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ px: { xs: "10px", md: "90px" }, py: "20px" }}
        >
          <Typography
            variant="h5"
            sx={{ mb: "5px", fontSize: "15px", fontWeight: "400" }}
          >
            Timings :{" "}
            <Typography
              sx={{ display: "inline", fontSize: "14px", fontWeight: "400" }}
            >
              {doctor?.startTime}
              {" - "} {doctor?.endTime}
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: "5px", fontSize: "15px", fontWeight: "400" }}
          >
            Address :{" "}
            <Typography
              sx={{ display: "inline", fontSize: "14px", fontWeight: "400" }}
            >
              {doctor?.address}
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: "5px", fontSize: "15px", fontWeight: "400" }}
          >
            Fee per visit :{" "}
            <Typography
              sx={{ display: "inline", fontSize: "14px", fontWeight: "400" }}
            >
              {doctor?.feePerConsultation}
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: "5px", fontSize: "15px", fontWeight: "400" }}
          >
            website :{" "}
            <Typography
              sx={{ display: "inline", fontSize: "14px", fontWeight: "400" }}
            >
              {doctor?.website}
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: "34px", fontSize: "15px", fontWeight: "400" }}
          >
            Phone Number :{" "}
            <Typography
              sx={{ display: "inline", fontSize: "14px", fontWeight: "400" }}
            >
              {doctor?.phoneNumber}
            </Typography>
          </Typography>
        </Grid>

        <Grid xs={12} sm={6} item >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "flex-start",
              p: "10px",
            }}
          >
            <TextField
              size="large"
              label="Select Date"
              type="date"
              value={date}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: { xs: 220, sm: 300 }, mb: "22px" }}
              onChange={(val) => {
                setDate(moment(val.target.value).format("DD-MM-YYYY"));
                setisAvailable(false);
              }}
            />

            <TextField
              size="large"
              value={time}
              label="Select Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: { xs: 220, sm: 300 }, mb: "22px" }}
              onChange={(val) => {
                setTime(val.target.value);
                setisAvailable(false);
              }}
            />

            {isAvailable ? (
              <Button
                variant="contained"
                size="large"
                sx={{
                  display: "block",
                  width: { xs: 220, sm: 300 },
                  mb: "22px",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "#005555",
                  },
                  backgroundColor: "#005555",
                  letterSpacing: "0.7px",
                  fontWeight: "400",
                }}
                onClick={bookAppointment}
              >
                Book
              </Button>
            ) : (
              <Button
                onClick={checkAppointment}
                variant="contained"
                size="large"
                sx={{
                  display: "block",
                  width: { xs: 220, sm: 300 },
                  mb: "22px",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "#005555",
                  },
                  backgroundColor: "#005555",
                  letterSpacing: "0.7px",
                  fontWeight: "400",
                }}
              >
                Check Availability
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default BookAppointments;
