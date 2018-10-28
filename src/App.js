import React, { Component, createRef } from 'react'

import './App.css'

import {
  GameState,
  CheckForWinner,
  MakeMove,
  PlayAI,
  RemainingMoves,
  SwitchPlayers,
} from './functionality/tictactoe'

import { extend, eq, dynamicClass, inc } from './functionality/helpers'

import Game from './components/Game/Game'
import GameConfigBar from './components/Game/GameConfigBar'
import GameModeSelect from './components/Game/GameModeSelect'
import FxPlayer from './components/ui/FxPlayer'

import AboutModal from './components/functional/AboutModal'
import FAB from './components/ui/FAB'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.InitialState = new GameState({
      headerVisible: false,
      aboutVisible: false,
      BGColor: '',
      FX: {
        currentFX: 'pop1.mp3',
      },
    })

    this.state = this.InitialState
    this.FXPlayer = createRef()
    this.FXPlayer1 = createRef()
    this.FXPlayer2 = createRef()
  }

  render() {
    return (
      <div
        className={dynamicClass(
          `App ${this.state.BGColor}`,
          ['modal--is-open'],
          this.state.aboutVisible
        )}
      >
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
          onResetGame={() => this.InitGame()}
          onChangeColor={color => this.onChangeColor(color)}
        />
        <Game
          winner={this.state.winner}
          board={this.state.board}
          history={this.state.history.getHistory()}
          onResetScores={() => this.state.history.resetScores()}
          onSelectSquare={square =>
            this.MakeMove(this.state, square, this.state.currentTurn)
          }
        />
        <FAB
          text="?"
          title="Ayuda"
          onClick={() => this.setState({ aboutVisible: true })}
        />
        <FxPlayer ref={this.FXPlayer} mediaSrc={this.state.FX.currentFX} />
        <FxPlayer ref={this.FXPlayer1} mediaSrc={'pop1.mp3'} />
        <FxPlayer ref={this.FXPlayer2} mediaSrc={'pop2.mp3'} />
        <GameModeSelect
          isVisible={!this.state.gameStarted}
          onModeSelect={mode => this.InitGame(mode)}
        />
        <AboutModal
          isVisible={this.state.aboutVisible}
          onClose={() => this.setState({ aboutVisible: false })}
        />
      </div>
    )
  }

  componentWillUpdate(props, state, anys) {
    if (
      eq(state.currentTurn, this.state.PLAYER_TWO_SYMBOL) &&
      eq(state.vsComputer, true)
    ) {
      this.MakeAIMove(state)
    }
  }

  componentWillUnmount() {
    this.StopGameTimer()
  }

  InitGame(mode) {
    const gameStarted = mode === undefined ? false : true
    this.StopGameTimer()
    this.setState(
      extend(this.InitialState, {
        gameStarted,
        vsComputer: mode,
        BGColor: this.state.BGColor,
        history: this.state.history,
      })
    )
    if (gameStarted) this.SetGameTimer()
  }

  SetGameTimer() {
    this.timer = setInterval(() => {
      const player = this.state.currentTurn
      const newTimes = extend(this.state.times, {
        [player]: inc(this.state.times[player]),
      })
      this.setState({ times: newTimes })
    }, 1000)
  }

  StopGameTimer() {
    clearInterval(this.timer)
  }

  onSetVolume(amount) {
    this.FXPlayer.volume = amount
  }

  onChangeColor(color) {
    this.setState({
      BGColor: color ? `App--bg-${color}` : '',
    })
  }

  toggleHeader() {
    this.setState({
      headerVisible: !this.state.headerVisible,
    })
  }

  MakeMove(state, square, player) {
    if (!state.winner)
      this.setState(this.UpdateGameStatus(state, square, player))
  }

  UpdateGameStatus(state, squareIndex, player) {
    let newState = {}

    newState.board = MakeMove(state.board, squareIndex, player)

    if (eq(newState.board, state.board)) {
      return {}
    } else {
      const isWinner = CheckForWinner(newState.board)
      const computerWon =
        isWinner &&
        (state.vsComputer && state.currentTurn === state.PLAYER_TWO_SYMBOL)
      if (isWinner) {
        newState.winner = isWinner
        const winnerName = computerWon
        ? 'ComputerXO'
        : prompt('Ingrese su nombre', 'Player 1') || 'Player 1'
        this.state.history.GenerateHistory(
          `${winnerName} (${state.currentTurn})`,
          newState.board,
          state.times[state.currentTurn]
          )
          this.StopGameTimer()
          this.PlayFx('applause.mp3')
          newState.gameStarted = false
      } else if (RemainingMoves(newState.board)) {
        this.PlayPopEffect(player)
        newState.currentTurn = SwitchPlayers(player)
      } else {
        this.StopGameTimer()
        this.PlayFx('jeer.mp3')
      }
    }

    return newState
  }

  MakeAIMove(game) {
    const nextMove = PlayAI(game.board, 2, game.currentTurn)
    this.MakeMove(game, nextMove, game.currentTurn)
  }

  PlayPopEffect(player) {
    if (player === this.state.PLAYER_ONE_SYMBOL)
      this.PlayFxPlayer(this.FXPlayer1)
    if (
      player === this.state.PLAYER_TWO_SYMBOL &&
      !eq(this.state.vsComputer, true)
    )
      this.PlayFxPlayer(this.FXPlayer2)
  }

  PlayFx(currentFX) {
    const { current: Player } = this.FXPlayer

    this.setState({ FX: { currentFX } }, () => {
      this.PlaySound(Player)
    })
  }

  PlayFxPlayer(FxPlayer) {
    const { current: Player } = FxPlayer
    this.PlaySound(Player)
  }

  /**
   *
   * @param {HTMLAudioElement} Player Any Player, with a source
   */
  PlaySound(Player) {
    Player.currentTime = 0
    Player.volume = 0.5
    const promise = Player.play()
    if (promise !== undefined) {
      promise.then(_ => (Player.volume = 1)).catch(console.error.bind(console))
    }
  }
}
