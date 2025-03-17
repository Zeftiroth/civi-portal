import React, { useState } from "react";
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
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import axios from "axios";

const CreateCaseModal = ({
  open,
  handleClose,
  newCase,
  handleInputChange,
  handleSubmit,
}) => {
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAttachments = async (caseId) => {
    if (attachments.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      attachments.forEach((file) => {
        formData.append("file", file); // Update the field name based on Swagger documentation
      });

      // Log the FormData object for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/api/case/uploadfile/${caseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading attachments:", error.response?.data || error);
      alert("Failed to upload attachments. Please check the file format or size.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await handleSubmit(); // Call the parent-provided submit function
      const caseId = response?.data?.caseId; // Safely access caseId from the response

      if (!caseId) {
        throw new Error("Case ID not returned from the API");
      }

      await uploadAttachments(caseId); // Upload attachments after creation
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error creating case:", error.response?.data || error);
      alert("Failed to create case or upload attachments. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Case</DialogTitle>
      <DialogContent>
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
          multiline
          rows={5}
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

        {/* File Upload Section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Attachments</Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
            sx={{ mt: 1 }}
          >
            Upload Files
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </Button>
          <List>
            {attachments.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCaseModal;