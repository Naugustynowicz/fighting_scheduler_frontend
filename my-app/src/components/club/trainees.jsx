import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';

let initialTrainees = {
  trainees: [
    {
      id: 1,
      name: 'Trainee1',
      other: 'This is a description',
      position: 'WIP',
      firstTeam: 'WIP'
    },
    {
      id: 2,
      name: 'Trainee2',
      other: "It's one too",
      position: 'WIP',
      firstTeam: 'WIP'
    },
  ],
  users: [
    {
      id: 1,
      name: 'User1',
      other: 'This is a description',
      position: 'WIP',
      firstTeam: 'WIP'
    },
  ]
}

export default function Trainees({club_id}) {
  const [trainees, dispatch] = useReducer(traineesReducer, initialTrainees);
  const [menu, setMenu] = useState('');

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/clubs/${club_id}/trainees`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', trainees: res.data})
      }
    })
    axios.get(`http://localhost:3000/users`)
    .then(res => {
        dispatch({type: 'fetched_users', users: res.data})
    })
    return () => ignore = true;
  }, [club_id])

  async function subscribeUser(user_id){
    await axios.patch(`http://localhost:3000/clubs/${club_id}/subscribe_user`, {
      club: {user_id: user_id}
    }).then(res => {
      dispatch({type: 'fetched', trainees: res.data})
    })
  }

  async function deleteTrainee(trainee_id){
    await axios.patch(`http://localhost:3000/clubs/${club_id}/delete_trainee`, {
      club: {user_id: trainee_id}
    }).then(res => {
      dispatch({type: 'fetched', trainees: res.data})
    })
  }

  let traineeList;
  if(menu === "edit") {
    traineeList = (
      <div>
        <h3>Users' List</h3>
        <ul>
        {
          trainees.users.map(user => (
            <li key={user.id}>{user.name}
            <text>{user.other}</text>
            <button onClick={ () => subscribeUser(user.id)}>
              Subscribe to club
            </button>
            </li>
          ))
        }
        </ul>
      </div>
    )
  } else {
    traineeList = (
      <div>
        <ul>
        {
          trainees.trainees.map(trainee => (
            <li key={trainee.id}>{trainee.name}
            <text>{trainee.other}</text>
            <button onClick={ () => deleteTrainee(trainee.id) }>
              Unsubscribe
            </button>
            </li>
          ))
        }
        </ul>
      </div>
    )
  }

  return (
    <div title="Trainees' List">
      <h3>Trainees' List</h3>
      <button onClick={() => {
        menu === "edit" ? setMenu('') : setMenu('edit')
      }}>Add user</button>
      {traineeList}
    </div>
  );
}

function traineesReducer(trainees, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedTrainees = action.trainees.map((fetchedTrainee) => {
        return (
          {
            id: fetchedTrainee.id,
            name: fetchedTrainee.name,
            other: fetchedTrainee.other,
            position: fetchedTrainee.position,
            firstTeam: fetchedTrainee.firstTeam
          }
        )
      })
      
      return {...trainees, trainees: [...fetchedTrainees]};
    }
    case 'fetched_users': {
      let fetchedUsers = action.users.map((fetchedUser) => {
        return (
          {
            id: fetchedUser.id,
            name: fetchedUser.name,
            other: fetchedUser.other,
            position: fetchedUser.position,
            firstTeam: fetchedUser.firstTeam
          }
        )
      })
      
      return {...trainees, users: [...fetchedUsers]};
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}