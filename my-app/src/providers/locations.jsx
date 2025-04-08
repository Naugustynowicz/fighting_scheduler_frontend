import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export const LocationsContext = createContext(null);
export const LocationsDispatchContext = createContext(null);

let initialLocations = [
  {
    id: 1,
    name: 'Location1',
    description: 'This is a description'
  },
  {
    id: 2,
    name: 'Location2',
    description: "It's one too"
  },
]

export function LocationsProvider({ children }){
  const [locations, dispatch] = useReducer(locationsReducer, initialLocations);

  useEffect(() => {
    let ignore = false;
    axios.get('http://localhost:3000/locations')
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', locations: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <LocationsContext.Provider value={locations}>
      <LocationsDispatchContext.Provider value={dispatch}>
        { children }
      </LocationsDispatchContext.Provider>
    </LocationsContext.Provider>
  )
}

export function useLocations() {
  return useContext(LocationsContext);
}

export function useLocationsDispatch() {
  return useContext(LocationsDispatchContext);
}

function locationsReducer(locations, action) {
  switch (action.type) {
    case 'fetched': {
      return [...action.locations];
    }
    case 'added': {
      axios.post("http://localhost:3000/locations", {
        location: {
          name: action.name,
          description: action.description
        }
      })

      return [
        ...locations,
        {
          id: action.id,
          name: action.name,
          description: action.description
        },
      ];
    }
    case 'changed': {
      return locations.map((location) => {
        if (location.id === action.location.id) {
          return action.location;
        } else {
          return location;
        }
      });
    }
    case 'commitChanges': {
      axios.patch(`http://localhost:3000/locations/${action.id}`, {
        location: {
          name: action.name,
          description: action.description
        }
      })
      return locations;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/locations/${action.id}`);
      return locations.filter((location) => location.id !== action.id);
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

