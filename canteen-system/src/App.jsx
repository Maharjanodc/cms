import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Menu from "./components/Menu.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import BackgroundVideo from "./components/BackgroundVideo";
import "./styles.css";

// Safe JSON parse helper
const safeParse = (key, fallback = null) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load logged-in user from localStorage
  useEffect(() => {
    const user = safeParse("loggedInUser");
    setLoggedInUser(user);
  }, []);

  return (
    <>
      {/* Background Video */}
      <BackgroundVideo />

      {/* App Router */}
      <Router>
        <Routes>
          {/* Home / Login */}
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Navigate
                  to={loggedInUser.role === "admin" ? "/admin" : "/menu"}
                />
              ) : (
                <Login setLoggedInUser={setLoggedInUser} />
              )
            }
          />

          {/* Signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Customer Menu */}
          <Route
            path="/menu"
            element={
              loggedInUser?.role === "customer" ? <Menu /> : <Navigate to="/" />
            }
          />

          {/* Admin Panel */}
          <Route
            path="/admin"
            element={
              loggedInUser?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
