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

    this.PopAudio = undefined;

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
          winner={Boolean(this.state.winner.length)}
          currentPlayer={this.state.currentTurn}
          onResetGame={() => this.setState(this.InitialState)}
        />
        <audio id="PopAudio" src="assets/Bubble_Pop.org.mp3" type="audio/mp3">
        </audio>
      </div>
    );
  }
  componentDidMount() {
    this.PopAudio = document.querySelector('#PopAudio');
  }

  setValue(square) {
    if (!this.state.winner.length) this.setState(this.UpdateGameStatus(square));
  }

  UpdateGameStatus(squareIndex) {
    let newState = {};

    newState.board = this.state.board.map((square, index) => {
      const currentSquareAvailable = index === squareIndex && square === "";
      if (currentSquareAvailable) {
        newState.modified = true;
        newState.currentTurn = this.SwitchPlayers(this.state.currentTurn);
        this.PlayPopEffect();
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

/**
 * This function checks if any `winningCombo` is present in the board passed as parameter
 * @param {Array} board
 */
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

  /**
   * This function will switch between returning the oposite player for the one passed
   * @param {String} currentTurn
   */
  SwitchPlayers(currentTurn) {
    const PlayerOneIsPlaying = currentTurn === this.state.PLAYER_ONE_SYMBOL;
    const { PLAYER_TWO_SYMBOL, PLAYER_ONE_SYMBOL } = this.state;

    return PlayerOneIsPlaying ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL;
  }

  PlayPopEffect() {
    this.PopAudio.currentTime = 0;
    this.PopAudio.play();
  }
}
