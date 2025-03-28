import React, { useState } from 'react';
import { useEvents, useEventsDispatch } from '../../providers/events';
import Attendees from './eventList/attendees';
import EditEvent from './eventList/editEvent';
import TreeBracket from './eventList/treeBracket';

export default function EventList() {
  const events = useEvents();

  return (
    <div title='List of Events'>
      <h2>List of Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Event({ event }) {
  const [isEditing, setIsEditing] = useState('');
  const dispatch = useEventsDispatch();
  let eventContent;
  if (isEditing === 'event') {
    eventContent = (
      <EditEvent event={event} />
    )
  } else if (isEditing === 'attendees') {
    eventContent = (
      <Attendees event_id={event.id} />
    )
  } else if (isEditing === 'bracket') {
    eventContent = (
      <TreeBracket event_id={event.id} />
    )
  } else {
    eventContent = (
      <div>
        <p>{event.startDate}</p>
        <p>{event.endDate}</p>
        <p>{event.attendeesNb}</p>
        <p>{event.venueFee}</p>
        <p>{event.requiredScore}</p>
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p>{event.rules}</p>
        <p>{event.schedule}</p>
        <p>{event.brackets}</p>
        <p>{event.userId}</p>
        <p>{event.statusId}</p>
        <p>{event.locationId}</p>
        <p>{event.sportId}</p>
        <p>{event.typeEventId}</p>
      </div>
    );
  }

  return (
    <div class='event'>
      {eventContent}
      <div class='button'>
        <button onClick={() => {
            setIsEditing('')
        }}>
            Event
        </button>
        <button onClick={() => {
            setIsEditing('event')
        }}>
            Edit
        </button>
        <button onClick={() => {
            setIsEditing('attendees')
        }}>
            Attendees
        </button>
        <button onClick={() => { 
          dispatch({ type: 'subscribed', id: event.id })
          setIsEditing('attendees')
        }}>
          Subscribe
        </button>
        <button onClick={() => {
            setIsEditing('bracket')
        }}>
          Bracket
        </button>
        <button onClick={() => dispatch(
          { type: 'deleted', id: event.id }
        )}>
          Delete
        </button>
      </div>
    </div>
  );
}