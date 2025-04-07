import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

export const EventContext = createContext(null);
export const EventDispatchContext = createContext(null);

let initEvent = {
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
  }

export function EventProvider({ children }){
  const [event, dispatch] = useReducer(eventReducer, initEvent);
  let { id } = useParams();

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/events/${id}`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', event: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <EventContext.Provider value={event}>
      <EventDispatchContext.Provider value={dispatch}>
        { children }
      </EventDispatchContext.Provider>
    </EventContext.Provider>
  )
}

export function useEvent() {
  return useContext(EventContext);
}

export function useEventDispatch() {
  return useContext(EventDispatchContext);
}

function eventReducer(event, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedEvent = {
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
      return fetchedEvent;
    }
    case 'changed': {
      return Event.map((event) => {
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
          status_id: action.statusId,
          location_id: action.locationId,
          sport_id: action.sportId,
          type_event_id: action.typeEventId
        }
      });
      return Event;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/events/${action.id}`);

      return Event.filter((event) => event.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/events/${action.id}/subscribe`);

      return Event;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

