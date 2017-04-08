import LocalStorage from './local-storage';

import HistoryEntry from './history-entry'

import { RateBoard } from './tictactoe';

export default class GameHistory {
  constructor() {
    this.Store = new LocalStorage('XO-HISTORY');
    this.SCORES = [500, 20, 10, 5];
    this.MaxRegistries = 10;
  }

  /**
 * This function return an history entry calculating the score based on time, board
 * and some multiplier. If the time === 0 you get the max score
 * @param {String} token The symbol of the winner player
 * @param {Array<String>} board The current board in the moment the game is over
 * @param {Number} time The ammount of time the winner player took to win
 */
  GenerateHistory(token, board, time) {
    const multipler = time / 5 <= 3 ? Math.round(time / 5) : 3;
    const base = this.SCORES[multipler];
    const BoardScore = RateBoard(board);
    let score = BoardScore * base;
    return this.updateHistory(new HistoryEntry(token, time, score))
  }

  /**
   * This function will return an array containing all the histories available at the time
   * @returns {Array<HistoryEntry>}
   */
  getHistory() {
    const storageHistory = this.Store.get('history') || [];;
    return this.getTopScores(storageHistory);
  }


  /**
   * This function wraps the LocalStorage and handle the procces of updating without
   * overwrite the currentHistory that already exists
   * @param {HistoryEntry} newEntry the new register for the History
   * @returns {Array<HistoryEntry>} all the history inside the Store
   */
  updateHistory(newEntry) {
    const currentHistory = this.getHistory();
    const mergedHistory = [...currentHistory, newEntry];
    const topHistory = this.getTopScores(mergedHistory)
    return this.Store.set('history', topHistory);
  }

  /**
   * This function takes a history and pass it to sortHistory and only returns
   * the top players defined by this.MaxRegistries
   * @param {Array<HistoryEntry>} history The history to be sorted and filtered
   */
  getTopScores(history) {
    return this.sortHistory(history).slice(0, this.MaxRegistries);
  }

  /**
   * This function takes as parameter a history and returns the same history
   * sorted by score leading the best scores at the top
   * @param {Array<HistoryEntry>} history The whole history in any order
   */
  sortHistory(history) {
    return history.sort((a, b) => a.score < b.score);
  }
}
