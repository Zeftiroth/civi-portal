import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  FormControl,
  FormLabel,
  Slider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const ClientsSearchPage = () => {
  // State Management
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [filters, setFilters] = useState({
    age: [0, 100],
    firstName: ["A", "B", "..."],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const clients = [
    {
      firstName: "James",
      lastName: "Saww",
      birthdate: "03/10/2000",
      email: "-",
      phoneNumber: "60112424455",
      age: 24,
      country: "MY",
      clientId: "012345",
    },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAgeChange = (event, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, age: newValue }));
  };

  const handleFirstNameToggle = (name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      firstName: prevFilters.firstName.includes(name)
        ? prevFilters.firstName.filter((n) => n !== name)
        : [...prevFilters.firstName, name],
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Add New Client Button */}
      <Link to="/add-client">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2, textTransform: "none", fontWeight: "bold" }}
        >
          + Add New Client
        </Button>
      </Link>

      <Box sx={{ display: "flex", gap: 2 }}>

        {/* Table Section */}
        <Box sx={{ flex: 1 }}>
         

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Birthdate</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Client ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((client, index) => (
                    <TableRow key={index}>
                      <TableCell>{client.firstName}</TableCell>
                      <TableCell>{client.lastName}</TableCell>
                      <TableCell>{client.birthdate}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phoneNumber}</TableCell>
                      <TableCell>{client.age}</TableCell>
                      <TableCell>{client.country}</TableCell>
                      <TableCell>{client.clientId}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={clients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientsSearchPage;
