import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApplicationProvider } from './context/ApplicationContext';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LandingPage from "./pages/LandingPage";
import HowToUse from "./pages/HowToUse";
import FeedbackForm from "./pages/FeedbackForm";
import TermsOfService from "./pages/TermsOfService";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import ApplicationDetails from "./pages/ApplicationDetails";
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
        <Route path="/howToUse" element={<HowToUse />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/feedbackForm" element={<FeedbackForm />} />
        <Route path="/termsOfService" element={<TermsOfService />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/aboutUs" element={<AboutUs />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/application/:id" element={<ProtectedRoute element={ApplicationDetails} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;
