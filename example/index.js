const Process = require('../src/GlobalProcess.js');

const initializer = () => {
  console.log('The global process initializer');
};

const finisher = () => {
  console.log('The global process finisher');
};

const asyncFunc = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('This is an async function');
      resolve('foo');
    }, 1000);
  });
};

const normalFunc = () => {
  console.log('This is a normal function');
};

const SystemProcess = new Process(initializer, finisher);
SystemProcess.add(asyncFunc, Process.Await, 1);
SystemProcess.add(normalFunc, Process.Async, 3);
SystemProcess.add(asyncFunc, Process.Async, 4);
SystemProcess.add(normalFunc, Process.Await, 2);
SystemProcess.exec();

