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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import axios from "axios";
import CreateAppointmentModal from "../components/CreateAppointmentModal";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";

// Utility function to format date and time
const formatDateTime = (isoDateTime) => {
  if (!isoDateTime) return ""; // Handle empty or invalid values
  const date = new Date(isoDateTime);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options); // Format as MM/DD/YYYY HH:mm AM/PM
};

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    status: "Scheduled",
    location: "",
    notes: "",
    bookedBy: "",
    clientMobileNumber: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/appointments/get"
      );
      setAppointments(response.data); // Assuming the API returns an array of appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenDetails = (appointmentItem) => {
    setSelectedAppointment(appointmentItem);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedAppointment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSelectedAppointment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const tableColumns = [
    { title: "Appointment ID", field: "appointmentId", width: "10%" },
    { title: "Date & Time", field: "appointmentDateTime", width: "25%" },
    { title: "Status", field: "status", width: "15%" },
    { title: "Location", field: "location", width: "20%" },
    { title: "Booked By", field: "bookedBy", width: "15%" },
    { title: "Client Mobile", field: "clientMobileNumber", width: "15%" },
  ];

  return (
    <Box>
      <Box
        id="appointments-top-utils-bar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          New Appointment
        </Button>
        <TextField
          label="Search Appointments"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
      </Box>
      <Box id="appointments-table" sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell key={column.field} sx={{ width: column.width }}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments
              .filter((appointment) =>
                Object.values(appointment)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((appointment) => (
                <TableRow
                  key={appointment.appointmentId}
                  onClick={() => handleOpenDetails(appointment)}
                >
                  {tableColumns.map((column) => (
                    <TableCell key={column.field} sx={{ width: column.width }}>
                      {column.field === "appointmentDateTime"
                        ? formatDateTime(appointment[column.field]) // Format Date & Time
                        : appointment[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <CreateAppointmentModal
        open={openCreate}
        handleClose={handleCloseCreate}
        newAppointment={newAppointment}
        handleInputChange={handleInputChange}
        fetchAppointments={fetchAppointments}
      />
      {selectedAppointment && (
        <AppointmentDetailsModal
          open={openDetails}
          handleClose={handleCloseDetails}
          appointmentDetails={selectedAppointment}
          handleInputChange={handleInputChange}
          fetchAppointments={fetchAppointments}
        />
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Appointments;