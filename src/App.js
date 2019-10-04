import React, { Component } from 'react'
import classnames from 'classnames'
import compare from 'just-compare'

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
    currentColor: '',
  })
  state = this.InitialState
  state = this.InitialState

  render() {
    const {
      currentColor,
      times,
      winner,
      currentTurn,
      aboutVisible,
      board,
      history,
      gameStarted,
    } = this.state

    const backgroundClass = `App--bg-${currentColor}`

    return (
      <div
        className={classnames('App', {
          'modal--is-open': aboutVisible,
          [backgroundClass]: currentColor,
        })}
      >
        <GameConfigBar
          times={times}
          winner={!!winner}
          currentPlayer={currentTurn}
          onResetGame={this.InitGame}
          onChangeColor={this.onChangeColor}
          currentColor={currentColor}
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
      currentColor: state.currentColor,
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

  onChangeColor = color => this.setState({ currentColor: color })

  MakeMove = (state, square, player) => {
    if (!state.winner)
      this.setState(this.UpdateGameStatus(state, square, player))
  }

  UpdateGameStatus = (state, squareIndex, player) => {
    const newBoard = MakeMove(state.board, squareIndex, player)

    if (compare(newBoard, state.board)) {
      return {}
    }

    const isComputerPlaying =
      state.vsComputer && state.currentTurn === state.PLAYER_TWO_SYMBOL
    const playerTime = state.times[state.currentTurn]
    const winner = CheckForWinner(newBoard)
    const computerWon = winner && isComputerPlaying
    const gameStarted = !winner
    const noMoreMoves = !RemainingMoves(newBoard)
    const nextTurn = noMoreMoves ? player : SwitchPlayers(player)

    if (winner) {
      const winnerName = computerWon
        ? 'ComputerXO'
        : prompt('Ingrese su nombre', 'Player 1') || 'Player 1'
      this.state.history.GenerateHistory(
        `${winnerName} (${state.currentTurn})`,
        newBoard,
        playerTime
      )
      this.StopGameTimer()
    } else if (noMoreMoves) {
      this.StopGameTimer()
    }

    return {
      winner,
      gameStarted,
      currentTurn: nextTurn,
      board: newBoard,
    }
  }

  MakeAIMove = game => {
    const nextMove = PlayAI(game.board, 10, game.currentTurn)
    this.MakeMove(game, nextMove, game.currentTurn)
  }
}
