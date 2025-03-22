import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

const CaseWorkerDetailsModal = ({
  open,
  handleClose,
  caseWorkerDetails,
  handleInputChange,
  fetchCaseWorkers, // Function to refresh the case workers list after update
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState([]); // List of cases for the dropdown
  const [selectedCaseId, setSelectedCaseId] = useState(""); // Selected case ID for assignment
  const [assigningCase, setAssigningCase] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCases(); // Fetch cases when the modal is opened
    }
  }, [open]);

  const fetchCases = async () => {
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases"
      ); // Replace with the correct API endpoint for fetching cases
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        caseWorkerId: caseWorkerDetails.caseWorkerId, // Include the ID in the payload
        firstName: caseWorkerDetails.firstName,
        lastName: caseWorkerDetails.lastName,
        email: caseWorkerDetails.email,
        phoneNumber: caseWorkerDetails.phoneNumber,
        jobTitle: caseWorkerDetails.jobTitle,
        departmentName: caseWorkerDetails.departmentName,
        homeAddress: caseWorkerDetails.homeAddress,
        officeAddress: caseWorkerDetails.officeAddress,
      };

      await axios.put(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/update-caseworker`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchCaseWorkers(); // Refresh the case workers list
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error updating case worker:", error);
      alert("Failed to update case worker. Please try again.");
    } finally {
      setLoading(false);
      setIsEditable(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this case worker? This action cannot be undone."
    );

    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/delete-caseworker/${caseWorkerDetails.caseWorkerId}`
      );

      fetchCaseWorkers(); // Refresh the case workers list
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting case worker:", error);
      alert("Failed to delete the case worker. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAssignCase = async () => {
    if (!selectedCaseId) {
      alert("Please select a case to assign.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/assign-caseworker/caseid/${selectedCaseId}/worker/${caseWorkerDetails.caseWorkerId}`
      );

      alert("Case successfully assigned to the case worker.");
      fetchCaseWorkers();
    } catch (error) {
      console.error("Error assigning case:", error);
      alert("Failed to assign the case. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Case Worker Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={caseWorkerDetails.firstName || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={caseWorkerDetails.lastName || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={caseWorkerDetails.email || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNumber"
          value={caseWorkerDetails.phoneNumber || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Job Title"
          name="jobTitle"
          value={caseWorkerDetails.jobTitle || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Department Name"
          name="departmentName"
          value={caseWorkerDetails.departmentName || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Home Address"
          name="homeAddress"
          value={caseWorkerDetails.homeAddress || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Office Address"
          name="officeAddress"
          value={caseWorkerDetails.officeAddress || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Assigned Cases</Typography>
          <List>
            {caseWorkerDetails.caseDetails?.map((caseItem) => (
              <React.Fragment key={caseItem.caseId}>
                <ListItem>
                  <ListItemText
                    primary={`Title: ${caseItem.caseTitle}`}
                    secondary={`Status: ${caseItem.caseStatus} | Priority: ${caseItem.priorityLevel}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
        {assigningCase && 
        
        <FormControl fullWidth margin="dense">
          <InputLabel>Select Case</InputLabel>
          <Select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            disabled={loading}
          >
            {cases.map((caseItem) => (
              <MenuItem key={caseItem.caseId} value={caseItem.caseId}>
                {caseItem.caseTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        }
      </DialogContent>
      <DialogActions>
        {isEditable ? (
          <>
            <Button
              variant="contained"
              onClick={handleSave}
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="contained"
              onClick={toggleEdit}
              color="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Divider />
            <Button
              variant="contained"
              onClick={handleDelete}
              color="error"
              disabled={loading}
            >
              Delete
            </Button>
          </>
        ) : (
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            { !assigningCase ?

            <Button
          variant="contained"
          onClick={setAssigningCase}
          color="primary"
          disabled={loading}
        >
          Assign Case
        </Button> : <Button
          variant="contained"
          onClick={handleAssignCase}
          color="primary"
          disabled={loading}
        >
          Confirm Case Assignment
        </Button>
            }
          <Button
            variant="contained"
            onClick={toggleEdit}
            color="primary"
            disabled={loading}
          >
            Edit
          </Button>
            </div>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CaseWorkerDetailsModal;