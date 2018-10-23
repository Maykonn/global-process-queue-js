console.log('CART EXAMPLE');

const Process = require('../src/GlobalProcess.js');

/**
 * This function will be called on the process queue start
 * Here you can start a mysql or redis connection for example
 */
const optionalInitializer = () => {
  // global.DB = (new MySQL()).getConnectionFromPool();
  return new Promise((resolve) => setTimeout(() => {
    console.log('Global process initializer()');
    resolve();
  }, 1000));
};

/**
 * This function will be called when all process on the queue is executed
 * Here you release the mysql connection from pool or a redis connection for example
 */
const optionalFinisher = () => {
  // global.DB.finish();
  return new Promise((resolve) => setTimeout(() => {
    console.log('Global process finisher()');
    resolve();
  }, 1000));
};

/**
 * Example of an e-commerce cart flow
 *
 * @type {{CheckCartItems: function(), CalculateTotal: function(), UpdateStock: function()}}
 */
const CartFlow = {
  CheckCartItems: async () => {
    return new Promise((resolve) => setTimeout(() => {
      console.log('CartFlow.CheckCartItems()');
      resolve();
    }, 1500));
  },
  CalculateTotal: async () => {
    return new Promise((resolve) => setTimeout(() => {
      console.log('CartFlow.CalculateTotal()');
      resolve();
    }, 3000));
  },
  UpdateStock: () => {
    console.log('CartFlow.UpdateStock()');
  }
};

/**
 * Example of a cart process
 */
const CartProcess = new Process.Handler(optionalInitializer, optionalFinisher);
CartProcess.add(CartFlow.CheckCartItems, Process.ASYNC, 1);

// will be executed after the first process, because the first process have a delay of 1.5s
// you can await the the first process changing the type to Process.AWAIT (try by yourself)
CartProcess.add(CartFlow.UpdateStock, Process.ASYNC, 3);

// will be pushed into the queue at the latest position
CartProcess.add(CartFlow.CalculateTotal, Process.AWAIT);

// testing the del method
const TaskToRemove = CartProcess.add(CartFlow.CalculateTotal, Process.AWAIT, 2);
CartProcess.del(TaskToRemove);

// you may need an async execution, or...
CartProcess.exec();

// need to work with a promise response...
// const process = CartProcess.exec();
// process.then(done => {
//   console.log('DONE:', done);
// });

// or yet await the response of CartProcess.exec() either
// (async () => {
//   const done = await CartProcess.exec(); // the queue is executed and emptied
//   if (done) {
//     console.log('DONE:', done);
//   }
// })();
