import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const CreateCaseWorkerModal = ({
  open,
  handleClose,
  newCaseWorker,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Case Worker</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={newCaseWorker.firstName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={newCaseWorker.lastName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={newCaseWorker.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNumber"
          value={newCaseWorker.phoneNumber}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Job Title"
          name="jobTitle"
          value={newCaseWorker.jobTitle}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Department Name"
          name="departmentName"
          value={newCaseWorker.departmentName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Home Address"
          name="homeAddress"
          value={newCaseWorker.homeAddress}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Office Address"
          name="officeAddress"
          value={newCaseWorker.officeAddress}
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

export default CreateCaseWorkerModal;