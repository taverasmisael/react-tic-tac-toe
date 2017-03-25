import React, { Component } from 'react';

import './App.css';

import {
  GameState,
  CheckForWinner,
  MakeMove,
  PlayAI,
  RemainingMoves,
  SwitchPlayers
} from './functionality/tictactoe';

import { eq, dynamicClass } from './functionality/helpers';

import Game from './components/Game';
import GameConfigBar from './components/GameConfigBar';
import FxPlayer from './components/FxPlayer';

import AboutModal from './components/AboutModal';
import FAB from './components/FAB';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.InitialState = new GameState({
      headerVisible: false,
      aboutVisible: false,
      BGColor: '',
      FX: {
        currentFX: 'pop1.mp3'
      }
    })

    this.state = this.InitialState;
  }

  render() {
    return (
      <div className={`App ${this.state.BGColor}`}>
        <button onClick={() => this.toggleHeader()} type="button" className={dynamicClass('hamburger-menu', ['hamburger-menu--open'], this.state.headerVisible )} >
          <span className="hamburger-menu__line" />
          <span className="hamburger-menu__line" />
          <span className="hamburger-menu__line" />
        </button>
        <GameConfigBar
          isVisible={this.state.headerVisible}
          winner={Boolean(this.state.winner)}
          currentPlayer={this.state.currentTurn}
          onSetVolume={amount => this.onSetVolume(amount)}
          onResetGame={() => this.ResetGame()}
          onChangeColor={color => this.onChangeColor(color)}
        />
        <Game
          winner={this.state.winner}
          board={this.state.board}
          onSelectSquare={square =>
            this.MakeMove(this.state, square, this.state.currentTurn)}
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

  componentWillUpdate(props, state, anys) {
    if (eq(state.currentTurn, this.state.PLAYER_TWO_SYMBOL)) {
      this.MakeAIMove(state);
    }
  }

  InitGame(player) {
    this.setState(
      Object.assign({}, this.InitialState, { currentTurn: player })
    );
  }

  ResetGame() {
    this.setState(
      Object.assign({}, this.InitialState, { BGColor: this.state.BGColor })
    );
  }
  generateMenuClases() {
    const baseClase = 'hamburger-menu';
    return  `${baseClase} ${this.state.headerVisible ? 'hamburger-menu--open' : ''}`;
  }
  onSetVolume(amount) {
    this.FXPlayer.volume = amount;
  }

  onChangeColor(color) {
    this.setState({
      BGColor: color ? `App--bg-${color}` : ''
    });
  }

  toggleHeader() {
    this.setState({
      headerVisible: !this.state.headerVisible
    })
  }

  MakeMove(state, square, player) {
    if (!state.winner)
      this.setState(this.UpdateGameStatus(state, square, player));
  }

  UpdateGameStatus(state, squareIndex, player) {
    let newState = {};

    newState.board = MakeMove(state.board, squareIndex, player);

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
    this.MakeMove(game, nextMove, game.currentTurn);
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
