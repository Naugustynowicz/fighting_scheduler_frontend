import React from 'react';
import { useEventsDispatch } from '../../../providers/events';

export default function EditEvent({event}){
  const dispatch = useEventsDispatch();
  let eventContent;
  eventContent = (
    <section>
      <div class='container'>
      <input
        placeholder="startDate"
        value={event.startDate}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              startDate: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="endDate"
        value={event.endDate}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              endDate: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="attendeesNb"
        value={event.attendeesNb}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              attendeesNb: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="venueFee"
        value={event.venueFee}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              venueFee: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="requiredScore"
        value={event.requiredScore}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              requiredScore: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="name"
        value={event.name}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              name: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="description"
        type='text'
        value={event.description}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              description: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="rules"
        type='text'
        value={event.rules}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              rules: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="schedule"
        type='text'
        value={event.schedule}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              schedule: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="brackets"
        type='text'
        value={event.brackets}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              brackets: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="userId"
        value={event.userId}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              userId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="statusId"
        value={event.statusId}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              statusId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="locationId"
        value={event.locationId}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              locationId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="sportId"
        value={event.sportId}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              sportId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="typeEventId"
        value={event.typeEventId}
        onChange={e => {
          dispatch({
            type: 'changed',
            event: {
              ...event,
              typeEventId: e.target.value
            }
          });
        }} 
      />
      </div>
      <div class='button-container'>
      <button onClick={() => {
        dispatch({
          type: 'commitChanges',
          id: event.id,
          startDate: event.startDate,
          endDate: event.endDate,
          attendeesNb: event.attendeesNb,
          venueFee: event.venueFee,
          requiredScore: event.requiredScore,
          name: event.name,
          description: event.description,
          rules: event.rules,
          schedule: event.schedule,
          brackets: event.brackets,
          userId: event.userId,
          statusId: event.statusId,
          locationId: event.locationId,
          sportId: event.sportId,
          typeEventId: event.typeEventId
        });
      }}>
        Save
      </button>
      </div>
    </section>
  );

  return eventContent;
}