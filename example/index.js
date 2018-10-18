const Process = require('../src/GlobalProcess.js');

/**
 * This function will be called on the process queue start
 */
const initializer = () => {
  console.log('The global process initializer');
};

/**
 * This function will be called when all process on the queue is executed
 */
const finisher = () => {
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
CartProcess.add(CartFlow.CheckCartItems, Process.TypeAwait, 1);
CartProcess.add(CartFlow.UpdateStock, Process.TypeAsync, 3);
CartProcess.add(CartFlow.CalculateTotal, Process.TypeAwait, 2);
CartProcess.exec();

