import React from 'react';
import { useClubDispatch } from '../../../providers/club';

export default function EditClub({club}){
  const dispatch = useClubDispatch();
  let clubContent;
  clubContent = (
    <div title='Editing information'>
      <h3>Editing information</h3>
      <div>
      <input
        placeholder="startDate"
        value={club.startDate}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              startDate: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="endDate"
        value={club.endDate}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              endDate: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="attendeesNb"
        value={club.attendeesNb}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              attendeesNb: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="venueFee"
        value={club.venueFee}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              venueFee: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="requiredScore"
        value={club.requiredScore}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              requiredScore: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="name"
        value={club.name}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              name: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="description"
        type='text'
        value={club.description}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              description: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="rules"
        type='text'
        value={club.rules}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              rules: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="schedule"
        type='text'
        value={club.schedule}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              schedule: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="brackets"
        type='text'
        value={club.brackets}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              brackets: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="userId"
        value={club.userId}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              userId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="statusId"
        value={club.statusId}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              statusId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="locationId"
        value={club.locationId}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              locationId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="sportId"
        value={club.sportId}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              sportId: e.target.value
            }
          });
        }} 
      />
      <input
        placeholder="typeClubId"
        value={club.typeClubId}
        onChange={e => {
          dispatch({
            type: 'changed',
            club: {
              ...club,
              typeClubId: e.target.value
            }
          });
        }} 
      />
      </div>
      <div class='button-container'>
      <button onClick={() => {
        dispatch({
          type: 'commitChanges',
          id: club.id,
          startDate: club.startDate,
          endDate: club.endDate,
          attendeesNb: club.attendeesNb,
          venueFee: club.venueFee,
          requiredScore: club.requiredScore,
          name: club.name,
          description: club.description,
          rules: club.rules,
          schedule: club.schedule,
          brackets: club.brackets,
          userId: club.userId,
          statusId: club.statusId,
          locationId: club.locationId,
          sportId: club.sportId,
          typeClubId: club.typeClubId
        });
      }}>
        Save
      </button>
      </div>
    </div>
  );

  return clubContent;
}