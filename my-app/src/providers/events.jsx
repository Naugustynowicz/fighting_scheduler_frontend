import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export const EventsContext = createContext(null);
export const EventsDispatchContext = createContext(null);

let initialEvents = [
  {
    id: 1,
    startDate: '18/02/2025',
    endDate: '18/02/2025',
    attendeesNb: '1000',
    venueFee: '10,00€',
    requiredScore: '10',
    name: 'Event1',
    description: 'This is a description',
    rules: 'Not the fun part',
    schedule: 'For spectators mainly',
    bracket: "Don't ask.",
    userId: 'For now a string',
    statusId: 'String for now',
    locationId: 'String for now',
    sportId: '12345',
    typeEventId: 'WIP'
  },
]

export function EventsProvider({ children }){
  const [events, dispatch] = useReducer(eventsReducer, initialEvents);

  useEffect(() => {
    let ignore = false;
    axios.get('http://localhost:3000/events')
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', events: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <EventsContext.Provider value={events}>
      <EventsDispatchContext.Provider value={dispatch}>
        { children }
      </EventsDispatchContext.Provider>
    </EventsContext.Provider>
  )
}

export function useEvents() {
  return useContext(EventsContext);
}

export function useEventsDispatch() {
  return useContext(EventsDispatchContext);
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
    case 'added': {
      axios.post('http://localhost:3000/events', {
        event: {
          start_date: action.startDate,
          end_date: action.endDate,
          attendees_nb: action.attendeesNb,
          venue_fee: action.venueFee,
          required_score: action.requiredScore,
          name: action.name,
          description: action.description,
          rules: action.rules,
          schedule: action.schedule,
          bracket: action.bracket,
          user_id: action.userId,
          status_d: action.statusId,
          location_id: action.locationId,
          sport_id: action.sportId,
          typeEvent_id: action.typeEventId
        }
      });

      return [
        ...events,
        {
          id: action.id,
          startDate: action.startDate,
          endDate: action.endDate,
          attendeesNb: action.attendeesNb,
          venueFee: action.venueFee,
          requiredScore: action.requiredScore,
          name: action.name,
          description: action.description,
          rules: action.rules,
          schedule: action.schedule,
          bracket: action.bracket,
          userId: action.userId,
          statusId: action.statusId,
          locationId: action.locationId,
          sportId: action.sportId,
          typeEventId: action.typeEventId
        },
      ];
    }
    case 'changed': {
      return events.map((event) => {
        if (event.id === action.event.id) {
          return action.event;
        } else {
          return event;
        }
      });
    }
    case 'commitChanges': {
      axios.patch(`http://localhost:3000/events/${action.id}`, { 
        event: {
          id: action.id,
          start_date: action.startDate,
          end_date: action.endDate,
          attendees_nb: action.attendeesNb,
          venue_fee: action.venueFee,
          required_score: action.requiredScore,
          name: action.name,
          description: action.description,
          rules: action.rules,
          schedule: action.schedule,
          bracket: action.bracket,
          user_id: action.userId,
          status_id: action.statusId,
          location_id: action.locationId,
          sport_id: action.sportId,
          typeEvent_id: action.typeEventId
        }
      });
      return events;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/events/${action.id}`);

      return events.filter((event) => event.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/events/${action.id}/subscribe`);

      return events;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

