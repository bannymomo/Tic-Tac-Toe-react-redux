import React from "react";

function Square(props) {
  return (
    <button onClick={props.handleClick} className="square">
      {props.content}
    </button>
  );
}

export default Square;
