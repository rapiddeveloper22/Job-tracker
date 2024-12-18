import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LandingPage from "./pages/LandingPage";
import HowToUse from "./pages/HowToUse";
import "./index.css"; // TailwindCSS styles

// Protected Route Component
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if user is logged in
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
