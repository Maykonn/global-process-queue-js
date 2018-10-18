const crypto = require('crypto');
const AWAIT = 'AWAIT';
const ASYNC = 'ASYNC';

class Task {

  constructor() {
    /**
     * Task ID
     *
     * @type {Number|null}
     * @private
     */
    this._id = null;

    /**
     * Task value
     *
     * @type {Function|null}
     * @private
     */
    this._value = null;

    /**
     * Task type
     *
     * @type {string}
     * @private
     */
    this._type = ASYNC;

    /**
     * Task hrtime
     *
     * @see https://nodejs.org/api/process.html#process_process_hrtime_time
     * @type {Array}
     * @private
     */
    this._hrtime =  process.hrtime();
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
   * Retrieves the task value
   *
   * @return {Function}
   */
  get value() {
    return this._value;
  }

  /**
   * Configures the task value
   *
   * @param {Function} value
   */
  set value(value) {
    if (Task.isFunction(value)) {
      this._id = crypto.createHash('md5').update(value.toString()).digest('hex');
      this._value = (async () => {
        return value;
      });

      return;
    }

    throw new Error('Task value must be a Function');
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
   * Retrieves the Task hrtime
   *
   * @return {Array}
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
