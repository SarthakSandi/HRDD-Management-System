import { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddEvent = async () => {
    if (!title || !date || !time) {
      alert("All fields required");
      return;
    }

    await axios.post("http://localhost:5000/events", {
      title,
      date,
      time
    });

    alert("Event added successfully");

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <div className="card">
      <h3>Add Event</h3>

      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

export default EventForm;
