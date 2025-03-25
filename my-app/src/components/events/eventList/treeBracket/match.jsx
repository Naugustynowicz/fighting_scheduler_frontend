import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

let initMatch = [
  {
    id: 1,
    event: 1, 
    user1: 1, 
    user2: 2, 
    winner: null, 
    previous_match_1: 1, 
    previous_match_2: 2
  }
]

export default function Match({match_id}) {
  const [match, dispatch] = useReducer(matchReducer, initMatch);
  const const_match_id = match_id;

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/matches/${const_match_id}`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', match: res.data})
      }
    })
    return () => ignore = true;
  }, [])

  let subMatch1 = (<></>); 
  let subMatch2 = (<></>);
  if(typeof(match.previous_match_1) !== 'undefined' && typeof(match.previous_match_1) !== 'null'){
    subMatch1 = (<Match match_id={match.previous_match_1} />)
  }
  if(typeof(match.previous_match_2) !== 'undefined' && typeof(match.previous_match_2) !== 'null'){
    subMatch2 = (<Match match_id={match.previous_match_2} />)
  }

  return (
    <>
      <li key={match.id}>
        <h4>{match.user1_name}</h4><h4>{match.user2_name}</h4>
        <h6>{match.user1_email}</h6><h6>{match.user2_email}</h6>
      </li>
      {subMatch1}
      {subMatch2}
    </>
  );
}

function matchReducer(match, action) {
  switch (action.type) {
    case 'fetched': {
      let fetchedMatch = (
          {
            id: action.match.id,
            user1_id: action.match.user1_id,
            user2_id: action.match.user2_id,
            winner_id: action.match.winner_id,
            previous_match_1: action.match.previous_match_1,
            previous_match_2: action.match.previous_match_2,
            user1_name: action.match.user1.name,
            user2_name: action.match.user2.name,
            user1_email: action.match.user1.email,
            user2_email: action.match.user2.email,
          }
        )
      return [...fetchedMatch];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}