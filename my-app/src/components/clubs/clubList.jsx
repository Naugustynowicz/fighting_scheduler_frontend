import React from 'react';
import { useClubs } from '../../providers/clubs';

export default function ClubList() {
  const clubs = useClubs();

  return (
    <div title='List of Clubs'>
      <h2>List of Clubs</h2>
      <ul>
        {clubs.map(club => (
          <li key={club.id}>
            <Club club={club} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Club({ club }) {
  let clubContent;
  clubContent = (
      <div>
        <p>{club.startDate}</p>
        <p>{club.endDate}</p>
        <p>{club.attendeesNb}</p>
        <p>{club.venueFee}</p>
        <p>{club.requiredScore}</p>
        <div><a href={'/club/' + club.id}><h3>{club.name}</h3></a></div>
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
    );

  return (
    <div class='club'>
      {clubContent}
    </div>
  );
}