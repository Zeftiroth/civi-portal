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

const CaseDetailsModal = ({
  open,
  handleClose,
  caseDetails,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  attachmentName
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [caseworkers, setCaseworkers] = useState([]); // List of caseworkers for the dropdown
  const [selectedWorkerId, setSelectedWorkerId] = useState(""); // Selected caseworker ID for assignment
  const [assigningWorker, setAssigningWorker] = useState(false); // Toggle for Assign Caseworker dropdown
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave =  () => {
     handleSubmit();
     handleAssignWorker()
    setIsEditable(false);
  };

  useEffect(() => {
    if (open) {
      fetchCaseworkers(); // Fetch caseworkers when the modal is opened
    }
  }, [open]);

  const fetchCaseworkers = async () => {
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/get-caseworkers"
      );
      setCaseworkers(response.data);
    } catch (error) {
      console.error("Error fetching caseworkers:", error);
    }
  };


  const handleAssignWorker = async () => {
    if (!selectedWorkerId) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/assign-caseworker/caseid/${caseDetails.caseId}/worker/${selectedWorkerId}`
      );

      alert("Caseworker successfully assigned to the case.");
      setAssigningWorker(false); // Close the dropdown
    } catch (error) {
      console.error("Error assigning caseworker:", error);
      alert("Failed to assign the caseworker. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Case Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Case Title"
          name="caseTitle"
          value={caseDetails.caseTitle}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Case Description"
          name="caseDescription"
          value={caseDetails.caseDescription}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
          multiline
          rows={5}
        />
        <FormControl fullWidth margin="dense" disabled={!isEditable}>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priorityLevel"
            value={caseDetails.priorityLevel}
            onChange={handleInputChange}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" disabled={!isEditable}>
          <InputLabel>Case Category</InputLabel>
          <Select
            name="caseCategory"
            value={caseDetails.caseCategory}
            onChange={handleInputChange}
          >
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
            <MenuItem value="Category 3">Category 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" disabled={!isEditable}>
          <InputLabel>Risk Level</InputLabel>
          <Select
            name="riskLevel"
            value={caseDetails.riskLevel}
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
          value={caseDetails.legalInvolvement}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Referral Source"
          name="referralSource"
          value={caseDetails.referralSource}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Assigned Caseworkers</Typography>
          <Button
            variant="contained"
            onClick={() => setAssigningWorker(!assigningWorker)}
            color="primary"
            sx={{ mr: 1 }}
            disabled={!isEditable}
          >
            {assigningWorker ? "Cancel" : "Assign Caseworker"}
          </Button>
          {/* {assigningWorker && (
            <Button
              variant="contained"
              onClick={handleAssignWorker}
              color="primary"
              sx={{ mr: 1 }}
            >
              Confirm Assignment
            </Button>
          )} */}
          <List>
            {caseDetails.assignedCaseWorkers?.map((worker) => (
              <React.Fragment key={worker.caseWorkerId}>
                <ListItem>
                  <ListItemText
                    primary={`Name: ${worker.firstName} ${worker.lastName}`}
                    secondary={`Email: ${worker.email} | Phone: ${worker.phoneNumber}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          {assigningWorker && (
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Select Caseworker </InputLabel>

                <Select
                  value={selectedWorkerId}
                  onChange={(e) => setSelectedWorkerId(e.target.value)}
                >
                  {caseworkers.map((worker) => (
                    <MenuItem
                      key={worker.caseWorkerId}
                      value={worker.caseWorkerId}
                    >
                      {worker.firstName} {worker.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
          disabled={!isEditable}
        >
          Attach File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {attachmentName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Attached file: {attachmentName}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {isEditable ? (
          <>
            <Button variant="contained" onClick={handleSave} color="primary">
              Save
            </Button>
            <Button variant="contained" onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={toggleEdit} color="primary">
            Edit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CaseDetailsModal;
