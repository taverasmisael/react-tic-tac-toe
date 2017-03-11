import React, { Component } from "react";

import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import "./Game.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.InitialState = {
      PLAYER_TWO_SYMBOL: "O",
      PLAYER_ONE_SYMBOL: "X",
      currentTurn: "X",
      board: ["", "", "", "", "", "", "", "", ""],
      modified: false,
      winningOffset: 0,
      winner: []
    };

    this.state = this.InitialState;
  }

  render() {
    return (
      <div className="Game">
        <GameBoard
          board={this.state.board}
          winner={this.state.winner}
          onSelectSquare={square => this.setValue(square)}
        />
        <GameStatus
          currentPlayer={this.state.currentTurn}
          onResetGame={() => this.setState(this.InitialState)}
        />
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isWinner = this.checkForWinner(nextState.board);
    const shouldUpdate = !(isWinner && this.state.winningOffset);
    if (isWinner && this.state.winningOffset === 0) this.setState({winningOffset: 1});
    return shouldUpdate;
  }

  setValue(square) {
    this.setState(this.UpdateGameStatus(square));
  }

  UpdateGameStatus(squareIndex) {
    let newState = {};

    newState.board = this.state.board.map((square, index) => {
      const currentSquareAvailable = index === squareIndex && square === "";
      if (currentSquareAvailable) {
        newState.modified = true;
        newState.currentTurn = this.SwitchPlayers(this.state.currentTurn);
        return this.state.currentTurn;
      } else {
        newState.modified = false;
        return square;
      }
    });

    newState.winner = this.checkForWinner(newState.board) || [];
    if (newState.winner.length)
      newState.currentTurn = this.SwitchPlayers(newState.currentTurn);
    return newState;
  }

  checkForWinner(board) {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombos.find(combo => {
      if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
        return board[combo[0]];
      } else {
        return false;
      }
    });
  }

  SwitchPlayers(currentTurn) {
    const PlayerOneIsPlaying = currentTurn === this.state.PLAYER_ONE_SYMBOL;
    const { PLAYER_TWO_SYMBOL, PLAYER_ONE_SYMBOL } = this.state;

    return PlayerOneIsPlaying ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL;
  }
}
