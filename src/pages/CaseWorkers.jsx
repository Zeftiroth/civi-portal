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
import CreateCaseWorkerModal from "../components/CreateCaseWorkerModal";
import CaseWorkerDetailsModal from "../components/CaseWorkerDetailsModal";

const CaseWorkers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caseWorkers, setCaseWorkers] = useState([]);
  const [newCaseWorker, setNewCaseWorker] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    departmentName: "",
    homeAddress: "",
    officeAddress: "",
    qualification: [],
  });
  const [selectedCaseWorker, setSelectedCaseWorker] = useState(null);

  useEffect(() => {
    fetchCaseWorkers();
  }, []);

  const fetchCaseWorkers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/get-caseworkers"
      );
      setCaseWorkers(response.data);
    } catch (error) {
      console.error("Error fetching case workers:", error);
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

  const handleOpenDetails = (caseWorker) => {
    setSelectedCaseWorker(caseWorker);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedCaseWorker(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCaseWorker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSelectedCaseWorker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitCreate = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/create-caseworker",
        newCaseWorker,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchCaseWorkers();
      handleCloseCreate();
    } catch (error) {
      console.error("Error creating case worker:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDetails = async () => {
    setLoading(true);
    try {
        const payload = {
            caseWorkerId: selectedCaseWorker.caseWorkerId, // Include the ID in the payload
            firstName: selectedCaseWorker.firstName,
            lastName: selectedCaseWorker.lastName,
            email: selectedCaseWorker.email,
            phoneNumber: selectedCaseWorker.phoneNumber,
            jobTitle: selectedCaseWorker.jobTitle,
            departmentName: selectedCaseWorker.departmentName,
            homeAddress: selectedCaseWorker.homeAddress,
            officeAddress: selectedCaseWorker.officeAddress,
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
      fetchCaseWorkers();
      handleCloseDetails();
    } catch (error) {
      console.error("Error updating case worker:", error);
    } finally {
      setLoading(false);
    }
  };

  const tableColumns = [
    { title: "ID", field: "caseWorkerId", width: "10%" },
    { title: "First Name", field: "firstName", width: "15%" },
    { title: "Last Name", field: "lastName", width: "15%" },
    { title: "Email", field: "email", width: "20%" },
    { title: "Phone", field: "phoneNumber", width: "15%" },
    { title: "Job Title", field: "jobTitle", width: "15%" },
  ];

  return (
    <Box>
      <Box
        id="caseworkers-top-utils-bar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          New Case Worker
        </Button>
        <TextField
          label="Search Case Workers"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
      </Box>
      <Box id="caseworkers-table" sx={{ p: 2 }}>
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
            {caseWorkers
              .filter((worker) =>
                Object.values(worker)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((worker) => (
                <TableRow
                  key={worker.caseWorkerId}
                  onClick={() => handleOpenDetails(worker)}
                >
                  {tableColumns.map((column) => (
                    <TableCell key={column.field} sx={{ width: column.width }}>
                      {worker[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <CreateCaseWorkerModal
        open={openCreate}
        handleClose={handleCloseCreate}
        newCaseWorker={newCaseWorker}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitCreate}
      />
      {selectedCaseWorker && (
        <CaseWorkerDetailsModal
          open={openDetails}
          handleClose={handleCloseDetails}
          caseWorkerDetails={selectedCaseWorker}
          handleInputChange={handleInputChange}
          fetchCaseWorkers={fetchCaseWorkers}
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

export default CaseWorkers;