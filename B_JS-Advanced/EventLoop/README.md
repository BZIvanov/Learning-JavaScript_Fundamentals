# JavaScript Event Loop

JavaScript is **single-threaded** — it can only execute one piece of code at a time.
But it still feels asynchronous because of the **event loop**, which allows it to handle tasks like timers, promises, and user interactions without blocking the main thread.

## Key Components

1. **Call Stack**

   - Where synchronous code is executed.
   - Works like a stack (LIFO – last in, first out).
   - If the stack is busy, nothing else runs.

2. **Web APIs (Browser)**

   - Provided by the browser environment (or by Node.js in server-side).
   - Examples: `setTimeout`, DOM events, `fetch`, etc.
   - They run outside the JS engine and push callbacks to queues once finished.

3. **Task Queues**
   There are **two main types** of queues:
   - **Macrotask Queue (Tasks)**
     Contains:
     - `setTimeout`, `setInterval`
     - DOM events (click, keypress, etc.)
     - Network callbacks
   - **Microtask Queue**
     Contains:
     - `Promise.then / catch / finally`
     - `queueMicrotask`
     - `MutationObserver`

📌 **Important**: Microtasks have higher priority than macrotasks.

After every task, the event loop empties all microtasks before moving to the next macrotask.

## How the Event Loop works

1. Take the first task from the **macrotask queue**.
2. Execute it completely (synchronous + async calls scheduled).
3. Process **all microtasks** until the queue is empty.
4. If needed, update the UI (rendering, painting).
5. Repeat.

## Examples

### Example 1: Synchronous + Asynchronous

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

**Output**

```
Start
End
Promise   // microtask
Timeout   // macrotask
```

### Example 2: Multiple Microtasks

```js
console.log("Script start");

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("Promise 2"));

console.log("Script end");
```

**Output**

```
Script start
Script end
Promise 1
Promise 2
```

Sync logs run first. Promise callbacks (microtasks) are executed in order, after the synchronous code finishes.
