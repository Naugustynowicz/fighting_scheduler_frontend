import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export const CircuitsContext = createContext(null);
export const CircuitsDispatchContext = createContext(null);

let initialCircuits = [
  {
    id: 1,
    startDate: '18/02/2025',
    endDate: '18/02/2025',
    attendeesNb: '1000',
    venueFee: '10,00€',
    requiredScore: '10',
    name: 'Circuit1',
    description: 'This is a description',
    rules: 'Not the fun part',
    schedule: 'For spectators mainly',
    bracket: "Don't ask.",
    userId: 'For now a string',
    statusId: 'String for now',
    locationId: 'String for now',
    sportId: '12345',
    typeCircuitId: 'WIP'
  },
]

export function CircuitsProvider({ children }){
  const [circuits, dispatch] = useReducer(circuitsReducer, initialCircuits);

  useEffect(() => {
    let ignore = false;
    axios.get('http://localhost:3000/circuits')
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', circuits: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <CircuitsContext.Provider value={circuits}>
      <CircuitsDispatchContext.Provider value={dispatch}>
        { children }
      </CircuitsDispatchContext.Provider>
    </CircuitsContext.Provider>
  )
}

export function useCircuits() {
  return useContext(CircuitsContext);
}

export function useCircuitsDispatch() {
  return useContext(CircuitsDispatchContext);
}

function circuitsReducer(circuits, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedCircuits = action.circuits.map((fetchedCircuit) => {
        return (
          {
            id: fetchedCircuit.id,
            startDate: fetchedCircuit.start_date,
            endDate: fetchedCircuit.end_date,
            attendeesNb: fetchedCircuit.attendees_nb,
            venueFee: fetchedCircuit.venue_fee,
            requiredScore: fetchedCircuit.required_score,
            name: fetchedCircuit.name,
            description: fetchedCircuit.description,
            rules: fetchedCircuit.rules,
            schedule: fetchedCircuit.schedule,
            bracket: fetchedCircuit.bracket,
            userId: fetchedCircuit.user_id,
            statusId: fetchedCircuit.status_id,
            locationId: fetchedCircuit.location_id,
            sportId: fetchedCircuit.sport_id,
            typeCircuitId: fetchedCircuit.typeCircuit_id
          }
        )
      })
      return [...fetchedCircuits];
    }
    case 'added': {
      axios.post('http://localhost:3000/circuits', {
        circuit: {
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
          type_circuit_id: action.typeCircuitId
        }
      });

      return [
        ...circuits,
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
          typeCircuitId: action.typeCircuitId
        },
      ];
    }
    case 'changed': {
      return circuits.map((circuit) => {
        if (circuit.id === action.circuit.id) {
          return action.circuit;
        } else {
          return circuit;
        }
      });
    }
    case 'commitChanges': {
      axios.patch(`http://localhost:3000/circuits/${action.id}`, { 
        circuit: {
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
          type_circuit_id: action.typeCircuitId
        }
      });
      return circuits;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/circuits/${action.id}`);

      return circuits.filter((circuit) => circuit.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/circuits/${action.id}/subscribe`);

      return circuits;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

