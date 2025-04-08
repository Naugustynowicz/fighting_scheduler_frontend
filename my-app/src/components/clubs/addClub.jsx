import React, { useState } from 'react';
import { useClubs, useClubsDispatch } from '../../providers/clubs';

export default function AddClub() {
  const dispatch = useClubsDispatch();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendeesNb, setAttendeesNb] = useState('');
  const [venueFee, setVenueFee] = useState('');
  const [requiredScore, setRequiredScore] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [schedule, setSchedule] = useState('');
  const [statusId, setStatusId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [sportId, setSportId] = useState('');
  const [typeClubId, setTypeClubId] = useState('');

  let nextId = useClubs().length + 1;
  return (
    <div title='Create new club'>
      <h2>Create new club</h2>
      <div >
        <input
          placeholder="start date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          placeholder="end date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <input
          placeholder="attendees nb"
          value={attendeesNb}
          onChange={e => setAttendeesNb(e.target.value)}
        />
        <input
          placeholder="venue fee"
          value={venueFee}
          onChange={e => setVenueFee(e.target.value)}
        />
        <input
          placeholder="required_score"
          value={requiredScore}
          onChange={e => setRequiredScore(e.target.value)}
        />
        <input
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder="rules"
          value={rules}
          onChange={e => setRules(e.target.value)}
        />
        <input
          type='text'
          placeholder="schedule"
          value={schedule}
          onChange={e => setSchedule(e.target.value)}
        />
        <input
          placeholder="statusId"
          value={statusId}
          onChange={e => setStatusId(e.target.value)}
        />
        <input
          placeholder="locationId"
          value={locationId}
          onChange={e => setLocationId(e.target.value)}
        />
        <input
          placeholder="sportId"
          value={sportId}
          onChange={e => setSportId(e.target.value)}
        />
        <input
          placeholder="typeClubId"
          value={typeClubId}
          onChange={e => setTypeClubId(e.target.value)}
        />
        </div><div class='button'>
        <button onClick={() => {
          dispatch({
            type: 'added',
            id: nextId++,
            startDate: startDate,
            endDate: endDate,
            attendeesNb: attendeesNb,
            venueFee: venueFee,
            requiredScore: requiredScore,
            name: name,
            description: description,
            rules: rules,
            schedule: schedule,
            statusId: statusId,
            locationId: locationId,
            sportId: sportId,
            typeClubId: typeClubId
          });
        }}>Add</button>
      </div>
    </div>
  )
}