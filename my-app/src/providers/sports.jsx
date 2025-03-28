import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export const SportsContext = createContext(null);
export const SportsDispatchContext = createContext(null);

let initialSports = [
  {
    id: 1,
    name: 'Sport1',
    description: 'This is a description'
  },
  {
    id: 2,
    name: 'Sport2',
    description: "It's one too"
  },
]

export function SportsProvider({ children }){
  const [sports, dispatch] = useReducer(sportsReducer, initialSports);

  useEffect(() => {
    let ignore = false;
    axios.get('http://localhost:3000/sports')
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', sports: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <SportsContext.Provider value={sports}>
      <SportsDispatchContext.Provider value={dispatch}>
        { children }
      </SportsDispatchContext.Provider>
    </SportsContext.Provider>
  )
}

export function useSports() {
  return useContext(SportsContext);
}

export function useSportsDispatch() {
  return useContext(SportsDispatchContext);
}

function sportsReducer(sports, action) {
  switch (action.type) {
    case 'fetched': {
      return [...action.sports];
    }
    case 'added': {
      axios.post("http://localhost:3000/sports", {
        sport: {
          name: action.name,
          description: action.description
        }
      })

      return [
        ...sports,
        {
          id: action.id,
          name: action.name,
          description: action.description
        },
      ];
    }
    case 'changed': {
      return sports.map((sport) => {
        if (sport.id === action.sport.id) {
          return action.sport;
        } else {
          return sport;
        }
      });
    }
    case 'commitChanges': {
      axios.patch(`http://localhost:3000/sports/${action.id}`, {
        sport: {
          name: action.name,
          description: action.description
        }
      })
      return sports;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/sports/${action.id}`);
      return sports.filter((sport) => sport.id !== action.id);
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

