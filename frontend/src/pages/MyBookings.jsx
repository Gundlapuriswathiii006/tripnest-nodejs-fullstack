import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // 1️⃣ Load bookings from localStorage
  useEffect(() => {
    const storedBookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];
    setBookings(storedBookings);
  }, []);

  // 2️⃣ Cancel booking (DELETE)
  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );

    localStorage.setItem(
      "myBookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
    alert("Booking cancelled ❌");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{booking.title}</h3>
            <p>Destination: {booking.destination}</p>
            <p>Price: ₹{booking.price}</p>
            <p>
              Dates: {booking.startDate} – {booking.endDate}
            </p>

            <button
              onClick={() => handleCancelBooking(booking.id)}
              style={{
                background: "red",
                color: "white",
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;