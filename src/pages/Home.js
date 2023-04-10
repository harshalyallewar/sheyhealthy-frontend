import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Doctor from "../components/doctor";
import Layout from "../components/layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { server_address } from "./variables/addresses";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getApprovedDocters = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`${server_address}/api/users/get-all-docters`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (response.data.success) {
        setDoctors(response.data.data);
      } else {
      }
    } catch {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getApprovedDocters();
  }, []);

  const h1Style = {
    fontSize: "28px",
    letterSpacing: "1px",
    fontWeight: "600",
    margin: "0px",
    marginBottom: "15px",
  };

  return (
    <Layout>
      <h1 style={h1Style}>Doctors Available</h1>
      <Grid container>
        {doctors.map((doctor, index) => {
          return (
            <Grid key={index} item xs={12} lg={4} sx={{ p: "20px" }}>
              <Doctor doctor={doctor} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}

export default Home;
