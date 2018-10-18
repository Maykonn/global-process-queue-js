const crypto = require('crypto');
const AWAIT = 'AWAIT';
const ASYNC = 'ASYNC';

class Task {

  /**
   * Task constructor
   *
   * @param {Function|null} operation
   * @param {string} type
   */
  constructor(operation = null, type = ASYNC) {
    /**
     * Task ID
     *
     * @type {Number|null}
     * @private
     */
    this._id = null;

    /**
     * Task operation
     *
     * @type {Function|null}
     * @private
     */
    this._operation = null;
    if (operation !== null) {
      this.operation = operation;
    }

    /**
     * Task type
     *
     * @type {string}
     * @private
     */
    this._type = type;
    if (type !== ASYNC) {
      this.type = type;
    }

    /**
     * Task high-resolution real time in a [seconds, nanoseconds] tuple Array
     *
     * @see https://nodejs.org/api/process.html#process_process_hrtime_time
     * @type {Array}
     * @private
     */
    this._hrtime = process.hrtime();
  }

  /**
   * Retrieves the Task ID
   *
   * @return {Number}
   */
  get id() {
    return this._id;
  }

  /**
   * Retrieves the task operation
   *
   * @return {Function}
   */
  get operation() {
    return this._operation;
  }

  /**
   * Configures the task operation
   *
   * @param {Function} operation
   */
  set operation(operation) {
    if (Task.isFunction(operation)) {
      this._id = crypto.createHash('md5').update(operation.toString()).digest('hex');
      this._operation = (async () => {
        return operation;
      });

      return;
    }

    throw new Error('Task operation must be a Function');
  }

  /**
   * Retrieves the Task type
   *
   * @return {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Configures the Task type
   *
   * @param {string} value
   */
  set type(value) {
    this._validateType(value);
    this._type = value;
  }

  /**
   * Retrieves the Task high-resolution real time in a [seconds, nanoseconds] tuple Array
   *
   * @see https://nodejs.org/api/process.html#process_process_hrtime_time
   * @return {Array} [seconds, nanoseconds]
   */
  get hrtime() {
    return this._hrtime;
  }

  /**
   * Verify if the func param is a function
   *
   * @param {Function} func
   * @return {boolean}
   */
  static isFunction(func) {
    return typeof func === 'function';
  }

  /**
   * Throws Error if type param is not AWAIT or ASYNC
   *
   * @param {string} type
   * @return {boolean}
   * @private
   */
  _validateType(type) {
    if (!(type === AWAIT || type === ASYNC)) {
      throw new Error('Invalid Process Type given: ' + type);
    }

    return true;
  }
}

module.exports = {
  API: Task,
  AWAIT: AWAIT,
  ASYNC: ASYNC,
};
