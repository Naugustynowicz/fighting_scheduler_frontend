import React from "react";
import { ClubProvider } from "../providers/club";
import { NavBar } from "../routes/home";
import ClubDetails from "./club/clubDetails";

export default function Club(){
  return (
    <ClubProvider>
      <head>
        <title>Club details</title>
      </head>
      <NavBar />
      <main>
        <ClubDetails />
      </main>
    </ClubProvider>
  );
}



