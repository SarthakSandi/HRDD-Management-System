import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newEventDate, setNewEventDate] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    category: "Meeting"
  });

  const categoryColors = {
    Meeting: "#0b4c7c",
    Visit: "#2e7d32",
    Training: "#c62828"
  };

  const fetchEvents = () => {
    axios.get("http://localhost:5000/events")
      .then(res => {
        const formatted = res.data.map(e => ({
          id: e.id,
          title: e.title,
          date: e.event_date,
          time: e.event_time,
          category: e.category,
          backgroundColor: categoryColors[e.category] || "#0b4c7c",
          borderColor: categoryColors[e.category] || "#0b4c7c"
        }));
        setEvents(formatted);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    const event = events.find(e => e.id == info.event.id);
    setSelectedEvent(event);
  };

  const handleDateClick = (info) => {
    setNewEventDate(info.dateStr);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:5000/events/${selectedEvent.id}`,
      {
        title: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time,
        category: selectedEvent.category
      }
    );

    alert("Event Updated");
    setSelectedEvent(null);
    fetchEvents();
  };

  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:5000/events/${selectedEvent.id}`
    );

    alert("Event Deleted");
    setSelectedEvent(null);
    fetchEvents();
  };

  const handleAddEvent = async () => {
    await axios.post("http://localhost:5000/events", {
      title: newEvent.title,
      date: newEventDate,
      time: newEvent.time,
      category: newEvent.category
    });

    setShowModal(false);
    setNewEvent({ title: "", time: "", category: "Meeting" });
    fetchEvents();
  };

  return (
    <div className="calendar-card">

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height={600}
      />

      {/* EDIT EVENT BOX */}
      {selectedEvent && (
        <div className="event-detail-box">
          <h3>Edit Event</h3>

          <input
            value={selectedEvent.title}
            onChange={(e) =>
              setSelectedEvent({
                ...selectedEvent,
                title: e.target.value
              })
            }
          />

          <input
            type="date"
            value={selectedEvent.date}
            onChange={(e) =>
              setSelectedEvent({
                ...selectedEvent,
                date: e.target.value
              })
            }
          />

          <input
            type="time"
            value={selectedEvent.time}
            onChange={(e) =>
              setSelectedEvent({
                ...selectedEvent,
                time: e.target.value
              })
            }
          />

          <select
            value={selectedEvent.category}
            onChange={(e) =>
              setSelectedEvent({
                ...selectedEvent,
                category: e.target.value
              })
            }
          >
            <option>Meeting</option>
            <option>Visit</option>
            <option>Training</option>
          </select>

          <button onClick={handleUpdate}>Save Changes</button>

          <button
            style={{ backgroundColor: "darkred", marginTop: "10px" }}
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </div>
      )}

      {/* ADD EVENT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Event</h3>

            <input
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />

            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />

            <select
              value={newEvent.category}
              onChange={(e) =>
                setNewEvent({ ...newEvent, category: e.target.value })
              }
            >
              <option>Meeting</option>
              <option>Visit</option>
              <option>Training</option>
            </select>

            <button onClick={handleAddEvent}>Add Event</button>

            <button
              style={{ marginTop: "10px" }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
