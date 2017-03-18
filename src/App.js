import React, { Component } from 'react';

import {
  Board,
  MakeMove,
  SwitchPlayers,
  PLAYER_ONE_SYMBOL,
  PLAYER_TWO_SYMBOL,
  RemainingMoves,
  CheckForWinner
} from './functionality/tictactoe';

import { eq } from './functionality/helpers';

import Game from './components/Game';
import FxPlayer from './components/FxPlayer';

import AboutModal from './components/AboutModal';
import FAB from './components/FAB';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.InitialState = {
      PLAYER_ONE_SYMBOL,
      PLAYER_TWO_SYMBOL,
      currentTurn: 'X',
      board: new Board(),
      aboutVisible: false,
      winner: undefined,
      FX: {
        currentFX: 'pop1.mp3'
      }
    };

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
          onResetGame={() => this.ResetGame()}
        />
        <FAB
          text="?"
          title="Ayuda"
          onClick={() => this.setState({ aboutVisible: true })}
        />
        <FxPlayer mediaSrc={this.state.FX.currentFX} mediaType="mp3" />
        <AboutModal
          isVisible={this.state.aboutVisible}
          onClose={() => this.setState({ aboutVisible: false })}
        />
      </div>
    );
  }

  componentDidMount() {
    this.FXPlayer = document.querySelector('#FXPlayer');
  }

  InitGame(player) {
    this.setState(
      Object.assign({}, this.InitialState, { currentTurn: player })
    );
  }

  ResetGame() {
    this.setState(this.InitialState);
  }

  MakeMovement(square) {
    if (!this.state.winner) this.setState(this.UpdateGameStatus(square));
  }

  UpdateGameStatus(squareIndex) {
    let newState = {};

    newState.board = MakeMove(
      this.state.board,
      squareIndex,
      this.state.currentTurn
    );

    if (eq(newState.board, this.state.board))
      return {};
    else {
      const isWinner = CheckForWinner(newState.board);
      if (CheckForWinner(newState.board)) {
        newState.winner = isWinner;
        this.PlayFx('applause.mp3');
      } else if (RemainingMoves(newState.board)) {
        this.PlayPopEffect(this.state.currentTurn);
        newState.currentTurn = SwitchPlayers(this.state.currentTurn);
      } else {
        this.PlayFx('jeer.mp3');
      }
    }

    return newState;
  }

  PlayPopEffect(player) {
    if (player === this.state.PLAYER_ONE_SYMBOL) this.PlayFx('pop2.mp3');
    if (player === this.state.PLAYER_TWO_SYMBOL) this.PlayFx('pop1.mp3');
  }

  PlayFx(currentFX) {
    this.FXPlayer.currentTime = 0;
    this.setState({ FX: { currentFX } }, () => this.FXPlayer.play());
  }
}
