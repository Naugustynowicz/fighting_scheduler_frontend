import React from 'react';
import { useCircuitDispatch } from '../../../providers/circuit';

export default function EditCircuit({circuit}){
  const dispatch = useCircuitDispatch();
  let circuitContent;
  circuitContent = (
    <div title='Editing information'>
      <h3>Editing information</h3>
      <div>
      <input
        placeholder="startDate"
        value={circuit.startDate}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              startDate: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="endDate"
        value={circuit.endDate}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              endDate: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="attendeesNb"
        value={circuit.attendeesNb}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              attendeesNb: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="venueFee"
        value={circuit.venueFee}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              venueFee: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="requiredScore"
        value={circuit.requiredScore}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              requiredScore: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="name"
        value={circuit.name}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              name: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="description"
        type='text'
        value={circuit.description}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              description: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="rules"
        type='text'
        value={circuit.rules}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              rules: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="schedule"
        type='text'
        value={circuit.schedule}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              schedule: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="brackets"
        type='text'
        value={circuit.brackets}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              brackets: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="userId"
        value={circuit.userId}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              userId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="statusId"
        value={circuit.statusId}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              statusId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="locationId"
        value={circuit.locationId}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              locationId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="sportId"
        value={circuit.sportId}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              sportId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="typeCircuitId"
        value={circuit.typeCircuitId}
        onChange={e => {
          dispatch({
            type: 'changed',
            circuit: {
              ...circuit,
              typeCircuitId: e.target.value
            }
          });
        }} 
      />
      </div>
      <div class='button-container'>
      <button onClick={() => {
        dispatch({
          type: 'commitChanges',
          id: circuit.id,
          startDate: circuit.startDate,
          endDate: circuit.endDate,
          attendeesNb: circuit.attendeesNb,
          venueFee: circuit.venueFee,
          requiredScore: circuit.requiredScore,
          name: circuit.name,
          description: circuit.description,
          rules: circuit.rules,
          schedule: circuit.schedule,
          brackets: circuit.brackets,
          userId: circuit.userId,
          statusId: circuit.statusId,
          locationId: circuit.locationId,
          sportId: circuit.sportId,
          typeCircuitId: circuit.typeCircuitId
        });
      }}>
        Save
      </button>
      </div>
    </div>
  );

  return circuitContent;
}