import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import axios from "axios";

const DashSummary = () => {
  const [cases, setCases] = useState(0);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases"
      );
      setCases(response.data.length);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const stats = [
    {
      label: "Cases",
      value: cases,
      description: "Total Cases",
      icon: <AssignmentOutlinedIcon fontSize="large" />,
    },
    {
      label: "Clients",
      value: 1,
      description: "Total Clients",
      icon: <PersonOutlinedIcon fontSize="large" />,
    },
    {
      label: "Providers",
      value: 1,
      description: "Total Providers",
      icon: <ArchiveOutlinedIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {stat.label}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", mt: 0.5 }}>
                  {stat.description}
                </Typography>
              </Box>
              {stat.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashSummary;