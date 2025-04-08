import React, { useState } from 'react';
import { useLocations, useLocationsDispatch } from '../../providers/locations';

export default function AddLocation() {
  const dispatch = useLocationsDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  let nextId = useLocations().length + 1;
  return (
    <div title='Create new location'>
      <h2>Create new location</h2>
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
      <button onClick={() => {
        setName('');
        setDescription('');
        dispatch({
          type: 'added',
          id: nextId++,
          name: name,
          description: description
        });
      }}>Add</button>
    </div>
  )
}