import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

export const ClubContext = createContext(null);
export const ClubDispatchContext = createContext(null);

let initContext = {
  club: {
    id: 1,
    name: 'Club1'
  },
  events: [
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
  }

export function ClubProvider({ children }){
  const [context, dispatch] = useReducer(clubReducer, initContext);
  let { id } = useParams();

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/clubs/${id}`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', club: res.data})
      }
    })

    axios.get(`http://localhost:3000/clubs/${id}/list_events`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetch_events', events: res.data})
      }
    })

    return () => ignore = true;
  }, [])

  return(
    <ClubContext.Provider value={context}>
      <ClubDispatchContext.Provider value={dispatch}>
        { children }
      </ClubDispatchContext.Provider>
    </ClubContext.Provider>
  )
}

export function useClub() {
  return useContext(ClubContext);
}

export function useClubDispatch() {
  return useContext(ClubDispatchContext);
}

function clubReducer(context, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedClub = {
        id: action.club.id,
        startDate: action.club.start_date,
        endDate: action.club.end_date,
        attendeesNb: action.club.attendees_nb,
        venueFee: action.club.venue_fee,
        requiredScore: action.club.required_score,
        name: action.club.name,
        description: action.club.description,
        rules: action.club.rules,
        schedule: action.club.schedule,
        bracket: action.club.bracket,
        userId: action.club.user_id,
        statusId: action.club.status_id,
        locationId: action.club.location_id,
        sportId: action.club.sport_id,
        typeClubId: action.club.typeClub_id
      }
      return { ...context, club: fetchedClub };
    }
    case 'fetch_events': {
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
      return {...context, events: fetchedEvents};
    }
    case 'changed': {
      return {...context, club: action.club};
    }
    case 'commitChanges': {
      axios.patch(`http://localhost:3000/clubs/${action.id}`, { 
        club: {
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
          type_club_id: action.typeClubId
        }
      });
      return {...context, club: club};
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/clubs/${action.id}`);

      return {...context, club: context.club.filter((club) => club.id !== action.id)};
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/clubs/${action.id}/subscribe`);

      return context;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

