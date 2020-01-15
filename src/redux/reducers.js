import { CLICK, WIN } from "./action-types";
import { combineReducers } from "redux";

const intialState = {
  squares: Array(9).fill(null),
  isXNext: true,
  isWin: false
};

const board = (state = intialState, action) => {
  switch (action.type) {
    case CLICK:
      return {
        ...state,
        isXNext: !state.isXNext,
        squares: action.data
      };
    case WIN:
      return {
        ...state,
        isWin: true
      };

    default:
      return state;
  }
};

export default combineReducers({
  board
});
