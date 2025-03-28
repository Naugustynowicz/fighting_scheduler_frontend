import React from "react";
import { SportsProvider } from "../providers/sports";
import { NavBar } from "../routes/home";
import AddSport from "./sports/addSport";
import SportList from "./sports/sportList";


export default function Sports(){
  return (
      <SportsProvider>
        <head>
          <title>Sports</title>
        </head>
        <NavBar />
        <main>
          <h1>Sports</h1>
          <AddSport />
          <SportList />
        </main>
      </SportsProvider>
  );
}



