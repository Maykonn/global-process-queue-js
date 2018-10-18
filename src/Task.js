const hash = require('object-hash');
const AWAIT = 'AWAIT';
const ASYNC = 'ASYNC';

class Task {

  constructor() {
    this._id = null;
    this._value = null;
    this._type = ASYNC;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._id = hash(value);
    this._value = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._validateType(value);
    this._type = value;
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
