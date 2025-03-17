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
} from "@mui/material";

const CaseDetailsModal = ({
  open,
  handleClose,
  caseDetails,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  attachmentName,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = () => {
    handleSubmit();
    setIsEditable(false);
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
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
          disabled={!isEditable}
        >
          Upload Attachment
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