import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export const ClubsContext = createContext(null);
export const ClubsDispatchContext = createContext(null);

let initialClubs = [
  {
    id: 1,
    startDate: '18/02/2025',
    endDate: '18/02/2025',
    attendeesNb: '1000',
    venueFee: '10,00€',
    requiredScore: '10',
    name: 'Club1',
    description: 'This is a description',
    rules: 'Not the fun part',
    schedule: 'For spectators mainly',
    bracket: "Don't ask.",
    userId: 'For now a string',
    statusId: 'String for now',
    locationId: 'String for now',
    sportId: '12345',
    typeClubId: 'WIP'
  },
]

export function ClubsProvider({ children }){
  const [clubs, dispatch] = useReducer(clubsReducer, initialClubs);

  useEffect(() => {
    let ignore = false;
    axios.get('http://localhost:3000/clubs')
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', clubs: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <ClubsContext.Provider value={clubs}>
      <ClubsDispatchContext.Provider value={dispatch}>
        { children }
      </ClubsDispatchContext.Provider>
    </ClubsContext.Provider>
  )
}

export function useClubs() {
  return useContext(ClubsContext);
}

export function useClubsDispatch() {
  return useContext(ClubsDispatchContext);
}

function clubsReducer(clubs, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedClubs = action.clubs.map((fetchedClub) => {
        return (
          {
            id: fetchedClub.id,
            startDate: fetchedClub.start_date,
            endDate: fetchedClub.end_date,
            attendeesNb: fetchedClub.attendees_nb,
            venueFee: fetchedClub.venue_fee,
            requiredScore: fetchedClub.required_score,
            name: fetchedClub.name,
            description: fetchedClub.description,
            rules: fetchedClub.rules,
            schedule: fetchedClub.schedule,
            bracket: fetchedClub.bracket,
            userId: fetchedClub.user_id,
            statusId: fetchedClub.status_id,
            locationId: fetchedClub.location_id,
            sportId: fetchedClub.sport_id,
            typeClubId: fetchedClub.typeClub_id
          }
        )
      })
      return [...fetchedClubs];
    }
    case 'added': {
      axios.post('http://localhost:3000/clubs', {
        club: {
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

      return [
        ...clubs,
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
          typeClubId: action.typeClubId
        },
      ];
    }
    case 'changed': {
      return clubs.map((club) => {
        if (club.id === action.club.id) {
          return action.club;
        } else {
          return club;
        }
      });
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
      return clubs;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/clubs/${action.id}`);

      return clubs.filter((club) => club.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/clubs/${action.id}/subscribe`);

      return clubs;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

