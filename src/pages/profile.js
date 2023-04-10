import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { server_address } from "./variables/addresses";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formType, setFormType] = useState("name&email");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${server_address}/api/users/update-user-name-email`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        toast.success("Succesfully updated user profile");
      } else {
        toast.error("error in updating, please try again");
      }
    } catch (err) {
      dispatch(hideLoading());
    }
  };

  const updatePassword = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(`${server_address}/api/users/update-password`,{
        newPassword, oldPassword
      }, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(hideLoading());

      if(response.data.success){
          toast.success("Password changed successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch(err) {
      console.error(err.message);
    }
  };

  const getPreviousDataInputOnForm = async () => {
    try {
      const res = await axios.post(
        `${server_address}/api/users/get-user-info-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      }
    } catch {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPreviousDataInputOnForm();
  }, []);

  const centerStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Layout>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            p: { md: "50px", xs: "15px" },
            py: { xs: "20px", md: "80px" },
            backgroundColor: "#f5ffff",
            borderRadius: "10px",
            border: "0.1px solid #636363",
            maxWidth: "500px",
          }}
        >
          {formType == "name&email" ? (
            <>
              <Typography
                sx={{
                  color: "#353740",
                  fontSize: {
                    xs: "22px",
                    md: "30px",
                  },
                  fontWeight: "600",
                  textAlign: "center",
                  mb: "25px",
                }}
              >
                Update Profile
              </Typography>

              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: "15px" }}
                fullWidth
                label="name"
                size="medium"
              />

              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: "20px" }}
                fullWidth
                label="email"
                size="medium"
              />

              <Button
                onClick={updateProfile}
                fullWidth
                sx={{
                  display: "block",
                  backgroundColor: "#005555",
                  mb: "20px",
                }}
                variant="contained"
                size="large"
              >
                Submit
              </Button>

              <Typography
                onClick={() => setFormType("password")}
                sx={{
                  mr: "12px",
                  color: "#353740",
                  textDecoration: "underline",
                  fontSize: {
                    md: "17px",
                    xs: "14px",
                  },
                  textAlign: "right",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                Change Password
              </Typography>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  color: "#353740",
                  fontSize: "30px",
                  fontWeight: "600",
                  textAlign: "center",
                  mb: "25px",
                }}
              >
                Update Password
              </Typography>

              <TextField
                value={oldPassword}
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                sx={{ mb: "15px" }}
                fullWidth
                label="Old password"
                size="medium"
              />

              <TextField
                value={newPassword}
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: "20px" }}
                fullWidth
                label="New password"
                size="medium"
              />

              <Button
                onClick={updatePassword}
                fullWidth
                sx={{
                  display: "block",
                  backgroundColor: "#005555",
                  mb: "20px",
                }}
                variant="contained"
                size="large"
              >
                Submit
              </Button>

              <Typography
                onClick={() => setFormType("name&email")}
                sx={{
                  mr: "12px",
                  color: "#353740",
                  textDecoration: "underline",
                  fontSize: "17px",
                  textAlign: "right",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                Change username or email
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Profile;
