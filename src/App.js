import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.InitialState = {
      PLAYER_TWO_SYMBOL: 'O',
      PLAYER_ONE_SYMBOL: 'X',
      currentTurn: "X",
      board: [
        '', '', '', '', '', '', '', '', ''
      ],
      modified: false,
      winner: []
    };

    this.state = this.InitialState;
    
  }

  render() {
    return (
      <div className="game">
        <p className="current-player">Current Player: {this.state.currentTurn}</p>
        <button onClick={() => this.setState(this.InitialState)}>Restart Game!</button>
        <div className="board">
          {this.state.board.map((square, index) => {
            return (
              <div key={index} onClick={() => this.setValue(index)}
                className={this.state.winner.findIndex(el => el === index) !== -1 ? 'square square--winner' : 'square'}>{square}</div>
            )
          })}
        </div>
      </div>
    );
  }

  setValue(squareIndex) {
    if (this.state.winner.length) {
      return;
    } else {
      this.setState({board: this.state.board.map((square, index) => {
        const currentSquareAvailable = (index === squareIndex && square === '');
        let result;
        if (currentSquareAvailable) {
          result = this.state.currentTurn;
          this.setState({modified: true}, () => {
            let winner = this.checkForWinner(this.state.board)
            if (winner) {
              this.setState({winner: winner});
            } else {
              this.setState({
                currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL
              });
            }
          });
        } else {
          result = square;
          this.setState({modified: false});
        }
        return result;
      })});
    }
  }

  checkForWinner(board) {
    const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    return winningCombos.find((combo) => {
      if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
        return board[combo[0]];
      } else {
        return false;
      }
    });
  }
}
export default App;
