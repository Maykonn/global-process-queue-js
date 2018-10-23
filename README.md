# Global Process Queue

With the **Global Process Queue** you can manage a queue of execution for your system processes. This package provides
an API to create an initializer and a finisher to run before and after your queue of processes is emptied (optional).

## Example: A hypothetical case

Suppose you have a Cart on your e-commerce and this cart has several tasks, or processes (*Add Product*, *Remove Product*,
*Calculate Total*, etc). So with the Global Process Queue, you can orchestrate the *Cart Flow* - that is your *System Process Flow* - 
and what happens globally via the initializer and the finisher methods.

**We will use this simple example to provide a documentation as close as possible to a real-world example.** 

### The Initializer method

This method provides an API to you create a global process that happens before your queue be executed.

For example, suppose that you have a process called *Update Stock*. Probably this method needs to access a Database or a Cache Layer
to be executed, thus with the Initializer Method you can handle, for example, a Connection from your MySQL Connection Pool 
before the method be called by the *Queue Execution*, so when the Update Stock be called, the MySQL Connection will be
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


### The Finisher method

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
