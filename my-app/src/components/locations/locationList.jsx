import React, { useState } from 'react';
import { useLocations, useLocationsDispatch } from '../../providers/locations';

export default function LocationList() {
  const locations = useLocations();

  return (
    <div title='List of Locations'>
      <h2>List of Locations</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            <Location location={location} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Location({ location }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useLocationsDispatch();
  let locationContent;
  if (isEditing) {
    locationContent = (
      <div title='Editing information'>
        <h3>Editing information</h3>
        <div>
          <input value={location.name} placeholder='name' onChange={e => {
            dispatch({ type: 'changed', location: {
              ...location,
              name: e.target.value
            } });
          }} />
          <input type='text' value={location.description} placeholder='description' onChange={e => {
            dispatch({ type: 'changed', location: {
              ...location,
              description: e.target.value
            } });
          }} />
        </div>
        <div>
          <button onClick={() => {
            dispatch({
              type: 'commitChanges',
              id: location.id,
              name: location.name,
              description: location.description
            });
            setIsEditing(false)
          }}>
            Save
          </button>
        </div>
      </div>
    );
  } else {
    locationContent = (
      <div>
        <h3>{location.name}</h3>
        <p>
          {location.description}
        </p>
      </div>
    );
  }

  return (
    <div>
      {locationContent}
      <div>
        <button label='Edit' onClick={() => {
          setIsEditing(true)
        }}>
          Edit
        </button>
        <button label='Delete' onClick={() => dispatch( {
            type: 'deleted',
            id: location.id
        } )}>
          Delete
        </button>
      </div>
    </div>
  );
}