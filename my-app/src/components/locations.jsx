import React from "react";
import { LocationsProvider } from "../providers/locations";
import { NavBar } from "../routes/home";
import AddLocation from "./locations/addLocation";
import LocationList from "./locations/locationList";


export default function Locations(){
  return (
      <LocationsProvider>
        <head>
          <title>Locations</title>
        </head>
        <NavBar />
        <main>
          <h1>Locations</h1>
          <AddLocation />
          <LocationList />
        </main>
      </LocationsProvider>
  );
}



