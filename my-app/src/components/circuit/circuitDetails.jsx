import React from "react";
import { useCircuit, useCircuitDispatch } from "../../providers/circuit";
import EditCircuit from "../circuits/circuitList/editCircuit";
import ListEventsCircuit from "./listEventsCircuit";

export default function CircuitDetails(){
  const context = useCircuit();
  const dispatch = useCircuitDispatch();

  return (
    <div>
      <h1>Circuit details</h1>
      <div>
        <p>{context.circuit.id}</p>
        <p>{context.circuit.startDate}</p>
        <p>{context.circuit.endDate}</p>
        <p>{context.circuit.attendeesNb}</p>
        <p>{context.circuit.venueFee}</p>
        <p>{context.circuit.requiredScore}</p>
        <h3>{context.circuit.name}</h3>
        <p>{context.circuit.description}</p>
        <p>{context.circuit.rules}</p>
        <p>{context.circuit.schedule}</p>
        <p>{context.circuit.brackets}</p>
        <p>{context.circuit.userId}</p>
        <p>{context.circuit.statusId}</p>
        <p>{context.circuit.locationId}</p>
        <p>{context.circuit.sportId}</p>
        <p>{context.circuit.typeCircuitId}</p>
      </div>
      <EditCircuit circuit={context.circuit} />
      <ListEventsCircuit events={context.events} />
      <div class='button'>
        <button onClick={() => dispatch(
          { type: 'deleted', id: context.circuit.id }
        )}>
          Delete
        </button>
      </div>
    </div>
  );
}