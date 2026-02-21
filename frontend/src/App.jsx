import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/income"
            element={
              <PrivateRoute>
                <Income />
              </PrivateRoute>
            }
          />

          <Route
            path="/expense"
            element={
              <PrivateRoute>
                <Expense />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
