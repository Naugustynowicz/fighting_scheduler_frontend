import axios from 'axios';
import React, { useReducer } from 'react';

let initEvents = []

export default function ListEventsCircuit({context}){
  return (
    <div title='List of Events'>
      <h2>List of Events</h2>
      <ul>
        {context.events.map(event => (
          <li key={event.id}>
            <Event event={event} circuit_id={context.circuit.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Event({ event, circuit_id }) {
  const [events, dispatch] = useReducer(eventsReducer, initEvents);

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
        <button onClick={() => { 
          dispatch({ type: 'remove_event', event_id: event.id, circuit_id: circuit_id })
        }}>
          Remove from circuit
        </button>
      </div>
    );

  return (
    <div class='event'>
      {eventContent}
    </div>
  );
}

function eventsReducer(events, action) {
  switch (action.type) {
    case 'remove_event': {
      axios.patch(`http://localhost:3000/circuits/${action.circuit_id}/remove_event`,
        {
          circuit: {
            event_id: action.event_id
          }
        }
      );

      return events;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

