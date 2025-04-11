import React from 'react';

export default function ListEventsCircuit({events}){
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
  let eventContent;
  eventContent = (
      <div>
        <p>{event.startDate}</p>
        <p>{event.endDate}</p>
        <p>{event.attendeesNb}</p>
        <p>{event.venueFee}</p>
        <p>{event.requiredScore}</p>
        <div><a href={'/event/' + event.id}><h3>{event.name}</h3></a></div>
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

  return (
    <div class='event'>
      {eventContent}
    </div>
  );
}

