import  {Booking}  from "../models/Booking.js";
import Trip  from "../models/Trip.js";

/* 1️⃣ Create Booking */
export const createBooking = async (req, res) => {
  try {
    const { tripId,persons} = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      trip: tripId,
      persons
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 2️⃣ Get My Bookings */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("trip");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 3️⃣ Cancel Booking */
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "confirmed";
    await booking.save();

    res.json({
      success: true,
      message: "Booking approved",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};