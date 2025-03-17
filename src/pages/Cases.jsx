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
import CreateCaseModal from "../components/CreateCaseModal";
import CaseDetailsModal from "../components/CaseDetailsModal";

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({
    caseTitle: "",
    caseDescription: "",
    caseStatus: "OPEN",
    priorityLevel: "",
    caseCategory: "",
    riskLevel: "",
    legalInvolvement: "",
    referralSource: "",
  });
  const [selectedCase, setSelectedCase] = useState(null);
  const [attachmentName, setAttachmentName] = useState("");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await axios.get(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases"
      );
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
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

  const handleOpenDetails = (caseItem) => {
    setSelectedCase(caseItem);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedCase(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSelectedCase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedCase((prevState) => ({
      ...prevState,
      attachment: file,
    }));
    setAttachmentName(file.name);
  };

  const handleSubmitCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases/create",
        newCase,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchCases(); // Refresh the cases list
      return response; // Return the API response
    } catch (error) {
      console.error("Error creating case:", error);
      throw error; // Re-throw the error to be handled in the modal
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDetails = async () => {
    setLoading(true);

    const caseData = { ...selectedCase };

    try {
      await axios.put(
        `https://cmsservice-9e12a2790a1c.herokuapp.com/api/cases/${caseData.caseId}`,
        caseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchCases();
      handleCloseDetails();
    } catch (error) {
      console.error("Error updating case:", error);
    } finally {
      setLoading(false);
    }
  };

  const tableColumns = [
    { title: "Case Id", field: "caseId", width: "10%" },
    { title: "Case Title", field: "caseTitle", width: "30%" },
    { title: "Status", field: "caseStatus", width: "15%" },
    { title: "Priority", field: "priorityLevel", width: "15%" },
    { title: "Category", field: "caseCategory", width: "15%" },
    { title: "Risk", field: "riskLevel", width: "15%" },
  ];

  return (
    <Box>
      <Box
        id="cases-top-utils-bar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          New Case
        </Button>
        <TextField
          label="Search Cases"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
      </Box>
      <Box id="cases-table" sx={{ p: 2 }}>
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
          <TableBody className="cases-table-body">
            {cases.map((caseItem) => (
              <TableRow key={caseItem.caseNumber} onClick={() => handleOpenDetails(caseItem)}>
                {tableColumns.map((column) => (
                  <TableCell key={column.field} sx={{ width: column.width }}>
                    {column.field === "attachment" ? (
                      caseItem[column.field] ? (
                        <a
                          href={caseItem[column.field]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        "No Attachment"
                      )
                    ) : (
                      caseItem[column.field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <CreateCaseModal
        open={openCreate}
        handleClose={handleCloseCreate}
        newCase={newCase}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitCreate}
      />
      {selectedCase && (
        <CaseDetailsModal
          open={openDetails}
          handleClose={handleCloseDetails}
          caseDetails={selectedCase}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmitDetails}
          attachmentName={attachmentName}
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

export default Cases;