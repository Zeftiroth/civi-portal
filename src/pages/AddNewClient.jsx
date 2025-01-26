import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const AddNewClient = () => {
  const [clientData, setClientData] = useState({
    creationDate: "22 October 2024",
    status: "Active",
    clientId: "12345",
    firstName: "",
    lastName: "",
    title: "",
    maritalStatus: "",
    age: "",
    citizenship: "",
    phoneNumber: "",
    email: "",
    preferredLanguage: "",
    preferredName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
    govId: "",
    educationLevel: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setClientData((prevData) => ({ ...prevData, status: e.target.value }));
  };

  return (
    <Box sx={{ p: 3, display: "flex", gap: 2 }}>
      {/* Left Section */}
      <Box sx={{ flex: 1, maxWidth: "200px" }}>
        <Avatar
          variant="square"
          sx={{
            width: "100%",
            height: 200,
            bgcolor: "rgba(0,0,0,0.05)",
          }}
        />
      </Box>

      {/* Main Form Section */}
      <Box sx={{ flex: 2 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" gutterBottom>
            Add New Client
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Creation Date & Status */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Creation Date: {clientData.creationDate}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Status:
            </Typography>
            <RadioGroup
              row
              value={clientData.status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="Active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="Completed"
                control={<Radio />}
                label="Completed"
              />
            </RadioGroup>
          </Box>

          {/* Client ID */}
          <Typography variant="body1" sx={{ mb: 2 }}>
            Client ID: {clientData.clientId}
          </Typography>

          {/* Form Fields */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Preferred Name", name: "preferredName" },
              { label: "Last Name", name: "lastName" },
              { label: "Middle Name", name: "middleName" },
              { label: "Title", name: "title" },
              { label: "Gender", name: "gender" },
              { label: "Marital Status", name: "maritalStatus" },
              { label: "Date of Birth", name: "dateOfBirth" },
              { label: "Age", name: "age" },
              { label: "Address", name: "address" },
              { label: "Citizenship", name: "citizenship" },
              { label: "City", name: "city" },
              { label: "Phone Number", name: "phoneNumber" },
              { label: "Country", name: "country" },
              { label: "Email", name: "email" },
              { label: "Gov ID", name: "govId" },
              { label: "Preferred Language", name: "preferredLanguage" },
              { label: "Education Level", name: "educationLevel" },
            ].map((field, index) => (
              <TextField
                key={index}
                label={field.label}
                name={field.name}
                value={clientData[field.name]}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 1, maxWidth: "250px" }}>
        <Accordion elevation={3} sx={{ borderRadius: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Add New Client
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Typography variant="body2">
              Fill out the form to add a new client.
            </Typography> */}
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={3} sx={{ borderRadius: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Link to="/add-family-member">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Add Family Member
              </Typography>
            </Link>
          </AccordionSummary>
          {/* <AccordionDetails>
            <Typography variant="body2">
              Add family member details to the client profile.
            </Typography>
          </AccordionDetails> */}
        </Accordion>

        <Accordion elevation={3} sx={{ borderRadius: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Other Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Add additional details related to the client.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default AddNewClient;
