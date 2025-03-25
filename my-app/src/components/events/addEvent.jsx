import React, { useState } from 'react';
import { useEvents, useEventsDispatch } from '../../providers/events';

export default function AddEvent() {
  const dispatch = useEventsDispatch();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendeesNb, setAttendeesNb] = useState('');
  const [venueFee, setVenueFee] = useState('');
  const [requiredScore, setRequiredScore] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [schedule, setSchedule] = useState('');
  const [brackets, setBrackets] = useState('');
  const [userId, setUserId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [sportId, setSportId] = useState('');
  const [typeEventId, setTypeEventId] = useState('');

  let nextId = useEvents().length + 1;
  return (
    <section class='add-event'>
    <div class='container'>
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
        type='text'
        placeholder="brackets"
        value={brackets}
        onChange={e => setBrackets(e.target.value)}
      />
      <input
        placeholder="userId"
        value={userId}
        onChange={e => setUserId(e.target.value)}
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
        placeholder="typeEventId"
        value={typeEventId}
        onChange={e => setTypeEventId(e.target.value)}
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
          brackets: brackets,
          userId: userId,
          statusId: statusId,
          locationId: locationId,
          sportId: sportId,
          typeEventId: typeEventId,
          status: 'public'
        });
      }}>Add</button>
    </div>
    </section>
  )
}