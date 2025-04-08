import React from 'react';
import { useCircuits } from '../../providers/circuits';

export default function CircuitList() {
  const circuits = useCircuits();

  return (
    <div title='List of Circuits'>
      <h2>List of Circuits</h2>
      <ul>
        {circuits.map(circuit => (
          <li key={circuit.id}>
            <Circuit circuit={circuit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Circuit({ circuit }) {
  let circuitContent;
  circuitContent = (
      <div>
        <p>{circuit.startDate}</p>
        <p>{circuit.endDate}</p>
        <p>{circuit.attendeesNb}</p>
        <p>{circuit.venueFee}</p>
        <p>{circuit.requiredScore}</p>
        <div><a href={'/circuit/' + circuit.id}><h3>{circuit.name}</h3></a></div>
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
    );

  return (
    <div class='circuit'>
      {circuitContent}
    </div>
  );
}