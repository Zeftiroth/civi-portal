import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const RecentSessions = () => {
  const sessions = [
    {
      caseId: "Consultation Client",
      date: "20/10/2024",
      notes: "Notes",
    },
  ];
  const [day, setDay] = React.useState("Today");
  const handleChange = (event) => {
    setDay(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        boxShadow: "none",
        border: "1px",
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,0.12)",
        borderRadius: "0px",
        overflow: "hidden",
        mb: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Recent Sessions
        </Typography>
        <FormControl>
          <Select
            value={day}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            autoWidth={true}
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Session List */}
      <List disablePadding>
        {sessions.map((session, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#f5f5f5",
                px: 2,
                py: 1.5,
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  Case ID: {session.caseId}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", mt: 0.5 }}>
                  {session.notes}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "black", mb: 1 }}
                >
                  {session.date}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderColor: "gray",
                    color: "black",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  See More
                </Button>
              </Box>
            </ListItem>
            {index < sessions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RecentSessions;
