import React from "react";
import { EventProvider } from "../providers/event";
import { NavBar } from "../routes/home";
import EventDetails from "./event/eventDetails";

export default function Event(){
  return (
    <EventProvider>
      <head>
        <title>Event details</title>
      </head>
      <NavBar />
      <main>
        <EventDetails />
      </main>
    </EventProvider>
  );
}



