import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

export const EventContext = createContext(null);
export const EventDispatchContext = createContext(null);

let initEvent = {
    id: 1,
    name: 'Event1'
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
      return action.event;
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
      return event;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/events/${action.id}`);

      return event.filter((event) => event.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/events/${action.id}/subscribe`);

      return event;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

