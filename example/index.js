const Process = require('../src/GlobalProcess.js');

/**
 * This function will be called on the process queue start
 * Here you can start a mysql or redis connection for example
 */
const initializer = () => {
  // global.DB = (new MySQL()).getConnectionFromPool();
  console.log('The global process initializer');
};

/**
 * This function will be called when all process on the queue is executed
 * Here you release the mysql connection from pool or a redis connection for example
 */
const finisher = () => {
  // global.DB.finish();
  console.log('The global process finisher');
};

/**
 * Example of an e-commerce cart flow
 *
 * @type {{CheckCartItems: function(), CalculateTotal: function(), UpdateStock: function()}}
 */
const CartFlow = {
  CheckCartItems: async () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  CalculateTotal: async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  UpdateStock: () => {
    console.log('This is a normal function');
  }
};

/**
 * Example of a cart process
 */
const CartProcess = new Process.Handler(initializer, finisher);
CartProcess.add(CartFlow.CheckCartItems, Process.AWAIT, 1);
CartProcess.add(CartFlow.UpdateStock, Process.ASYNC, 3);
CartProcess.add(CartFlow.CalculateTotal, Process.AWAIT, 4);

const TaskToRemove = CartProcess.add(CartFlow.CalculateTotal, Process.AWAIT, 2);
CartProcess.del(TaskToRemove);

CartProcess.exec(); // the queue is executed and emptied

