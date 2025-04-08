import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

export const CircuitContext = createContext(null);
export const CircuitDispatchContext = createContext(null);

let initCircuit = {
    id: 1,
    name: 'Circuit1'
  }

export function CircuitProvider({ children }){
  const [circuit, dispatch] = useReducer(circuitReducer, initCircuit);
  let { id } = useParams();

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/circuits/${id}`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', circuit: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  return(
    <CircuitContext.Provider value={circuit}>
      <CircuitDispatchContext.Provider value={dispatch}>
        { children }
      </CircuitDispatchContext.Provider>
    </CircuitContext.Provider>
  )
}

export function useCircuit() {
  return useContext(CircuitContext);
}

export function useCircuitDispatch() {
  return useContext(CircuitDispatchContext);
}

function circuitReducer(circuit, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedCircuit = {
        id: action.circuit.id,
        startDate: action.circuit.start_date,
        endDate: action.circuit.end_date,
        attendeesNb: action.circuit.attendees_nb,
        venueFee: action.circuit.venue_fee,
        requiredScore: action.circuit.required_score,
        name: action.circuit.name,
        description: action.circuit.description,
        rules: action.circuit.rules,
        schedule: action.circuit.schedule,
        bracket: action.circuit.bracket,
        userId: action.circuit.user_id,
        statusId: action.circuit.status_id,
        locationId: action.circuit.location_id,
        sportId: action.circuit.sport_id,
        typeCircuitId: action.circuit.typeCircuit_id
      }
      return fetchedCircuit;
    }
    case 'changed': {
      return action.circuit;
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
      return circuit;
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/circuits/${action.id}`);

      return circuit.filter((circuit) => circuit.id !== action.id);
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/circuits/${action.id}/subscribe`);

      return circuit;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

