import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";

const AddFamilyMember = () => {
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      firstName: "Sam",
      lastName: "Saww",
      birthDate: "25/11/1970",
      email: "-",
      phoneNumber: "-",
      age: 54,
      relationship: "Parents",
    },
    {
      id: 2,
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      age: "",
      relationship: "",
    },
    {
      id: 3,
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      age: "",
      relationship: "",
    },
  ]);

  const handleInputChange = (id, field, value) => {
    setFamilyMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        position: "absolute",
        top: "72px",
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Clients / Add Family Member
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            bgcolor: "#f5f5f5",
            mb: 3,
            borderRadius: 1,
          }}
        >
          <PersonIcon sx={{ fontSize: 50 }} />
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Birthdate</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Relationship</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyMembers.map((member) => (
                <TableRow key={member.id}>
                  {/* First Name */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={member.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          member.id,
                          "firstName",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </TableCell>

                  {/* Last Name */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={member.lastName}
                      onChange={(e) =>
                        handleInputChange(member.id, "lastName", e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>

                  {/* Birthdate */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        size="small"
                        value={member.birthDate}
                        onChange={(e) =>
                          handleInputChange(
                            member.id,
                            "birthDate",
                            e.target.value
                          )
                        }
                        fullWidth
                      />
                      <IconButton>
                        <CalendarTodayIcon />
                      </IconButton>
                    </Box>
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={member.email}
                      onChange={(e) =>
                        handleInputChange(member.id, "email", e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>

                  {/* Phone Number */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={member.phoneNumber}
                      onChange={(e) =>
                        handleInputChange(
                          member.id,
                          "phoneNumber",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </TableCell>

                  {/* Age */}
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={member.age}
                      onChange={(e) =>
                        handleInputChange(member.id, "age", e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>

                  {/* Relationship */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={member.relationship}
                      onChange={(e) =>
                        handleInputChange(
                          member.id,
                          "relationship",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ flex: 1, width: "250px", p: 3, pt: 9 }}>
        <Accordion elevation={3} sx={{ borderRadius: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Link to="/add-client">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Add New Client
              </Typography>
            </Link>
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

export default AddFamilyMember;
