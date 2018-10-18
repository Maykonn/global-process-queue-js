class GlobalProcessQueue {
  constructor() {
    this._queue = [];
  }

  add(process) {
    this._queue.push(process);
  }

  execute() {

  }
}

module.exports = GlobalProcessQueue;
