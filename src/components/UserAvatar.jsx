import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { getFirstLetter } from "../App"; // Import the helper function
import { useEffect, useState } from "react";

const UserAvatar = () => {
    const [email, setEmail] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setEmail(user.email)
      }
    }, []);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ width: 30, height: 30, mr: 1 }}>
        {getFirstLetter(email)}
      </Avatar>
      <Typography variant="body1">{email}</Typography>
    </Box>
  );
};

export default UserAvatar;