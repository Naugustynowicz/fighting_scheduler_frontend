import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

let initEvents = []

export default function ChoseEvent({club_id}) {
  const [events, dispatch] = useReducer(eventsReducer, initEvents);

  useEffect(() => {
      let ignore = false;
      axios.get('http://localhost:3000/events/')
      .then(res => {
        if(!ignore){
          dispatch({type: 'fetched', events: res.data})
        }
      })
      return () => ignore = true;
    }, [])

  return (
    <div title="Chose an event">
      <h3>Chose an event</h3>
      <div class='container'>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}
            <text>{event.description}</text>
            <button onClick={() => { 
              dispatch({ type: 'add_event', event_id: event.id, club_id: club_id })
            }}>
              Add to club
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

function eventsReducer(events, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedEvents = action.events.map((fetchedEvent) => {
        return (
          {
            id: fetchedEvent.id,
            startDate: fetchedEvent.start_date,
            endDate: fetchedEvent.end_date,
            attendeesNb: fetchedEvent.attendees_nb,
            venueFee: fetchedEvent.venue_fee,
            requiredScore: fetchedEvent.required_score,
            name: fetchedEvent.name,
            description: fetchedEvent.description,
            rules: fetchedEvent.rules,
            schedule: fetchedEvent.schedule,
            bracket: fetchedEvent.bracket,
            userId: fetchedEvent.user_id,
            statusId: fetchedEvent.status_id,
            locationId: fetchedEvent.location_id,
            sportId: fetchedEvent.sport_id,
            typeEventId: fetchedEvent.typeEvent_id
          }
        )
      })
      return [...fetchedEvents];
    }
    case 'add_event': {
      axios.patch(`http://localhost:3000/clubs/${action.club_id}/add_training`,
        {
          club: {
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