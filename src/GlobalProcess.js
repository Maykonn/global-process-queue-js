const GlobalProcessQueue = require('GlobalProcessQueue.js');

class GlobalProcess {

  /**
   * Global Process constructor
   *
   * @param {Function|null} initializer
   * @param {Function|null} finisher
   */
  constructor(initializer = null, finisher = null) {
    /**
     * When given, the initializer function will run for all executions
     *
     * @type Function
     */
    this._initializer = this._isFunction(initializer) ? initializer : null;

    /**
     * When given, the finisher function will run for all executions
     *
     * @type Function
     */
    this._finisher = this._isFunction(finisher) ? finisher : null;

    /**
     * The process queue
     *
     * @type {GlobalProcessQueue}
     * @private
     */
    this._queue = new GlobalProcessQueue();
  }

  /**
   * Retrieve the process queue
   *
   * @return {GlobalProcessQueue}
   */
  get queue() {
    return this._queue;
  }

  /**
   * Verify if the func param is a function
   *
   * @param {*} func
   * @return {boolean}
   * @private
   */
  _isFunction(func) {
    return typeof func === 'function';
  }

}

module.exports = GlobalProcess;
