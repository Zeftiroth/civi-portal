import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const CaseWorkerDetailsModal = ({
  open,
  handleClose,
  caseWorkerDetails,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Case Worker</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={caseWorkerDetails.firstName || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={caseWorkerDetails.lastName || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={caseWorkerDetails.email || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNumber"
          value={caseWorkerDetails.phoneNumber || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Job Title"
          name="jobTitle"
          value={caseWorkerDetails.jobTitle || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Department Name"
          name="departmentName"
          value={caseWorkerDetails.departmentName || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Home Address"
          name="homeAddress"
          value={caseWorkerDetails.homeAddress || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Office Address"
          name="officeAddress"
          value={caseWorkerDetails.officeAddress || ""}
          onChange={handleInputChange}
          fullWidth
        />
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
  );
};

export default CaseWorkerDetailsModal;