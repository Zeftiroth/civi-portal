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
} from "@mui/material";
import axios from "axios";

const AppointmentDetailsModal = ({
  open,
  handleClose,
  appointmentDetails,
  handleInputChange,
  fetchAppointments, // Function to refresh the appointments list after update
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState("");
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (appointmentDetails?.appointmentDateTime) {
      const [date, time] = appointmentDetails.appointmentDateTime.split("T");
      setLocalDate(date);
      setLocalTime(time.slice(0, 5)); // Extract HH:mm
    }
  }, [appointmentDetails]);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        appointmentId: appointmentDetails.appointmentId,
        appointmentDateTime: `${localDate}T${localTime}`,
        status: appointmentDetails.status,
        location: appointmentDetails.location,
        notes: appointmentDetails.notes,
        bookedBy: appointmentDetails.bookedBy,
        clientMobileNumber: appointmentDetails.clientMobileNumber,
      };

      await axios.put(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/api/appointments/update/${appointmentDetails.appointmentId}`,
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
      console.error("Error updating appointment:", error);
    } finally {
      setLoading(false);
      setIsEditable(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Appointment Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Date"
          name="date"
          type="date"
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
          fullWidth
          disabled={!isEditable}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Time"
          name="time"
          type="time"
          value={localTime}
          onChange={(e) => setLocalTime(e.target.value)}
          fullWidth
          disabled={!isEditable}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={appointmentDetails.location || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Notes"
          name="notes"
          value={appointmentDetails.notes || ""}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Booked By"
          name="bookedBy"
          value={appointmentDetails.bookedBy || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <TextField
          margin="dense"
          label="Client Mobile Number"
          name="clientMobileNumber"
          value={appointmentDetails.clientMobileNumber || ""}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditable}
        />
        <FormControl fullWidth margin="dense" disabled={!isEditable}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={appointmentDetails.status || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
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
              onClick={handleClose}
              color="secondary"
              disabled={loading}
            >
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

export default AppointmentDetailsModal;
