import React from "react";
import { useCircuit, useCircuitDispatch } from "../../providers/circuit";
import EditCircuit from "../circuits/circuitList/editCircuit";

export default function CircuitDetails(){
  const circuit = useCircuit();
  const dispatch = useCircuitDispatch();

  return (
    <div>
      <h1>Circuit details</h1>
      <div>
        <p>{circuit.id}</p>
        <p>{circuit.startDate}</p>
        <p>{circuit.endDate}</p>
        <p>{circuit.attendeesNb}</p>
        <p>{circuit.venueFee}</p>
        <p>{circuit.requiredScore}</p>
        <h3>{circuit.name}</h3>
        <p>{circuit.description}</p>
        <p>{circuit.rules}</p>
        <p>{circuit.schedule}</p>
        <p>{circuit.brackets}</p>
        <p>{circuit.userId}</p>
        <p>{circuit.statusId}</p>
        <p>{circuit.locationId}</p>
        <p>{circuit.sportId}</p>
        <p>{circuit.typeCircuitId}</p>
      </div>
      <EditCircuit circuit={circuit} />
      <div class='button'>
        <button onClick={() => dispatch(
          { type: 'deleted', id: circuit.id }
        )}>
          Delete
        </button>
      </div>
    </div>
  );
}