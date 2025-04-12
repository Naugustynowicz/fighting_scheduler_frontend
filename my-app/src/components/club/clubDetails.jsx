import React from "react";
import { useClub, useClubDispatch } from "../../providers/club";
import EditClub from "../clubs/clubList/editClub";
import ChoseEvent from "./choseEvent";
import ListEventsClub from "./listEventsClub";

export default function ClubDetails(){
  const context = useClub();
  const dispatch = useClubDispatch();

  return (
    <div>
      <h1>Club details</h1>
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
      <EditClub club={context.club} />
      <ListEventsClub context={context} />
      <ChoseEvent club_id={context.club.id} />
      <div class='button'>
        <button onClick={() => dispatch(
          { type: 'deleted', id: context.club.id }
        )}>
          Delete
        </button>
      </div>
    </div>
  );
}