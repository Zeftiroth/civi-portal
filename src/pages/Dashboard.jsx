import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  ArrowBackIosNew as CollapseIcon,
  ArrowForwardIos as ExpandIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Sidebar navigation items
  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "primary.main",
        }}
      >
        <Toolbar>
          {/* Left Side: App Title */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          {/* Right Side: Avatar and Settings */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 30, height: 30, mr: 1 }}>JD</Avatar>
              <Typography variant="body1">John Doe</Typography>
            </Box>

            {/* Settings Button */}
            <IconButton style={{ outline: "none" }} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? drawerWidth : 72,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : 72,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <List>
            {navItems.map((item, index) => (
              <ListItem button component={Link} to={item.path} key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Toggle Drawer Button at the Bottom */}
        <List>
          <ListItem
            sx={{
              position: "fixed",
              bottom: "0px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            button
          >
            <ListItemIcon>
              <IconButton
                style={{ outline: "none" }}
                color="inherit"
                onClick={toggleDrawer}
              >
                {isDrawerOpen ? <CollapseIcon /> : <ExpandIcon />}
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: isDrawerOpen ? `${drawerWidth}px` : "72px",
          transition: "margin-left 0.3s",
        }}
      >
        <Typography variant="h4">Welcome to the Dashboard!</Typography>
        <Typography>
          This is the main content area. Add your dynamic content here.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
