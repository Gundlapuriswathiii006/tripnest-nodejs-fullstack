import { useEffect, useState } from "react";
import axios from "axios";

function AdminTrips() {
  const [trips, setTrips] = useState([]);

  // load trips
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/trips/create");
      setTrips(res.data);
      console.log("Trips from backend: ",res.data)
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/admin/trip/${id}`);
      fetchTrips(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Trips</h2>

      <button
        onClick={() => window.location.href = "/create-trip"}
        style={{ marginBottom: "15px" }}
      >
        ➕ Add New Trip
      </button>

      {trips.map((trip) => (
        <div
          key={trip._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{trip.title}</h3>
          <p>{trip.description}</p>
          <p>₹{trip.price}</p>

          <button
            onClick={() => deleteTrip(trip._id)}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminTrips;