export default class HistoryEntry {

  /**
   * This is a simple object for defining the form of all the History Entries
   * @param {String} winner The label to recognize the player
   * @param {Number} time The time the game took expressed in Secs
   * @param {Number} score Is the final calculus of the time and variables
   */
  constructor(winner, time, score) {
    this.winner = winner;
    this.time = time;
    this.score = score;
  }
}
