import React from "react";
import "./App.css";
import Board from "./Board";

function App(props) {
  return <Board store={props.store} />;
}

export default App;
