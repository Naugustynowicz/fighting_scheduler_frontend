import React, { useState } from 'react';
import { useSports, useSportsDispatch } from '../../providers/sports';

export default function AddSport() {
  const dispatch = useSportsDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  let nextId = useSports().length + 1;
  return (
    <div class='container'>
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
          description: description,
          status: 'public'
        });
      }}>Add</button>
    </div>
  )
}