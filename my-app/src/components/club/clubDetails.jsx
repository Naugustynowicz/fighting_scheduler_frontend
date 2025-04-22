import React, { useState } from "react";
import { useClub, useClubDispatch } from "../../providers/club";
import EditClub from "../clubs/clubList/editClub";
import ListEventsClub from "./listEventsClub";
import Trainees from "./trainees";

export default function ClubDetails(){
  const context = useClub();
  const dispatch = useClubDispatch();
  const [menu, setMenu] = useState('');
  
  const buttonBar = (
    <div>
      <button onClick={ () => {
        menu === 'edit' ? setMenu('') : setMenu('edit')
      }}>Edit</button>
      <button onClick={() => dispatch(
          { type: 'deleted', id: event.id }
      )}>Delete</button>
    </div>
  )

  let editClub;
    if(menu === 'edit'){
      editClub = (
        <EditClub club={context.club} />
      )
    } else {
      editClub = (
        <div>
        <p>{context.club.id}</p>
        <p>{context.club.startDate}</p>
        <p>{context.club.endDate}</p>
        <p>{context.club.attendeesNb}</p>
        <p>{context.club.venueFee}</p>
        <p>{context.club.requiredScore}</p>
        <h3>{context.club.name}</h3>
        <p>{context.club.description}</p>
        <p>{context.club.rules}</p>
        <p>{context.club.schedule}</p>
        <p>{context.club.brackets}</p>
        <p>{context.club.userId}</p>
        <p>{context.club.statusId}</p>
        <p>{context.club.locationId}</p>
        <p>{context.club.sportId}</p>
        <p>{context.club.typeClubId}</p>
      </div>
      )
    }

  return (
    <div>
      <h1>Club details</h1>
      {buttonBar}
      {editClub}
      <ListEventsClub context={context} />
      <Trainees club_id={context.club.id} />
      {buttonBar}
    </div>
  );
}