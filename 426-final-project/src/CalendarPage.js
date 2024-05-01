import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCalendarEvents() {
      try {
        const response = await fetch('http://localhost:4000/calendar/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    }

    fetchCalendarEvents();
  }, []);

  return (
    <div>
      <h1>Google Calendar</h1>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '50px' }}
        />
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default CalendarPage;
