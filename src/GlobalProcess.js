const GlobalProcessQueue = require('./GlobalProcessQueue.js');
const Task = require('./Task.js');

/**
 * Global Process API
 */
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
    this._initializer = initializer;

    /**
     * When given, the finisher function will run for all executions
     *
     * @type Function
     */
    this._finisher = finisher;

    /**
     * The process queue
     *
     * @type {GlobalProcessQueue}
     * @private
     */
    this._queue = new GlobalProcessQueue();
  }

  /**
   * Add a new operation to the process queue
   *
   * @param {Function} operation
   * @param {string|null} type
   * @param {number|null} sequence
   * @return {Task}
   */
  add(operation, type = null, sequence = null) {
    return this._queue.add(operation, type, sequence);
  }

  /**
   * Remove a Task from the queue
   *
   * @param {Task} task
   * @return {boolean}
   */
  del(task) {
    return this._queue.del(task);
  }

  /**
   * Process the queue
   *
   * @return {Promise<void>}
   */
  async exec() {
    return await (async () => {
      if (Task.API.isFunction(this._initializer)) {
        await (async () => {
          return this._initializer();
        })();
      }

      const response = this._queue.process();

      if (Task.API.isFunction(this._finisher)) {
        await (async () => {
          return this._finisher();
        })();
      }

      return response;
    })();
  }
}

module.exports = {
  Handler: GlobalProcess,
  AWAIT: Task.AWAIT,
  ASYNC: Task.ASYNC
};
