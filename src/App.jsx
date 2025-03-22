import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClientsSearchPage from "./pages/ClientsSearchPage";
import AddNewClient from "./pages/AddNewClient";
import AddFamilyMember from "./pages/AddFamilyMember";
import ContactsPersonalInfo from "./pages/ContactsPersonalInfo";
import ContactsClientNotes from "./pages/ContactsClientNotes";
import ContactsCasePlan from "./pages/ContactsCasePlan";
import ContactsAssessments from "./pages/ContactsAssessments";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import ProgramEngagements from "./pages/ProgramEngagements";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Contacts as ContactsIcon,
  Logout as LogoutIcon,
  Folder as FolderIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./store/userSlice";
import Appointments from "./pages/Appointments";
import CaseWorkers from "./pages/CaseWorkers";
import UserAvatar from "./components/UserAvatar"; // Import the new component

const theme = createTheme({
  palette: {
    primary: {
      main: "#C1E1C1", // Customize primary color
    },
    secondary: {
      main: "#ffffb7", // Customize secondary color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Customize font
  },
});

const drawerWidth = 240;
const pathMap = {
  "/": "Home",
  "/clients-search": "Clients",
  "/add-client": "Add Client",
  "/add-family-member": "Add Family Member",
  "/contacts-personal-info": "Contacts",
  "/cases": "Cases",
  "/case-workers": "Case Workers",
  "/appointments": "Appointments",
  // Add more mappings as needed
};

const getPathName = (pathname) => {
  return pathMap[pathname] || pathname;
};

export const getFirstLetter = (username) => {
  return username ? username.charAt(0).toUpperCase() : "";
};

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const isSignUpOrLoginPage =
    location.pathname === "/sign-up" || location.pathname === "/login";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, storedUser, isLoggedIn]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    // { label: "Clients", icon: <PersonIcon />, path: "/clients-search" },
    // {
    //   label: "Contacts",
    //   icon: <ContactsIcon />,
    //   path: "/contacts-personal-info",
    // },
    {
      label: "Cases",
      icon: <FolderIcon />,
      path: "cases",
    },
    {
      label: "Case Workers",
      icon: <ContactsIcon />,
      path: "case-workers",
    },
    {
      label: "Appointments",
      icon: <CalendarMonthIcon />,
      path: "appointments",
    },
  ];

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      {!isSignUpOrLoginPage && (
        <>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer - 1,
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              border: "1px",
              borderStyle: "solid",
              borderColor: "rgba(0,0,0,0.12)",
              borderRadius: "0px",
            }}
            className="no-box-shadow"
          >
            <Toolbar>
              {/* <ListItemIcon
                sx={{
                  marginLeft: isDrawerOpen ? `${drawerWidth}px` : "62px",
                }}
              >
                <IconButton
                  style={{ outline: "none" }}
                  color="inherit"
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </ListItemIcon> */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  marginLeft: isDrawerOpen
                    ? `calc(${drawerWidth}px - 17px)`
                    : "55px",
                }}
              >
              <div style={{display: "flex", alignItems: "center"}}>

              <img
                src="/civilogo.png" // Path to the logo in the public directory
                alt="Civi Logo"
                style={{ height: "35px", width: "40px" }} // Adjust the size as needed
              />
              <span style={{ marginLeft: "10px" }}>
                CIVI

              </span>
              </div>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <UserAvatar />
                {/* <IconButton style={{ outline: "none" }} color="inherit">
                  <SettingsIcon />
                </IconButton> */}
                <IconButton
                  style={{ outline: "none" }}
                  color="inherit"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer,
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              border: "1px",
              borderStyle: "solid",
              borderColor: "rgba(0,0,0,0.12)",
              borderRadius: "0px",
              top: "65px",
              p: 1,
              left: isDrawerOpen ? `calc(${drawerWidth}px - 1px)` : "71px",
            }}
            className="no-box-shadow"
          >
            <div>
              {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                CIVI
              </Link>{" "}
              /  */}
              {getPathName(location.pathname)}
            </div>
          </AppBar>
          <Drawer
            variant="permanent"
            open={isDrawerOpen}
            sx={{
              width: isDrawerOpen ? drawerWidth : 72,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: isDrawerOpen ? drawerWidth : 72,
                transition: "width 0.3s",
                overflowX: "hidden",
              },
            }}
          >
            <Toolbar />
            <ListItemIcon
              sx={{
                marginLeft: "9px",
              }}
            >
              <IconButton
                style={{ outline: "none" }}
                color="inherit"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </ListItemIcon>
            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              <List>
                {navItems.map((item, index) => (
                  <ListItem button component={Link} to={item.path} key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      sx={{ color: "black" }}
                      primary={item.label}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <List>
              <ListItem
                sx={{
                  position: "fixed",
                  bottom: "0px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                button
              ></ListItem>
            </List>
          </Drawer>
        </>
      )}
      <Container
        id="container"
        sx={{ width: `calc(100vw - ${drawerWidth}px)`, padding: "0px" }}
        style={{ padding: "0px" }}
      >
        <Box
          component="main"
          sx={{
            p: 0,
            mt: 8,
            ml: isDrawerOpen ? `${drawerWidth}px` : "72px",
            transition: "margin-left 0.3s",
            width: `calc(100vw - ${drawerWidth}px)`,
            minHeight: `calc(100vh - 149px)`,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients-search"
              element={
                <PrivateRoute>
                  <ClientsSearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-client"
              element={
                <PrivateRoute>
                  <AddNewClient />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-family-member"
              element={
                <PrivateRoute>
                  <AddFamilyMember />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts-personal-info"
              element={
                <PrivateRoute>
                  <ContactsPersonalInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts-client-notes"
              element={
                <PrivateRoute>
                  <ContactsClientNotes />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts-case-plan"
              element={
                <PrivateRoute>
                  <ContactsCasePlan />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts-assessments"
              element={
                <PrivateRoute>
                  <ContactsAssessments />
                </PrivateRoute>
              }
            />
            <Route
              path="/cases"
              element={
                <PrivateRoute>
                  <Cases />
                </PrivateRoute>
              }
            />
            <Route
              path="/case-workers"
              element={
                <PrivateRoute>
                  <CaseWorkers />
                </PrivateRoute>
              }
            />
            <Route
              path="/case-details"
              element={
                <PrivateRoute>
                  <CaseDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/program-engagements"
              element={
                <PrivateRoute>
                  <ProgramEngagements />
                </PrivateRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <PrivateRoute>
                  <Appointments />
                </PrivateRoute>
              }
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
};

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
