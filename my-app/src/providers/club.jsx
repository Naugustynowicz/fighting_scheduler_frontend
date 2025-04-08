import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

export const ClubContext = createContext(null);
export const ClubDispatchContext = createContext(null);

let initClub = {
    id: 1,
    name: 'Club1'
  }

export function ClubProvider({ children }){
  const [club, dispatch] = useReducer(clubReducer, initClub);
  let { id } = useParams();

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/clubs/${id}`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', club: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <ClubContext.Provider value={club}>
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

function clubReducer(club, action) {
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
      return fetchedClub;
    }
    case 'changed': {
      return action.club;
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
      return club;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/clubs/${action.id}`);

      return club.filter((club) => club.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/clubs/${action.id}/subscribe`);

      return club;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

