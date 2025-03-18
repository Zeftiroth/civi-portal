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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux"; // Assuming you're using Redux
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const CreateAppointmentModal = ({
  open,
  handleClose,
  newAppointment,
  handleInputChange,
  fetchAppointments, // Function to refresh the appointments list after creation
}) => {
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState(null); // Local state for the date picker

  // Get the user's email from the Redux store
  const userEmail = useSelector((state) => state.user.email); // Adjust this based on your store structure

  useEffect(() => {
    if (userEmail && newAppointment.bookedBy !== userEmail) {
      handleInputChange({ target: { name: "bookedBy", value: userEmail } });
    }
  }, [userEmail, newAppointment.bookedBy, handleInputChange]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        appointmentId: 0, // Default value for new appointments
        appointmentDateTime: `${localDate.toISOString().split("T")[0]}T${newAppointment.time}`, // Combine date and time
        status: newAppointment.status,
        location: newAppointment.location,
        notes: newAppointment.notes,
        bookedBy: newAppointment.bookedBy,
        clientMobileNumber: newAppointment.clientMobileNumber,
      };

      await axios.post(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/appointments/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchAppointments(); // Refresh the appointments list
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Appointment</DialogTitle>
      <DialogContent>
        <div style={{ marginTop: "1em", marginBottom: "3px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={localDate}
              onChange={(newValue) => setLocalDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} margin="dense" fullWidth />
              )}
            />
          </LocalizationProvider>
        </div>
        <TextField
          margin="dense"
          label="Time"
          name="time"
          type="time"
          value={newAppointment.time}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={newAppointment.location}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Notes"
          name="notes"
          value={newAppointment.notes}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          margin="dense"
          label="Client Mobile Number"
          name="clientMobileNumber"
          value={newAppointment.clientMobileNumber}
          onChange={handleInputChange}
          fullWidth
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newAppointment.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
      <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          color="secondary"
          disabled={loading}
        >
          Cancel
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default CreateAppointmentModal;