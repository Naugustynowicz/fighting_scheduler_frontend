import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

let initialTreeBracket = []

export default function TreeBracket({event_id}) {
  const [treeBracket, dispatch] = useReducer(treeBracketReducer, initialTreeBracket);
  // let event_id = event_id;

  useEffect(() => {
    let ignore = false;
    axios.get(`http://localhost:3000/events/${event_id}/display_tree_bracket`)
    .then(res => {
      if(!ignore){
        dispatch({type: 'fetched', treeBracket: res.data})
      }
    })
    return () => ignore = true;
  }, [event_id])

  function displayTree(tree){
    if(!tree) return;
    let displayedId = (
      <>
        <h3>id: {tree['id']}</h3>
      </>
    )
    let displayedWinner = (<></>)
    if('winner_id' in tree){
      displayedWinner = (
        <>
          <p><em>winner_id: {tree['winner_id']}</em></p>
          <button onClick={() => { dispatch({ type: 'updateMatch', match_id: tree['id'] }); }}>
            update match
          </button>
        </>
      )
    }
    let displayedUser1 = (<></>)
    if('user1_id' in tree){
      displayedUser1 = (
        <>
          <p>user1_id: {tree['user1_id']}</p>
          <p>user1_name: {tree['user1_name']}</p>
          <p>user1_email: {tree['user1_email']}</p>
          <button onClick={() => { dispatch({ type: 'setWinner', match_id: tree['id'], winning_user_id: tree['user1_id'] }); }}> 
            Set as winner 
          </button>
        </>
      )
    }
    let displayedUser2 = (<></>)
    if('user2_id' in tree){
      displayedUser2 = (
        <>
          <p>user2_id: {tree['user2_id']}</p>
          <p>user2_name: {tree['user2_name']}</p>
          <p>user2_email: {tree['user2_email']}</p>
          <button onClick={() => { dispatch({ type: 'setWinner', match_id: tree['id'], winning_user_id: tree['user2_id'] }); }}> 
            Set as winner 
          </button>
        </>
      )
    }
    let displayedSubmatch1 = (<></>)
    if('submatch1' in tree){
      displayedSubmatch1 = displayTree(tree.submatch1)
    }
    let displayedSubmatch2 = (<></>)
    if('submatch2' in tree){
      displayedSubmatch2 = displayTree(tree.submatch2)
    }
  
    return(
      <div className='grid grid-cols-2'>
        <div className='grid grid-rows-2 place-content-center'>
          <div className='place-content-center'>
          {displayedUser1}
          {displayedSubmatch1}
          </div>
          <div className='place-content-center'>
          {displayedUser2}
          {displayedSubmatch2}
          </div>
        </div>
        <div className='place-content-center'>
          {displayedId}
          {displayedWinner}
        </div>
      </div>
    )
  }

  return (
    <div className='overflow-scroll'> 
      <h3>Bracket</h3>
      {displayTree(treeBracket)}
      <button onClick={() => { dispatch({ type: 'generateTreeBracket', event_id: event_id }); }}>
        generate bracket
      </button> 
    </div>
  );
}

function buildFetchedTree(fetchedTree){
  let buildedFetchedTree = {
    id: fetchedTree.match.id,
  }
  if('winner_id' in fetchedTree.match){
    buildedFetchedTree = {
      ...buildedFetchedTree,
      winner_id: fetchedTree.match.winner_id
    }
  }
  if('user1' in fetchedTree && fetchedTree.user1 !== null){
    buildedFetchedTree = {
      ...buildedFetchedTree,
      user1_id: fetchedTree.match.user1_id,
      user1_name: fetchedTree.user1.name,
      user1_email: fetchedTree.user1.email,
    }
  }
  if('user2' in fetchedTree && fetchedTree.user2 !== null){
    buildedFetchedTree = {
      ...buildedFetchedTree,
      user2_name: fetchedTree.user2.name,
      user2_email: fetchedTree.user2.email,
      user2_id: fetchedTree.match.user2_id,
    }
  }
  if('submatch1' in fetchedTree){
    buildedFetchedTree = {
      ...buildedFetchedTree,
      submatch1: buildFetchedTree(fetchedTree.submatch1) 
    }
  }
  if('submatch2' in fetchedTree){
    buildedFetchedTree = {
      ...buildedFetchedTree,
      submatch2: buildFetchedTree(fetchedTree.submatch2) 
    }
  }

  return buildedFetchedTree;
}

function treeBracketReducer(treeBracket, action) {
  switch (action.type) {
    case 'fetched': {
      let generatedTreeBracket = buildFetchedTree(action.treeBracket)
      return generatedTreeBracket;
    }
    case 'generateTreeBracket': {
      axios.get(`http://localhost:3000/events/${action.event_id}/generate_tree_bracket`)
      return;
    }
    case 'setWinner': {
      axios.patch(`http://localhost:3000/matches/${action.match_id}/determine_winner`, { 
        match: {
          winner: action.winning_user_id
        }
      });
      return;
    }
    case 'updateMatch': {
      axios.get(`http://localhost:3000/matches/${action.match_id}/update_match`)
      return;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}