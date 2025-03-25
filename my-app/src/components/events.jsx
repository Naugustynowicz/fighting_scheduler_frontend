import React from "react";
import { EventsProvider } from "../providers/events";
import { NavBar } from "../routes/home";
import AddEvent from "./events/addEvent";
import EventList from "./events/eventList";


export default function Events(){
  return (
      <EventsProvider>
        <NavBar />
        <main>
          <h1>Events</h1>
          <AddEvent />
          <EventList />
        </main>
      </EventsProvider>
  );
}



