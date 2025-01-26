import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const KeyIncidents = () => {
  const incidents = [
    {
      client: "Client",
      caseId: "Case ID",
      notes: "Notes",
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
          Key Incidents
        </Typography>
        <IconButton size="small">
          <InfoOutlinedIcon />
        </IconButton>
      </Box>

      {/* Incident Card */}
      <List disablePadding>
        {incidents.map((incident, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                {incident.client}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mt: 0.5 }}>
                {incident.notes}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              {incident.caseId}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default KeyIncidents;
