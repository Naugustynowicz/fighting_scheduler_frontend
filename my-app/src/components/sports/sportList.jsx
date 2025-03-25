import React, { useState } from 'react';
import { useSports, useSportsDispatch } from '../../providers/sports';

export default function SportList() {
  const sports = useSports();

  return (
    <section>
      <h2>List of Sports</h2>
      <ul>
        {sports.map(sport => (
          <li key={sport.id}>
            <Sport sport={sport} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Sport({ sport }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useSportsDispatch();
  let sportContent;
  if (isEditing) {
    sportContent = (
      <section>
      <div>
        <input value={sport.name} onChange={e => {
          dispatch({ type: 'changed', sport: {
            ...sport,
            name: e.target.value
          } });
        }} />
        <input type='text' value={sport.description} onChange={e => {
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
      </section>
    );
  } else {
    sportContent = (
      <div>
        <h2>{sport.name}</h2>
        <p>
          {sport.description}
        </p>
      </div>
    );
  }

  return (
    <section>
      {sportContent}
      <div>
        <button onClick={() => {
          setIsEditing(true)
        }}>
          Edit
        </button>
        <button onClick={() => dispatch( {
            type: 'deleted',
            id: sport.id
        } )}>
          Delete
        </button>
      </div>
    </section>
  );
}