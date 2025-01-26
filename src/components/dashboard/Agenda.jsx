import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import React from "react";

const Agenda = () => {
  const [day, setDay] = React.useState("Today");
  const handleChange = (event) => {
    setDay(event.target.value);
  };
  const events = [
    {
      time: "10.15",
      title: "Event 1",
      datetime: "20/10/24 10.30 AM",
    },
    {
      time: "14.30",
      title: "Event 1",
      datetime: "20/10/24 14.45 PM",
    },
    {
      time: "16.50",
      title: "Event 1",
      datetime: "20/10/24 17.05 PM",
    },
  ];

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
        mb: 1,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Agenda
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

      {/* Event List */}
      <List disablePadding>
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                m: 2,
                border: 1,
                borderColor: "rgba(0,0,0,0.12)",
                width: "auto",
              }}
            >
              <Box sx={{ mr: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {event.time}
                </Typography>
              </Box>
              <ListItemText primary={event.title} secondary={event.datetime} />
            </ListItem>
            {index < events.length - 1}
          </React.Fragment>
        ))}
      </List>

      {/* Footer Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "gray",
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 0,
          "&:hover": {
            bgcolor: "darkgray",
          },
        }}
      >
        View Calendar
      </Button>
    </Paper>
    // <Box
    //   sx={{
    //     p: 2,
    //     border: 1,
    //     borderColor: "rgba(0,0,0,0.12)",
    //     maxWidth: "350px",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <Typography variant="h6">Agenda</Typography>
    //     <FormControl sx={{ width: "100px" }}>
    //       <Select
    //         value={day}
    //         onChange={handleChange}
    //         displayEmpty
    //         inputProps={{ "aria-label": "Without label" }}
    //       >
    //         <MenuItem value="Today">Today</MenuItem>
    //         <MenuItem value="Weekly">Weekly</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </Box>
    // </Box>
  );
};

export default Agenda;
