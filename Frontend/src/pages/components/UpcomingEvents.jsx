import { useEffect, useState } from "react";
import axios from "axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/events/upcoming")
      .then(res => setEvents(res.data));
  }, []);

  return (
    <div className="card full-width">
      <h3>Upcoming This Week</h3>

      {events.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        events.map(event => (
          <p key={event.id}>
             {event.title} — {event.event_date} at {event.event_time}
          </p>
        ))
      )}
    </div>
  );
};

export default UpcomingEvents;
