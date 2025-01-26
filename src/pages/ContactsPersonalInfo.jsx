import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ContactSubNav from "../components/ContactSubNav";
import PersonIcon from "@mui/icons-material/Person";

const ContactsPersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    creationDate: "20 October 2024",
    status: "Active",
    clientId: "12345",
    firstName: "James",
    lastName: "Saww",
    preferredName: "James",
    middleName: "NA",
    title: "Mr",
    maritalStatus: "Single",
    age: 24,
    citizenship: "Malaysia",
    phoneNumber: "60112424455",
    email: "-",
    preferredLanguage: "English",
    gender: "Male",
    dob: "2000-10-03",
    address: "Jln.Ampang",
    city: "Kuala Lumpur",
    country: "Malaysia",
    govId: "-",
    educationLevel: "Bachelor Degree",
  });

  const labels = [
    { label: "Client ID", key: "clientId" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Preferred Name", key: "preferredName" },
    { label: "Middle Name", key: "middleName" },
    { label: "Title", key: "title" },
    { label: "Marital Status", key: "maritalStatus" },
    { label: "Age", key: "age" },
    { label: "Citizenship", key: "citizenship" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Email", key: "email" },
    { label: "Preferred Language", key: "preferredLanguage" },
    { label: "Gender", key: "gender" },
    { label: "Date of Birth", key: "dob" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Country", key: "country" },
    { label: "Gov ID", key: "govId" },
    { label: "Education Level", key: "educationLevel" },
  ];

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    alert("Delete action triggered!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: "80%"}}>
      <Box
          sx={{
            width: "100%",
            marginBottom: "2em",
            background: 'lightgrey',
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em",
          }}
        >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

          <PersonIcon />
          <Typography variant="h6">
            {formData.firstName} {formData.lastName}
          </Typography>
        </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditToggle}
              sx={{ mr: 1 }}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Box id="image-personal-info-wrapper" sx={{ display: "flex", flexDirection: "row", p:1, m:1 }}>
          <Box sx={{ width: "20%", minWidth: 160 }}>
            <Avatar
              alt="Placeholder Image"
              src="https://via.placeholder.com/150"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box sx={{ width: "80%" }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {labels.map((item) => (
                  <Box
                    key={item.key}
                    sx={{
                      flex: "1 1 calc(50% - 16px)",
                      "@media (max-width: 600px)": {
                        flex: "1 1 100%",
                      },
                    }}
                  >
                    {isEditing ? (
                      <TextField
                        fullWidth
                        label={item.label}
                        name={item.key}
                        value={formData[item.key]}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Box>
                        <Typography variant="subtitle2">{item.label}</Typography>
                        <Typography variant="body1">{formData[item.key]}</Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
              
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "20%",
          position: "sticky",
          top: 120,
          alignSelf: "flex-start",
        }}
      >
        <ContactSubNav />
      </Box>
    </Box>
  );
};

export default ContactsPersonalInfo;