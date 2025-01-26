import React from "react";
import { Box, Typography, Paper, Grid2 } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const DashSummary = () => {
  const stats = [
    {
      label: "Cases",
      value: 1,
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
      <Grid2 container spacing={2}>
        {stats.map((stat, index) => (
          <Grid2 item xs={12} sm={4} key={index}>
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
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default DashSummary;
