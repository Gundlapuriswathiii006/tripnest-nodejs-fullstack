import Trip from "../models/Trip.js";

// CREATE TRIP
export const createTrip = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, budget } = req.body;

    if (!title || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const trip = await Trip.create({
      title,
      destination,
      startDate,
      endDate,
      budget,
      user: req.user.id, // coming from authMiddleware
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMyTrips = async (req, res) => {
  try {
    console.log("REQ.USER:",req.user);
    const trips = await Trip.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    console.error("getmytrips error",error);
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};