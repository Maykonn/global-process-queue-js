const Task = require('./Task.js');

class GlobalProcessQueue {
  /**
   * GlobalProcessQueue constructor
   */
  constructor() {
    /**
     * The process queue
     *
     * @type {Array}
     * @private
     */
    this._queue = [];
  }

  /**
   * Add a operation as a Task on queue
   *
   * @param {Function} operation
   * @param {string|null} type
   * @param {number|null} sequence
   * @return {number}
   */
  add(operation, type = null, sequence = null) {
    if (typeof operation === 'undefined') {
      throw new Error('The operation param is required');
    }

    // TODO: Put the task on queue obeying the sequence
    return this._queue.push(new Task.API(operation, type));
  }

  del(process) {

  }

  process() {

  }
}

module.exports = GlobalProcessQueue;
