import React, { Key, useReducer } from "react";
import Board from "./Board";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "JUMP":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
      };

    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
        }),
        xIsNext: !state.xIsNext,
      };
    default:
      return state;
  }
};

const calculateWinner = (squares: any[]) => {
  const winnerLines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isDraw = true;
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }
  if (isDraw) return 'D';
  return null;
};


export default function Game():JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });

  const { xIsNext, history } = state;

  const jumpTo = (step: any) => {
    dispatch({ type: "JUMP", payload: { step } });
  };

  const handleClick = (i: string | number) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    dispatch({ type: "MOVE", payload: { squares } });
  };

  const current: any = history[history.length - 1];
  const winner: any = calculateWinner(current.squares);

  const status: string = winner
    ? winner === "D"
      ? "Draw"
      : "Winner is " + winner
    : "Next player is " + (xIsNext ? "X" : "O");

    const moves:any = history.map((step: any, move: Key | null | undefined) => {
      const desc: string = move ? 'Go to #' + move : 'Start the Game';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className={winner ? "game disabled" : "game"}>
      <div className="game-board">
        <Board
          onClick={(i: string | number) => handleClick(i)}
          squares={current.squares}
        ></Board>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
};



