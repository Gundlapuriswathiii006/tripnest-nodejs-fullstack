import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending","confirmed" ,"cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);