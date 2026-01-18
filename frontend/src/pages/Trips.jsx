import { useEffect, useState } from "react";
import API, { createBooking } from "../services/api";

function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all trips
  useEffect(() => {
    API.get("/trips/my-trips")
      .then((res) => {
        setTrips(res.data.trips || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Book trip → SAVE TO DATABASE
  const handleBookTrip = async (trip) => {
    try {
      await createBooking(trip._id);
      alert("Trip booked successfully ✅");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
        "You already booked this trip ⚠️"
      );
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading trips...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Trips</h2>

      {trips.length === 0 ? (
        <p>No trips available</p>
      ) : (
        trips.map((trip) => (
          <div
            key={trip._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <h3>{trip.title}</h3>
            <p><b>Destination:</b> {trip.destination}</p>
            <p><b>Price:</b> ₹{trip.budget}</p>
            <p>
              <b>Dates:</b>{" "}
              {new Date(trip.startDate).toDateString()} –{" "}
              {new Date(trip.endDate).toDateString()}
            </p>

            <button onClick={() => handleBookTrip(trip)}>
              Book Trip
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Trips;