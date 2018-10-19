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
   * @return {Task}
   */
  add(operation, type = null, sequence = null) {
    if (typeof operation === 'undefined') {
      throw new Error('The operation param is required');
    }

    // TODO: Put the task on queue obeying the sequence
    const TaskOperation = new Task.API(operation, type);
    this._queue[sequence] = TaskOperation;

    return TaskOperation;
  }

  /**
   * Remove a Task from the queue
   *
   * @param {Task} TaskToRemove
   */
  del(TaskToRemove) {
    if (TaskToRemove instanceof Task.API) {
      this._queue = this._queue.filter(Task => Task.hash !== TaskToRemove.hash);
      return true;
    }

    throw new Error('TaskToRemove param must be an instance of Task.API');
  }

  process() {
    // Removing the falsy elements from the queue (for example: empty items may
    // occur on the queue when the is pushed into the queue sequences
    // like 0,2,3 where here the position 1 is an empty item on queue)
    const queue = this._queue.filter(Boolean);

    // implementing...

    return true;
  }
}

module.exports = GlobalProcessQueue;
