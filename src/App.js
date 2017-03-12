import React, { Component } from "react";

import Game from "./components/Game";
import GamePlayerSelect from "./components/GamePlayerSelect";

const AUDIOFX_SRC = 'assets/audio/fx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.InitialState = {
      PLAYER_TWO_SYMBOL: "O",
      PLAYER_ONE_SYMBOL: "X",
      currentTurn: "",
      board: ["", "", "", "", "", "", "", "", ""],
      modified: false,
      winningOffset: 0,
      winner: undefined
    };

    this.FXPlayer = undefined;

    this.state = this.InitialState;
  }

  render() {
    return (
      <div className="App">
        <Game
          winner={this.state.winner}
          board={this.state.board}
          currentTurn={this.state.currentTurn}
          onSelectSquare={square => this.MakeMovement(square)}
          onResetGame={() => this.setState(this.InitialState)}
        />
        <GamePlayerSelect
          isVisible={!Boolean(this.state.currentTurn)}
          onPlayerSelect={player => this.setState({ currentTurn: player })}
        />
        <audio id="FXPlayer" src="assets/audio/fx/pop1.mp3" type="audio/mp3" />
      </div>
    );
  }

  componentDidMount() {
    this.FXPlayer = document.querySelector("#FXPlayer");
  }

  MakeMovement(square) {
    if (!this.state.winner) this.setState(this.UpdateGameStatus(square));
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

    newState.winner = this.CheckForWinner(newState.board);
    if (newState.winner) {
      newState.currentTurn = this.SwitchPlayers(newState.currentTurn);
      this.PlayWiningEffect();
    } else {
      this.PlayPopEffect(newState.currentTurn);
    }
    return newState;
  }

  /**
 * This function checks if any `winningCombo` is present in the board passed as parameter
 * @param {Array} board
 */
  CheckForWinner(board) {
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
      if (
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
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

  PlayPopEffect(player) {
    if (player === this.state.PLAYER_ONE_SYMBOL) this.FXPlayer.src = `${AUDIOFX_SRC}/pop2.mp3`;
    if (player === this.state.PLAYER_TWO_SYMBOL) this.FXPlayer.src = `${AUDIOFX_SRC}/pop1.mp3`;
    this.PlayFx();
  }

  PlayFx() {
    this.FXPlayer.currentTime = 0;
    this.FXPlayer.play();
  }

  PlayWiningEffect() {
    this.FXPlayer.src = `${AUDIOFX_SRC}/applause.mp3`;
    this.PlayFx();
  }
}
