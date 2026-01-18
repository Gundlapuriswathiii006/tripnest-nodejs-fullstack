import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Attach token automatically to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------- TRIPS -------- */

// Admin creates trip
export const createTrip = (data) => API.post("/trips/create", data);

// Logged-in user (or admin) gets trips
export const fetchMyTrips = () => API.get("/trips/my-trips");

// Get single trip
export const getTripById = (id) => API.get(`/trips/${id}`);

/* -------- BOOKINGS -------- */

// Create booking
// src/services/api.js
export const createBooking = (tripId) =>
  API.post(
    "/bookings",
    { tripId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

// Get my bookings
export const fetchMyBookings = () =>
  API.get("/bookings/mybookings");

/* -------- AUTH -------- */

export const loginUser = (data) =>
  API.post("/users/login", data);

export const registerUser = (data) =>
  API.post("/users/register", data);

export default API;