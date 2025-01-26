import React from "react";
import { Box, Grid2 } from "@mui/material";
import UserWelcomeCard from "../components/dashboard/UserWelcomeCard";
import Agenda from "../components/dashboard/Agenda";
import RecentSessions from "../components/dashboard/RecentSessions";
import KeyIncidents from "../components/dashboard/Keyincidents";
import DashSummary from "./DashSummary";
import Tasks from "../components/dashboard/Task";

const Dashboard = () => {
  return (
    <Box sx={{ p: 2, overflow: "hidden" }}>
      {/* Welcome Section */}

      <UserWelcomeCard />

      {/* Main Content */}
      <Grid2 container spacing={2} sx={{ margin: 0, width: "100%" }}>
        {/* Left Sidebar */}
        <Grid2 item xs={12} md={4}>
          <Agenda />
          <RecentSessions />
          <KeyIncidents />
        </Grid2>

        {/* Right Main Section */}
        <Grid2 item xs={12} md={8}>
          <DashSummary />
          <Tasks />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
