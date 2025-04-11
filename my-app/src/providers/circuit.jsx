import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

export const CircuitContext = createContext(null);
export const CircuitDispatchContext = createContext(null);

let initContext = {
    circuit: {
      id: 1,
      name: 'Circuit1'
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

export function CircuitProvider({ children }){
  const [context, dispatch] = useReducer(circuitReducer, initContext);
  let { id } = useParams();

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/circuits/${id}`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', circuit: res.data})
      }
    })

    axios.get(`http://localhost:3000/circuits/${id}/list_events`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetch_events', events: res.data})
      }
    })

    return () => ignore = true;
  }, [])

  

  return(
    <CircuitContext.Provider value={context}>
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

function circuitReducer(context, action) {
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
      return { ...context, circuit: fetchedCircuit };
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
      return {...context, circuit: action.circuit};
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
      return {...context, circuit: circuit};
    }
    case 'deleted': {
      axios.delete(`http://localhost:3000/circuits/${action.id}`);

      return {...context, circuit: context.circuit.filter((circuit) => circuit.id !== action.id)};
    } 
    case 'subscribed': {
      axios.get(`http://localhost:3000/circuits/${action.id}/subscribe`);

      return context;
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

