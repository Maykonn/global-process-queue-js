const hash = require('object-hash');
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
    if (this.isFunction(value)) {
      this._id = hash(value);
      this._value = (async () => {
        return value;
      });
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
