import React from "react";
import { ClubsProvider } from "../providers/clubs";
import { NavBar } from "../routes/home";
import AddClub from "./clubs/addClub";
import ClubList from "./clubs/clubList";


export default function Clubs(){
  return (
      <ClubsProvider>
        <head>
          <title>Clubs</title>
        </head>
        <NavBar />
        <main>
          <h1>Clubs</h1>
          <AddClub />
          <ClubList />
        </main>
      </ClubsProvider>
  );
}



