import React from "react";
import { CircuitProvider } from "../providers/circuit";
import { NavBar } from "../routes/home";
import CircuitDetails from "./circuit/circuitDetails";

export default function Circuit(){
  return (
    <CircuitProvider>
      <head>
        <title>Circuit details</title>
      </head>
      <NavBar />
      <main>
        <CircuitDetails />
      </main>
    </CircuitProvider>
  );
}



