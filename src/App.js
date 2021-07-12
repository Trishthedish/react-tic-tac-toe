import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = '🦶';
const PLAYER_2 = '📌';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState('');
  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const updateSquare = (updatedSquare) => {
    const newSquares = [...squares]

    for (let row of newSquares) {
      for (let square of row) {
        if (square.id === updatedSquare.id && square.value === '') {
          square.value = player;
        }
      }
    };
    setPlayer(player === PLAYER_1 ? PLAYER_2 : PLAYER_1)
    setSquares(newSquares);
    setWinner(checkForWinner());
  }

  const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.

    // check vertically
    for (let i = 0; i < 3; i++) {
      if (squares[0][i].value === squares[1][i].value &&
        squares[1][i].value === squares[2][i].value &&
        squares[0][i].value !== '') {
          return squares[0][i].value
        }
    }
    // check horizontally
    for (let i = 0; i < 3; i++) {
      if (squares[i][0].value === squares[i][1].value &&
        squares[i][1].value === squares[i][2].value &&
        squares[i][0].value !== '') {
          return squares[i][0].value
        }
    }
    // check diagonally
    if (squares[0][0].value === squares[1][1].value &&
      squares[1][1].value === squares[2][2].value &&
      squares[0][0].value !== '') {
        return squares[0][0].value
    }
    if (squares[0][2].value === squares[1][1].value &&
      squares[1][1].value === squares[2][0].value &&
      squares[0][2].value !== '') {
        return squares[0][2].value
      }
      return null;
  }

  const printWinner = () => {
    if (winner == null) {
      return `Current Player: ${player}`
    }
    if (winner === PLAYER_1 || winner === PLAYER_2) {
      return (`Winner is ${winner}`)
    }
  }

  const resetGame = () => {
    // Complete in Wave 4
    const emptyBoard = generateSquares();
    setSquares(emptyBoard);
    setPlayer(PLAYER_1)
    setWinner('')
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{printWinner()} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquare} />
      </main>
    </div>
  );
}

export default App;
