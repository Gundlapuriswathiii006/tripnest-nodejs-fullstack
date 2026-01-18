import { useState } from "react";
import axios from "axios";

function CreateTrip() {
  const [trip, setTrip] = useState({
    title: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:4000/api/trips",
        trip,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Trip Created Successfully");
      setTrip({ title: "", price: "", description: "" });
    } catch (error) {
      alert("Error creating trip");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Trip</h2>

      <input
        name="title"
        placeholder="Title"
        value={trip.title}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={trip.price}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={trip.description}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}

export default CreateTrip;