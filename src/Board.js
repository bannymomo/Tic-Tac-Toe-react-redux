import React from "react";
import Square from "./Square";
import calculateWinner from "./utils/calculateWinner";
import { clickAction, gameWin } from "./redux/actions";

class Board extends React.Component {
  handleClick = i => {
    const squares = [...this.props.store.getState().squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.props.store.getState().isXNext ? "X" : "O";
    this.props.store.dispatch(clickAction(squares));

    if (calculateWinner(squares)) {
      this.props.store.dispatch(gameWin());
    }
  };

  renderSquare = index => {
    return (
      <Square
        handleClick={
          this.props.store.getState().isWin
            ? null
            : () => this.handleClick(index)
        }
        content={this.props.store.getState().squares[index]}
      />
    );
  };

  componentDidUpdate() {
    if (this.props.store.getState().isWin) {
      setTimeout(() => {
        alert(`Winner is ${this.props.store.getState().isXNext ? "O" : "X"}`);
      }, 200);
    }
  }

  render() {
    const status = this.props.store.getState().isWin
      ? `Winner is ${this.props.store.getState().isXNext ? "O" : "X"}`
      : `Next Player :${this.props.store.getState().isXNext ? "X" : "O"}`;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
