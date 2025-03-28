import React, { useState } from 'react';
import { useSports, useSportsDispatch } from '../../providers/sports';

export default function SportList() {
  const sports = useSports();

  return (
    <div title='List of Sports'>
      <h2>List of Sports</h2>
      <ul>
        {sports.map(sport => (
          <li key={sport.id}>
            <Sport sport={sport} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sport({ sport }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useSportsDispatch();
  let sportContent;
  if (isEditing) {
    sportContent = (
      <div title='Editing information'>
        <h3>Editing information</h3>
        <div>
          <input value={sport.name} placeholder='name' onChange={e => {
            dispatch({ type: 'changed', sport: {
              ...sport,
              name: e.target.value
            } });
          }} />
          <input type='text' value={sport.description} placeholder='description' onChange={e => {
            dispatch({ type: 'changed', sport: {
              ...sport,
              description: e.target.value
            } });
          }} />
        </div>
        <div>
          <button onClick={() => {
            dispatch({
              type: 'commitChanges',
              id: sport.id,
              name: sport.name,
              description: sport.description
            });
            setIsEditing(false)
          }}>
            Save
          </button>
        </div>
      </div>
    );
  } else {
    sportContent = (
      <div>
        <h3>{sport.name}</h3>
        <p>
          {sport.description}
        </p>
      </div>
    );
  }

  return (
    <div>
      {sportContent}
      <div>
        <button label='Edit' onClick={() => {
          setIsEditing(true)
        }}>
          Edit
        </button>
        <button label='Delete' onClick={() => dispatch( {
            type: 'deleted',
            id: sport.id
        } )}>
          Delete
        </button>
      </div>
    </div>
  );
}