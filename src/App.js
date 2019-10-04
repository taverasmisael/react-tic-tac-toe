import React, { Component } from 'react'
import classnames from 'classnames'

import './App.css'

import {
  GameState,
  CheckForWinner,
  MakeMove,
  PlayAI,
  RemainingMoves,
  SwitchPlayers,
} from './functionality/tictactoe'

import Game from './components/Game/Game'
import GameConfigBar from './components/Game/GameConfigBar'
import GameModeSelect from './components/Game/GameModeSelect'

import AboutModal from './components/functional/AboutModal'
import FAB from './components/ui/FAB'

export default class App extends Component {
  InitialState = new GameState({
    aboutVisible: false,
    BGColor: '',
  })
  state = this.InitialState
  state = this.InitialState

  render() {
    const {
      BGColor,
      times,
      winner,
      currentTurn,
      aboutVisible,
      board,
      history,
      gameStarted,
    } = this.state

    return (
      <div
        className={classnames(`App ${BGColor}`, {
          'modal--is-open': aboutVisible,
        })}
      >
        <GameConfigBar
          times={times}
          winner={!!winner}
          currentPlayer={currentTurn}
          onResetGame={this.InitGame}
          onChangeColor={this.onChangeColor}
        />
        <Game
          winner={winner}
          board={board}
          history={history.getHistory()}
          onResetScores={history.resetScores}
          onSelectSquare={square =>
            this.MakeMove(this.state, square, currentTurn)
          }
        />
        <FAB
          text="?"
          title="Ayuda"
          onClick={() => this.setState({ aboutVisible: true })}
        />
        <GameModeSelect isVisible={!gameStarted} onModeSelect={this.InitGame} />
        <AboutModal
          isVisible={aboutVisible}
          onClose={() => this.setState({ aboutVisible: false })}
        />
      </div>
    )
  }

  componentDidUpdate(_, state) {
    if (
      state.vsComputer &&
      state.currentTurn === this.state.PLAYER_TWO_SYMBOL
    ) {
      this.MakeAIMove(state)
    }
  }

  componentWillUnmount() {
    this.StopGameTimer()
  }

  InitGame = mode => {
    const gameStarted = mode !== undefined
    this.StopGameTimer()
    this.setState(state => ({
      ...this.InitialState,
      gameStarted,
      vsComputer: mode,
      BGColor: state.BGColor,
      history: state.history,
    }))

    if (gameStarted) this.SetGameTimer()
  }

  SetGameTimer = () => {
    this.timer = setInterval(() => {
      this.setState(state => {
        const player = state.currentTurn
        return {
          times: {
            ...state.times,
            [player]: state.times[player] + 1,
          },
        }
      })
    }, 1000)
  }

  StopGameTimer = () => clearInterval(this.timer)

  onChangeColor = color =>
    this.setState({ BGColor: color ? `App--bg-${color}` : '' })

  MakeMove = (state, square, player) => {
    if (!state.winner)
      this.setState(this.UpdateGameStatus(state, square, player))
  }

  UpdateGameStatus = (state, squareIndex, player) => {
    let newState = {}

    newState.board = MakeMove(state.board, squareIndex, player)

    if (newState.board === state.board) {
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
        newState.gameStarted = false
      } else if (RemainingMoves(newState.board)) {
        newState.currentTurn = SwitchPlayers(player)
      } else {
        this.StopGameTimer()
      }
    }

    return newState
  }

  MakeAIMove = game => {
    const nextMove = PlayAI(game.board, 2, game.currentTurn)
    this.MakeMove(game, nextMove, game.currentTurn)
  }
}
