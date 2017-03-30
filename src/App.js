import React, { Component } from 'react';

import './App.css';

import {
  GameState,
  CheckForWinner,
  MakeMove,
  PlayAI,
  RemainingMoves,
  SwitchPlayers,
  GenerateHistory
} from './functionality/tictactoe';

import { extend, eq, dynamicClass, inc } from './functionality/helpers';

import Game from './components/Game/Game';
import GameConfigBar from './components/Game/GameConfigBar';
import FxPlayer from './components/ui/FxPlayer';

import AboutModal from './components/functional/AboutModal';
import FAB from './components/ui/FAB';

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
    });

    this.clock = 0;

    this.state = this.InitialState;
  }

  render() {
    return (
      <div className={dynamicClass(`App ${this.state.BGColor}`, ['modal--is-open'], this.state.aboutVisible)}>
        <button
          onClick={() => this.toggleHeader()}
          type="button"
          className={dynamicClass(
            'hamburger-menu',
            ['hamburger-menu--open'],
            this.state.headerVisible
          )}
        >
          <span className="hamburger-menu__line" />
          <span className="hamburger-menu__line" />
          <span className="hamburger-menu__line" />
        </button>
        <GameConfigBar
          isVisible={this.state.headerVisible}
          times={this.state.times}
          winner={Boolean(this.state.winner)}
          currentPlayer={this.state.currentTurn}
          onSetVolume={amount => this.onSetVolume(amount)}
          onResetGame={() => this.ResetGame()}
          onChangeColor={color => this.onChangeColor(color)}
        />
        <Game
          winner={this.state.winner}
          board={this.state.board}
          history={this.state.history}
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
    this.timer = setInterval(
      () => {
        const player = this.state.currentTurn;
        const newTimes = extend(this.state.times, {
          [player]: inc(this.state.times[player])
        });
        this.setState({ times: newTimes });
      },
      1000
    );
  }

  componentWillUpdate(props, state, anys) {
    if (eq(state.currentTurn, this.state.PLAYER_TWO_SYMBOL)) {
      this.MakeAIMove(state);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  InitGame(player) {
    this.setState(
      extend(this.InitialState, { currentTurn: player })
    );
  }

  ResetGame() {
    clearInterval(this.timer)
    this.timer = setInterval(
      () => {
        this.setState({
          times: extend(this.state.times, {
            [this.state.currentTurn]: this.state.times[this.state.currentTurn] +
              1
          })
        });
      },
      1000
    );
    this.setState(
      extend(this.InitialState, { BGColor: this.state.BGColor, history: this.state.history })
    );
  }
  generateMenuClases() {
    const baseClase = 'hamburger-menu';
    return `${baseClase} ${this.state.headerVisible ? 'hamburger-menu--open' : ''}`;
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
    });
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
        newState.history = [...state.history, GenerateHistory(state.currentTurn, newState.board, state.times[state.currentTurn])]
        clearInterval(this.timer);
        this.PlayFx('applause.mp3');
      } else if (RemainingMoves(newState.board)) {
        this.PlayPopEffect(player);
        newState.currentTurn = SwitchPlayers(player);
      } else {
        clearInterval(this.timer);
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
