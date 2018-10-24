# Global Process Queue

With the **Global Process Queue** you can create a Queue of ASYNC and AWAIT Processes for your Node.JS System. 
This Package provides an API to create an Initializer and a Finisher Tasks to run before and after your
Processes Queue be executed.

## How to Use

The best way to explain how this package works is by example. This documentation provides an example 
that works like a real-world use case, though a simple example. 

### A Hypothetical Use Case

Suppose you have a Cart on your e-commerce and this cart has several tasks, or processes (*Add Product*, *Remove Product*,
*Calculate Total*, etc). So with the Global Process Queue, you can orchestrate the *Cart Flow* - that is your *System Process Flow* - 
and what happens globally via the initializer and the finisher methods, both optional.

**We will use this simple example to provide a documentation as close as possible to a real-world example.** 

## The Initializer Method

This method provides an API to you create a global process that happens before your queue be executed.

For example, suppose that you have a process called *Update Stock*. Probably this method needs to access a Database or a Cache Layer
to be executed, thus with the Initializer Method you can get, for example, a Connection of your MySQL Connection Pool 
before the method be called by the *Queue Execution*, so when the Update Stock process be called, the MySQL Connection will be
ready to execute queries in your database.

You can do something like that:

```JS
/**  
 * This function will be called before the process queue start  
 * Here you can start a mysql or redis connection for example  
 */  
const optionalInitializer = () => {  
  global.DB = (new MySQL()).getConnectionFromPool();  
};
```

Note that we declare a global variable called `DB`, to be accessible by your others methods, we'll see about it further, 
later on this documentation.


## The Finisher Method

Similar to the Initializer method, the Finisher method provides you an API to create a global process, which runs after
the queue execution.

As an example suppose that you need to close the MySQL Connection just after all process is executed. May you do it: 

```JS
/**
 * This function will be called when all process on the queue are executed
 * Here you release the mysql connection from pool or a redis connection for example
 */
const optionalFinisher = () => {
  global.DB.finish();
};

```

## The System Flow and The Process Queue

With the Process Queue API you can add or remove ASYNC and AWAIT processes into a Queue.
You can pass the Initializer and the Finisher methods to the Queue Handler to be executed before and after the queue process.

### The System Flow

To make the most with the package you need keep your system processes well delimited. 
First, you need to create your program flow. In the bellow example a `CartFlow` object is created to abstract the flow.
You can work in a functional way, for example:

```JS
/**
 * Example of an e-commerce cart flow
 *
 * @type {{CheckCartItems: function(), CalculateTotal: function(), UpdateStock: function()}}
 */
const CartFlow = {
  CheckCartItems: async () => {
    return new Promise((resolve) => setTimeout(() => {
      // You can use the global.DB here for example ...  
      console.log('CartFlow.CheckCartItems()');
      resolve();
    }, 1500));
  },
  CalculateTotal: async () => {
    return new Promise((resolve) => setTimeout(() => {
      // You can use the global.DB here for example ...  
      console.log('CartFlow.CalculateTotal()');
      resolve();
    }, 3000));
  },
  UpdateStock: () => {
    // You can use the global.DB here for example ...  
    console.log('CartFlow.UpdateStock()');
  }
};
```

### The Process Queue

Once you delimited your system flows, you may create a service to execute that flow, using the Initializer, 
Finisher and your custom methods.

#### Adding Processes to the Queue

You can add processes into a desired position of the queue execution (optional), note the third parameter of the `add()` method:

```JS
const Process = require('global-process-queue');  
  
/**  
 * Executing the cart flow processes
 */  
const CartProcess = new Process.Handler(optionalInitializer, optionalFinisher);  
CartProcess.add(CartFlow.CheckCartItems, Process.ASYNC, 1);  
  
// will be executed after the first process, because the first process have a delay of 1.5s  
// you can await the the first process changing the type to Process.AWAIT (try by yourself)  
CartProcess.add(CartFlow.UpdateStock, Process.ASYNC, 3);  
  
// will be pushed into the queue at the latest position  
CartProcess.add(CartFlow.CalculateTotal, Process.AWAIT);  
  
// Executing the queue  
CartProcess.exec();
```

May you need to do something after the queue execution, you can do a similar thing like the below examples.

#### Removing Process From the Queue 

Sometimes, depending of your flow, may you need to remove an specific process from the queue, may you do it:

```JS
const TaskToRemove = CartProcess.add(CartFlow.CalculateTotal, Process.AWAIT, 2);  
CartProcess.del(TaskToRemove);
```

#### Working With a Promise Response

```JS
const process = CartProcess.exec();
  
process.then(done => {
  // do something here...
  console.log('DONE:', done);  
});  
```

#### Await the Response

```JS
(async () => {  
  const done = await CartProcess.exec();  
    if (done) {
      // do something here...
      console.log('DONE:', done);  
    }  
})();
```

## Notes About Async/Await Processes

- Each process can be added to a specific position into the queue:
```JS
CartProcess.add(method, methodType, positionNumber);
```

- You can have ASYNC and AWAIT processes

- All processes will be executed after the optional initializer method change to a ready state.

- All processes will be executed before the optional finisher method be executed.

- If you pushed ASYNC processes into your queue, be aware that the queue processing could be in a `finished state` before 
all ASYNC methods are executed - see the `.then()` or the `if(done)` lines in the example above.

# Community Support

If you need help with this bundle please consider [open a question on StackOverflow](https://stackoverflow.com/questions/ask)
using the `global-process-queue-js` tag, it is the official support platform for this bundle.

Github Issues are dedicated to bug reports and feature requests.

# Contributing

You can contribute to this project cloning this repository and in your clone you just need to create a new branch using a 
name related to the new functionality which you'll create.  
When you finish your work, you just need to create a pull request which will be revised, merged to master branch (if the code 
doesn't break the project) and published as a new release.
