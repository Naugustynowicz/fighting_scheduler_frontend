import React, { useState } from "react";
import { useEvent, useEventDispatch } from "../../providers/event";
import Attendees from "../events/eventList/attendees";
import EditEvent from "../events/eventList/editEvent";
import TreeBracket from "../events/eventList/treeBracket";

export default function EventDetails(){
  const event = useEvent();
  const dispatch = useEventDispatch();
  const [menu, setMenu] = useState('');

  const buttonBar = (
    <div>
      <button onClick={() => { 
          dispatch({ type: 'subscribed', id: event.id })
      }}>Subscribe</button>
      <button onClick={ () => {
        menu === 'edit' ? setMenu('') : setMenu('edit')
      }}>Edit</button>
      <button onClick={() => dispatch(
          { type: 'deleted', id: event.id }
      )}>Delete</button>
    </div>
  )

  let editEvent;
  if(menu === 'edit'){
    editEvent = (
      <EditEvent event={event} />
    )
  } else {
    editEvent = (
      <div>
        <h3>{event.name}</h3>
        <p>From {event.startDate} to {event.endDate}</p>

        <p>{event.description}</p>
        <p>{event.rules}</p>
        <p>{event.schedule}</p>

        <p>{event.attendeesNb}</p>
        <p>{event.venueFee}</p>
        <p>{event.requiredScore}</p>
        
        <p>{event.locationId}</p>
        <p>{event.sportId}</p>
        <p>{event.typeEventId}</p>
      </div>
    )
  }



  return (
    <div title='Event details'>
      <h1>Event details</h1>
      {buttonBar}
      {editEvent}
      <Attendees event_id={event.id} />
      <TreeBracket event_id={event.id} />
      {buttonBar}
    </div>
  );
}