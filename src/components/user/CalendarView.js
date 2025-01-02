import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { db } from '../../firebase'; // Ensure the correct import path
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './CalendarView.css';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const q = query(collection(db, "communications"), orderBy("date")); // Adjust according to your collection name
    const querySnapshot = await getDocs(q);
    const eventsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().type,
      date: doc.data().date,
      description: doc.data().description || ""
    }));
    setEvents(eventsList);
  };

  const handleDateClick = (info) => {
    const title = prompt('Enter Communication Title:');
    const description = prompt('Enter Communication Description:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        date: info.dateStr,
        description
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (info) => {
    const event = events.find(event => event.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      alert(`Event: ${event.title}\nDescription: ${event.description}`);
    }
  };

  return (
    <div className="calendar-view">
      <h2>Calendar View</h2>
      {selectedEvent && (
        <div className="selected-event-details">
          <h3>Selected Event</h3>
          <p>Title: {selectedEvent.title}</p>
          <p>Description: {selectedEvent.description}</p>
          <p>Date: {selectedEvent.date}</p>
        </div>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
      />
    </div>
  );
};

export default CalendarView;
