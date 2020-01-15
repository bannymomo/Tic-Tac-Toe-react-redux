import React from "react";
import { connect } from "react-redux";
import Square from "./Square";
import calculateWinner from "./utils/calculateWinner";
import { clickAction, gameWin } from "./redux/actions";

class Board extends React.Component {
  handleClick = i => {
    const squares = [...this.props.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.props.isXNext ? "X" : "O";
    this.props.clickAction(squares);

    if (calculateWinner(squares)) {
      this.props.gameWin();
    }
  };

  renderSquare = index => {
    return (
      <Square
        handleClick={this.props.isWin ? null : () => this.handleClick(index)}
        content={this.props.squares[index]}
      />
    );
  };

  componentDidUpdate() {
    if (this.props.isWin) {
      setTimeout(() => {
        alert(`Winner is ${this.props.isXNext ? "O" : "X"}`);
      }, 200);
    }
  }

  render() {
    const status = this.props.isWin
      ? `Winner is ${this.props.isXNext ? "O" : "X"}`
      : `Next Player :${this.props.isXNext ? "X" : "O"}`;
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
const mapStateToProps = state => ({
  isXNext: state.board.isXNext,
  squares: state.board.squares,
  isWin: state.board.isWin
});

const mapDispatchToProps = dispatch => ({
  gameWin: () => dispatch(gameWin()),
  clickAction: squares => dispatch(clickAction(squares))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
