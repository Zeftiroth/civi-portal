import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

const UserWelcomeCard = () => {
  const [name, setName] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Extract the email address from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      const username = user.email.split("@")[0];
      setName(username);
    }
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);
  

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
          {currentDate}
        </Typography>
        <Typography variant="body1">Welcome, {name}!</Typography>
      </Box>
    </Paper>
  );
};

export default UserWelcomeCard;
