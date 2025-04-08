import React from "react";
import { useClub, useClubDispatch } from "../../providers/club";
import EditClub from "../clubs/clubList/editClub";

export default function ClubDetails(){
  const club = useClub();
  const dispatch = useClubDispatch();

  return (
    <div>
      <h1>Club details</h1>
      <div>
        <p>{club.id}</p>
        <p>{club.startDate}</p>
        <p>{club.endDate}</p>
        <p>{club.attendeesNb}</p>
        <p>{club.venueFee}</p>
        <p>{club.requiredScore}</p>
        <h3>{club.name}</h3>
        <p>{club.description}</p>
        <p>{club.rules}</p>
        <p>{club.schedule}</p>
        <p>{club.brackets}</p>
        <p>{club.userId}</p>
        <p>{club.statusId}</p>
        <p>{club.locationId}</p>
        <p>{club.sportId}</p>
        <p>{club.typeClubId}</p>
      </div>
      <EditClub club={club} />
      <div class='button'>
        <button onClick={() => dispatch(
          { type: 'deleted', id: club.id }
        )}>
          Delete
        </button>
      </div>
    </div>
  );
}