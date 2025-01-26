import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

const UserWelcomeCard = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        width: "100%",
        boxShadow: "none",
        border: "1px",
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,0.12)",
        borderRadius: "0px",
        my: 2,
      }}
    >
      {/* Avatar */}
      <Avatar
        alt="User Avatar"
        src="https://via.placeholder.com/150" // Replace with the actual image URL
        sx={{
          width: 80,
          height: 80,
          bgcolor: "lightgreen", // Placeholder for image background color
        }}
      />

      {/* Text Section */}
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          17 October 2024
        </Typography>
        <Typography variant="body1">Welcome, Rose!</Typography>
      </Box>
    </Paper>
  );
};

export default UserWelcomeCard;
