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

    /**
     * Hashes from already executed Tasks
     *
     * @type {Array}
     * @private
     */
    this._executedList = [];
  }

  /**
   * Retrieves a list of hashes from already executed Tasks
   *
   * @return {Array}
   */
  get executedList() {
    return this._executedList;
  }

  /**
   * Retrieves the queue length
   *
   * @return {number}
   */
  get length() {
    return this._queue.length;
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
    const TaskOperation = new Task.API(operation, type);

    let index = this._sanitizeSequence(sequence);

    if (typeof index === 'number') {
      this._queue[index] = TaskOperation;
    } else {
      // index is not a valid value, will be pushed to the end of the array
      this._queue.push(TaskOperation);
    }

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

  /**
   * Process the queue
   *
   * @return {Promise}
   */
  async process() {
    return new Promise(async resolve => {
      this._queue.map(async currentTask => {
        const operation = currentTask.operation;
        currentTask.type === Task.AWAIT ? await operation() : operation();

        this._executedList.push(currentTask.hash);
        if (this._queue.length === this._executedList.length) {
          return resolve(true);
        }
      });
    });
  }

  /**
   * Cast the sequence param to a value that is accepted as an array index
   *
   * @param sequence
   * @return {number|undefined}
   * @private
   */
  _sanitizeSequence(sequence) {
    let value = parseInt(sequence);

    if (isNaN(value)) {
      value = undefined; // the last po
    }

    return value;
  }

  /**
   * Removes falsy elements from the queue (for example: empty items may
   * occur on the queue when the is pushed into the queue sequences
   * like 0,2,3 where here the position 1 is an empty item on queue)
   *
   * @return {*[]}
   * @private
   */
  _clearQueueInvalidPositions() {
    return this._queue.filter(Boolean);
  }

}

module.exports = GlobalProcessQueue;
