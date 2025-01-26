import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Grid2,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//TODO: data structure has to change and so does the rendering of the task
const initialTasksData = {
  overdue: [
    {
      id: 1,
      label: "Overdue Task 1",
      description: "Description for task 1",
      checked: false,
    },
    {
      id: 2,
      label: "Overdue Task 2",
      description: "Description for task 2",
      checked: false,
    },
    {
      id: 3,
      label: "Overdue Task 3",
      description: "Description for task 3",
      checked: false,
    },
  ],
  dueToday: [
    {
      id: 4,
      label: "Today's Task 1",
      description: "Description for task 1",
      checked: false,
    },
    {
      id: 5,
      label: "Today's Task 2",
      description: "Description for task 2",
      checked: false,
    },
    {
      id: 6,
      label: "Today's Task 3",
      description: "Description for task 3",
      checked: false,
    },
  ],
  dueTomorrow: [
    {
      id: 7,
      label: "Tomorrow's Task 1",
      description: "Description for task 1",
      checked: false,
    },
    {
      id: 8,
      label: "Tomorrow's Task 2",
      description: "Description for task 2",
      checked: false,
    },
    {
      id: 9,
      label: "Tomorrow's Task 3",
      description: "Description for task 3",
      checked: false,
    },
  ],
};

const Tasks = () => {
  const [tasksData, setTasksData] = useState(initialTasksData);

  // Handle checkbox toggle
  const handleCheckboxToggle = (section, taskId) => {
    setTasksData((prevState) => ({
      ...prevState,
      [section]: prevState[section].map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      ),
    }));
  };

  const renderTask = (task, section) => (
    <Box
      key={task.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "4px",
        mb: 1,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={task.checked}
            onChange={() => handleCheckboxToggle(section, task.id)}
            sx={{
              color: "black",
              "&.Mui-checked": { color: "black" },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontWeight: "bold",
              color: "black",
              mb: 0.5,
              fontSize: "14px",
            }}
          >
            {task.label}
          </Typography>
        }
      />
      <Typography variant="body2" sx={{ color: "gray" }}>
        {task.description}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        boxShadow: "none",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Tasks
        </Typography>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>

      {/* Tasks Sections */}
      <Grid2 container spacing={2}>
        {/* Overdue */}
        <Grid2 item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <FormControl size="small" fullWidth>
              <Select
                defaultValue="Overdue"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                <MenuItem value="Overdue">Overdue</MenuItem>
                <MenuItem value="Due Today">Due Today</MenuItem>
                <MenuItem value="Due Tomorrow">Due Tomorrow</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {tasksData.overdue.map((task) => renderTask(task, "overdue"))}
        </Grid2>

        {/* Due Today */}
        <Grid2 item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <FormControl size="small" fullWidth>
              <Select
                defaultValue="Due Today"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                <MenuItem value="Overdue">Overdue</MenuItem>
                <MenuItem value="Due Today">Due Today</MenuItem>
                <MenuItem value="Due Tomorrow">Due Tomorrow</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {tasksData.dueToday.map((task) => renderTask(task, "dueToday"))}
        </Grid2>

        {/* Due Tomorrow */}
        <Grid2 item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <FormControl size="small" fullWidth>
              <Select
                defaultValue="Due Tomorrow"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                <MenuItem value="Overdue">Overdue</MenuItem>
                <MenuItem value="Due Today">Due Today</MenuItem>
                <MenuItem value="Due Tomorrow">Due Tomorrow</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {tasksData.dueTomorrow.map((task) => renderTask(task, "dueTomorrow"))}
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default Tasks;
