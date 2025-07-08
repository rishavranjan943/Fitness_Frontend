import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
    window.location.reload(); // Force state and route refresh
  };
  

  if (!isLoggedIn) return null;

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          FitLife
        </Typography>

        <Box>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
