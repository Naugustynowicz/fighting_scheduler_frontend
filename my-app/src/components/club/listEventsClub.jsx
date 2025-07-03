import axios from 'axios';
import React, { useReducer, useState } from 'react';
import ChoseEvent from './choseEvent';

let initEvents = []

export default function ListEventsClub({context}){
  const [trainingMenu, setTrainingMenu] = useState('');

  let eventList;
  if(trainingMenu === 'edit'){
    eventList = (<ChoseEvent club_id={context.club.id} />)
  } else {
    eventList = (
      <ul>
        {context.events.map(event => (
          <li key={event.id}>
            <Event event={event} club_id={context.club.id} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div title='List of Events'>
      <h2>List of Events</h2>
      <button onClick={()=> trainingMenu === 'edit' ? setTrainingMenu('') : setTrainingMenu('edit')}>
        Add training
      </button>
      {eventList}
    </div>
  );
}

function Event({ event, club_id }) {
  const [events, dispatch] = useReducer(eventsReducer, initEvents);

  async function removeEvent(club_id, event_id){
    await axios.patch(`http://localhost:3000/clubs/${club_id}/remove_training`,
      {
        club: {
          event_id: event_id
        }
      }
    ).then(res => {
      dispatch({type: "remove_event", event: res.data})
    })
  }
  
  let eventContent;
  eventContent = (
      <div>
        <p>{event.startDate}</p>
        <p>{event.endDate}</p>
        <p>{event.attendeesNb}</p>
        <p>{event.venueFee}</p>
        <p>{event.requiredScore}</p>
        <div><a href={'/event/' + event.id}><h3>{event.name}</h3></a></div>
        <p>{event.description}</p>
        <p>{event.rules}</p>
        <p>{event.schedule}</p>
        <p>{event.brackets}</p>
        <p>{event.userId}</p>
        <p>{event.statusId}</p>
        <p>{event.locationId}</p>
        <p>{event.sportId}</p>
        <p>{event.typeEventId}</p>
        <button onClick={() => { 
          removeEvent(club_id, event.id)
        }}>
          Remove from club
        </button>
      </div>
    );

  return (
    <div class='event'>
      {eventContent}
    </div>
  );
}

function eventsReducer(events, action) {
  switch (action.type) {
    case 'remove_event': {
      const removedEvent = {
        id: action.event.id,
        startDate: action.event.start_date,
        endDate: action.event.end_date,
        attendeesNb: action.event.attendees_nb,
        venueFee: action.event.venue_fee,
        requiredScore: action.event.required_score,
        name: action.event.name,
        description: action.event.description,
        rules: action.event.rules,
        schedule: action.event.schedule,
        bracket: action.event.bracket,
        userId: action.event.user_id,
        statusId: action.event.status_id,
        locationId: action.event.location_id,
        sportId: action.event.sport_id,
        typeEventId: action.event.typeEvent_id
      }

      return events.filter(event => event.id === removedEvent.id);
    } 
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

