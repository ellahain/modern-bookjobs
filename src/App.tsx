import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Dashboard } from "./components/Dashboard";
import Home from "./pages/Home"; // Adjust this path if needed

function ProtectedDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const pw = prompt("Enter admin password:");
    if (pw === "secret123") setAuthenticated(true);
    setChecked(true);
  }, []);

  if (!checked) return <div>Checking credentials...</div>;
  return authenticated ? <Dashboard /> : <Navigate to="/" />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="job-postings-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

