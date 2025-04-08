import React from "react";
import { CircuitsProvider } from "../providers/circuits";
import { NavBar } from "../routes/home";
import AddCircuit from "./circuits/addCircuit";
import CircuitList from "./circuits/circuitList";


export default function Circuits(){
  return (
      <CircuitsProvider>
        <head>
          <title>Circuits</title>
        </head>
        <NavBar />
        <main>
          <h1>Circuits</h1>
          <AddCircuit />
          <CircuitList />
        </main>
      </CircuitsProvider>
  );
}



