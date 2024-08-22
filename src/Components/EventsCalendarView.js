import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const EventsCalendarView = ({ finalEventsData, isVisible }) => {
  console.log(finalEventsData);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [eventDate, setEventDate] = useState('');

  const events = Array.from(finalEventsData.entries()).flatMap(([date, timeMap]) =>
    Array.from(timeMap.entries()).flatMap(([time, eventList]) =>
      eventList.map((event) => ({
        id: event.EventId,
        title: event.EventTitle,
        start: new Date(`${event.EventStartDate} ${event.EventStartTime}`).toISOString(),
        end: new Date(`${event.EventEndDate} ${event.EventEndTime}`).toISOString(),
        description: event.EventDescription,
        // location: event.EventLocation,
        // url: event.EventLink,
      }))
    )
  );

  const renderEventContent = (eventInfo) => {
    return (
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }}>
        <strong>{eventInfo.event.title}</strong>
        <br />
      </div>
    );
  };

  const handleDateClick = (info) => {
    const eventsOnDate = events.filter(event => {
      const eventStartDate = new Date(event.start).toISOString().split('T')[0];
      const eventEndDate = new Date(event.end).toISOString().split('T')[0];
      return (eventStartDate <= info.dateStr && eventEndDate > info.dateStr) || (eventStartDate === info.dateStr);
    });

    setSelectedDateEvents(eventsOnDate);
    setEventDate(info.dateStr);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [isVisible]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        aspectRatio={1.5}
        selectable={true}
        dateClick={handleDateClick}
      />

      {showPopup && (
        <div className="event-popup">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClose}>&times;</span>
            <h4>Events on {eventDate}:</h4>
            {selectedDateEvents.length > 0 ? (
              <ul>
                {selectedDateEvents.map((event, index) => (
                  <li key={index} className="time-wise-events">
                  <span className="event-card-title"><strong>Title:</strong> {event.title}</span> <br />
                  <span className=".event-card-description"><strong>Description:</strong> {event.description}{" "}<br /></span>
                </li>
                ))}
              </ul>
            ) : (
              <p>No events on this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendarView;
