import React from "react";
import Square from "./Square";
import calculateWinner from "./utils/calculateWinner";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      isXNext: true,
      isWin: false
    };
  }

  handleClick = i => {
    const squares = [...this.state.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isXNext ? "X" : "O";
    this.setState(state => ({ isXNext: !state.isXNext, squares }));
    if (calculateWinner(squares)) {
      this.setState(() => ({ isWin: true }));
    }
  };

  renderSquare = index => {
    return (
      <Square
        handleClick={this.state.isWin ? null : () => this.handleClick(index)}
        content={this.state.squares[index]}
      />
    );
  };

  componentDidUpdate() {
    if (this.state.isWin) {
      setTimeout(() => {
        alert(`${this.state.isXNext ? "O" : "X"}`);
      }, 200);
    }
  }

  render() {
    const status = this.state.isWin
      ? `Winner is ${this.state.isXNext ? "O" : "X"}`
      : `Next Player :${this.state.isXNext ? "X" : "O"}`;
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
