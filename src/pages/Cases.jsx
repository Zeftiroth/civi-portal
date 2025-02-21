import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import axios from "axios";

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({
    // contactName: "",
    caseTitle: "",
    caseDescription: "",
    // status: "",
    priorityLevel: "",
    caseCategory: "",
    riskLevel: "",
    legalInvolvement: "",
    referralSource: "",
    // attachment: null,
  });
  const [attachmentName, setAttachmentName] = useState("");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases"
      );
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewCase((prevState) => ({
      ...prevState,
      attachment: file,
    }));
    // setAttachmentName(file.name);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const caseData = { ...newCase };
    // if (caseData.attachment) {
    //   const formData = new FormData();
    //   formData.append("file", caseData.attachment);
    //   try {
    //     const uploadResponse = await axios.post(
    //       "https://cmsservice-9e12a2790a1c.herokuapp.com/api/upload",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     caseData.attachment = uploadResponse.data.fileUrl;
    //   } catch (error) {
    //     console.error("Error uploading file:", error);
    //     setLoading(false);
    //     return;
    //   }
    // }

    try {
      await axios.post(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases/create",
        caseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchCases();
      handleClose();
    } catch (error) {
      console.error("Error creating case:", error);
    } finally {
      setLoading(false);
    }
  };

  // const filteredData = mockData.filter((caseItem) =>
  //   caseItem.caseName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
              <TableCell>Case Category</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell>Legal Involvement</TableCell>
              <TableCell>Referral Source</TableCell>
              <TableCell>Attachment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.caseNumber}>
                <TableCell>{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.contactName}</TableCell>
                <TableCell>{caseItem.createdAt}</TableCell>
                <TableCell>{caseItem.caseName}</TableCell>
                <TableCell>{caseItem.status}</TableCell>
                <TableCell>{caseItem.priority}</TableCell>
                <TableCell>{caseItem.caseCategory}</TableCell>
                <TableCell>{caseItem.riskLevel}</TableCell>
                <TableCell>{caseItem.legalInvolvement}</TableCell>
                <TableCell>{caseItem.referralSource}</TableCell>
                <TableCell>
                  {caseItem.attachment ? (
                    <a
                      href={caseItem.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No Attachment"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Case</DialogTitle>
        <DialogContent>
          {/* <TextField
            margin="dense"
            label="Contact Name"
            name="contactName"
            value={newCase.contactName}
            onChange={handleInputChange}
            fullWidth
          /> */}
          <TextField
            margin="dense"
            label="Case Title"
            name="caseTitle"
            value={newCase.caseTitle}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Case Description"
            name="caseDescription"
            value={newCase.caseDescription}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priorityLevel"
              value={newCase.priorityLevel}
              onChange={handleInputChange}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Case Category</InputLabel>
            <Select
              name="caseCategory"
              value={newCase.caseCategory}
              onChange={handleInputChange}
            >
              <MenuItem value="Category 1">Category 1</MenuItem>
              <MenuItem value="Category 2">Category 2</MenuItem>
              <MenuItem value="Category 3">Category 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Risk Level</InputLabel>
            <Select
              name="riskLevel"
              value={newCase.riskLevel}
              onChange={handleInputChange}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Legal Involvement"
            name="legalInvolvement"
            value={newCase.legalInvolvement}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Referral Source"
            name="referralSource"
            value={newCase.referralSource}
            onChange={handleInputChange}
            fullWidth
          />
          {/* <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Attachment
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {attachmentName && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Attached file: {attachmentName}
            </Typography>
          )} */}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Cases;
