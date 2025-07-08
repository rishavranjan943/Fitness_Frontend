import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PredictForm from "./components/PredictForm";
import PredictionHistory from "./components/PredictionHistory";
import Navbar from './components/Navbar';

function TokenHandler({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [location]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt"));

  useEffect(() => {
    // Re-check login status when route changes
    setIsLoggedIn(!!localStorage.getItem("jwt"));
  }, [location]);

  return (
    <>
      <TokenHandler setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/predict" element={<ProtectedRoute><PredictForm /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><PredictionHistory /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
