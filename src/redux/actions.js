import { CLICK, WIN } from "./action-types";

export const clickAction = squares => ({ type: CLICK, data: squares });

export const gameWin = () => ({ type: WIN });
