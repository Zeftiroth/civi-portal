import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const mockData = [
  {
    caseNumber: "001",
    contactName: "John Doe",
    createdAt: "2023-10-01",
    caseName: "Case A",
    status: "Open",
    priority: "High",
  },
  {
    caseNumber: "002",
    contactName: "Jane Smith",
    createdAt: "2023-10-02",
    caseName: "Case B",
    status: "Closed",
    priority: "Medium",
  },
  {
    caseNumber: "003",
    contactName: "Alice Johnson",
    createdAt: "2023-10-03",
    caseName: "Case C",
    status: "In Progress",
    priority: "Low",
  },
  {
    caseNumber: "004",
    contactName: "Bob Brown",
    createdAt: "2023-10-04",
    caseName: "Case D",
    status: "Open",
    priority: "High",
  },
  {
    caseNumber: "005",
    contactName: "Charlie Davis",
    createdAt: "2023-10-05",
    caseName: "Case E",
    status: "Closed",
    priority: "Medium",
  },
];

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newCase, setNewCase] = useState({
    contactName: "",
    caseName: "",
    status: "",
    priority: "",
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Generate a new case number based on the length of the existing cases
    const newCaseNumber = (mockData.length + 1).toString().padStart(3, '0');
    // Add the new case to the mock data with the current date as createdAt and generated case number
    const newCaseWithDateAndNumber = {
      ...newCase,
      caseNumber: newCaseNumber,
      createdAt: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    };
    mockData.push(newCaseWithDateAndNumber);
    // Close the modal
    handleClose();
  };

  const filteredData = mockData.filter((caseItem) =>
    caseItem.caseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box
        id="cases-top-utils-bar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New Case
        </Button>
        <TextField
          label="Search Cases"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
      </Box>
      <Box id="cases-table" sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case Number</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Case Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((caseItem) => (
              <TableRow key={caseItem.caseNumber}>
                <TableCell>{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.contactName}</TableCell>
                <TableCell>{caseItem.createdAt}</TableCell>
                <TableCell>{caseItem.caseName}</TableCell>
                <TableCell>{caseItem.status}</TableCell>
                <TableCell>{caseItem.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Case</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Contact Name"
            name="contactName"
            value={newCase.contactName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Case Name"
            name="caseName"
            value={newCase.caseName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={newCase.status}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={newCase.priority}
              onChange={handleInputChange}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cases;