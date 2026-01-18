
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTrip from "./pages/CreateTrip";
import MyBookings from "./pages/MyBookings";
import AdminTrips from "./pages/AdminTrip";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PROTECTED ROUTE */}
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />
        <Route
        path ="/mybookings"
        element ={
          <ProtectedRoute>
            <MyBookings/>
          </ProtectedRoute>
        }
        />


        {/* ADMIN PROTECTED ROUTE */}
        <Route
        path ="/admin/trips"
        element={
          <ProtectedRoute roleRequired="ADMIN">
          <AdminTrips/>
          </ProtectedRoute>
        }
        />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <CreateTrip />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;