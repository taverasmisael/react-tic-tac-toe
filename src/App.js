import React, { Component } from 'react';

import {
  Board,
  CheckForWinner,
  MakeMove,
  PlayAI,
  PLAYER_ONE_SYMBOL,
  PLAYER_TWO_SYMBOL,
  RemainingMoves,
  SwitchPlayers,
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
          onSelectSquare={square => this.MakeMove(this.state, square, this.state.currentTurn)}
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
    document.addEventListener('keyup', this.onKeyUp.bind(this))

  }

  componentWillUpdate(props, state, anys) {
    if (eq(state.currentTurn, PLAYER_TWO_SYMBOL)) {
      this.MakeAIMove(state);
    }
  }

  InitGame(player) {
    this.setState(
      Object.assign({}, this.InitialState, { currentTurn: player })
    );
  }

  ResetGame() {
    this.setState(this.InitialState);
  }

  onKeyUp({ keyCode }) {
    if (keyCode === 27 && this.state.aboutVisible) this.setState({aboutVisible: false})
  }

  MakeMove(state, square, player) {
    if (!state.winner) this.setState(this.UpdateGameStatus(state, square, player));
  }

  UpdateGameStatus(state, squareIndex, player) {
    let newState = {};

    newState.board = MakeMove(
      state.board,
      squareIndex,
      player
    );

    if (eq(newState.board, state.board))
      return {};
    else {
      const isWinner = CheckForWinner(newState.board);
      if (CheckForWinner(newState.board)) {
        newState.winner = isWinner;
        this.PlayFx('applause.mp3');
      } else if (RemainingMoves(newState.board)) {
        this.PlayPopEffect(player);
        newState.currentTurn = SwitchPlayers(player);
      } else {
        this.PlayFx('jeer.mp3');
      }
    }

    return newState;
  }

  MakeAIMove(game) {
    const nextMove = PlayAI(game.board, 2, game.currentTurn);
    this.MakeMove(game, nextMove, game.currentTurn)
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
