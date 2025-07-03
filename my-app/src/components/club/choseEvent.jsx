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

  async function addEvent(event_id, club_id){
    await axios.patch(`http://localhost:3000/clubs/${club_id}/add_training`,
      {
        club: {
          event_id: event_id
        }
      }
    ).then( res => {
      dispatch({type: 'add_event', event: res.data})
    })
  }

  return (
    <div title="Chose an event">
      <h3>Chose an event</h3>
      <div class='container'>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}
            <text>{event.description}</text>
            <button onClick={() => { 
              addEvent(event.id, club_id)
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
      const addedEvent = {
        id: action.event.id,
        startDate: action.event.start_date,
        endDate: action.event.end_date,
        attendeesNb: action.event.attendees_nb,
        venueFee: action.event.venue_fee,
        requiredScore: action.event.required_score,
        name: action.event.name,
        description: action.event.description,
        rules: action.event.rules,
        schedule: action.event.schedule,
        bracket: action.event.bracket,
        userId: action.event.user_id,
        statusId: action.event.status_id,
        locationId: action.event.location_id,
        sportId: action.event.sport_id,
        typeEventId: action.event.typeEvent_id
      }

      return [...events, addedEvent];
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}