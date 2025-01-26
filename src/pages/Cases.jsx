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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <Button variant="contained" color="primary">
            Create New Case
          </Button>
        <Box>
          <TextField
            label="Search Cases"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
        </Box>
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
    </Box>
  );
};

export default Cases;