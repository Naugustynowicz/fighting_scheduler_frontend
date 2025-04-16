import React from "react";
import { useEvent, useEventDispatch } from "../../providers/event";
import Attendees from "../events/eventList/attendees";
import EditEvent from "../events/eventList/editEvent";
import TreeBracket from "../events/eventList/treeBracket";

export default function EventDetails(){
  const event = useEvent();
  const dispatch = useEventDispatch();

  return (
    <div title='Event details'>
      <h1>Event details</h1>
      <div>
        <p>{event.id}</p>
        <p>{event.startDate}</p>
        <p>{event.endDate}</p>
        <p>{event.attendeesNb}</p>
        <p>{event.venueFee}</p>
        <p>{event.requiredScore}</p>
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p>{event.rules}</p>
        <p>{event.schedule}</p>
        <p>{event.brackets}</p>
        <p>{event.userId}</p>
        <p>{event.statusId}</p>
        <p>{event.locationId}</p>
        <p>{event.sportId}</p>
        <p>{event.typeEventId}</p>
      </div>
      <EditEvent event={event} />
      <Attendees event_id={event.id} />
      <TreeBracket event_id={event.id} />
      <div class='button'>
        <button onClick={() => { 
          dispatch({ type: 'subscribed', id: event.id })
        }}>
          Subscribe
        </button>
        <button onClick={() => dispatch(
          { type: 'deleted', id: event.id }
        )}>
          Delete
        </button>
      </div>
    </div>
  );
}