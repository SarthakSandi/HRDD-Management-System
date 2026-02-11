import React from "react";
import "./Dashboard.css";
import EventForm from "./components/EventForm";
import CalendarView from "./components/CalendarView";
import UpcomingEvents from "./components/UpcomingEvents";
import Visits from "./components/Visits";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">HRDD Dashboard</h1>

      <div className="top-section">
        <EventForm />
        <CalendarView />
      </div>

      <UpcomingEvents />
      <Visits />
    </div>
  );
};

export default Dashboard;
