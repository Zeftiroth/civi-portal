import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const ContactSubNav = () => {
  const navItems = [
    { label: "Personal Information", path: "/contacts-personal-info" },
    { label: "Cases", path: "/cases" },
    { label: "Other Info", path: "/other-info" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        boxShadow: 1,
      }}
    >
      <List>
        {navItems.map((item, index) => (
          <ListItem button component={Link} to={item.path} key={index}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactSubNav;