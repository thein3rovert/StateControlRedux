First ew create a new folder called the `react-demo`, then we cd inside and enter the command
```bash
nmp init --yes
```
This created a package.json file for starter, after then we run the next command in other
to install redux:
```bash
npm install redux
```
The we created a package.json file, and console-log `from index.js` after then we enter the terminal
```bash
node index
```
This helps us  to see the result of the entry.

## Three core concept of redux
![alt text](/assets/image2.png)

![alt text](/assets/image.png)

- A Store hold the state of the application 
- Action describes the action (what happened) in the application
- Reducer handles the actions and decides to update the state - this is like the middle man in a a business.

## Three Principles

### First Principle
The global state of our application is managed and stored as a object in a single store.
- We Maintain our application state in a single object which would be m,anaged byy the redux store.

Let assume we are keeping track of the number of cakes on the shelf or lets say number  of document in a folder. 
Then the object of the document that will be managed in the store will look like this.

```json
{
    numberOfStudent: 10

    numberOfCakes: 20
}
```
The Object above will be managed by the store.

### Second Primciple 
The only way to change the state of an object is to dispatch an `action`, an object that describes what happens.
In simple terms, this means if you want to update the state of an action, you need to let redux know about that using an `action`, to me action is like a trigger or prompt(an object like prompt). We are not allow to directly update the state object without an action.

Referencing the image above, the `customer` is not allow to directly take the cake off the shelf, for the customer to be able to do that an action has to be perfomed and the action is - Scan the QR code and Place the order - `CAKE_ORDERED`. 
In this case the action is `CAKE_ORDERED`.

```json
{
    type: "CAKE_ORDERED"
    description: "Scan the QR code and Place the order"
}
```

### Third Principles
In other to specify how the state `tree` is updated based on `action`, we have to write pure `reducers` (clean_code) to determine how to state changes.
Pure reducer are pure `function` that takes the `previous` state and an action as `param`(input) and return thr `next` state.

```js
Reducer - (previosState, action) => newState
```
Just like using our cake Shop image above, reducer is the shopKeeper, the shopkeeper takes in the action `CAKE_ORDERED` and then return a new state.

```js
const reducer = (state = initialState, action) {
    switch (action.type) {
        case CAKE_ORDERED
            return .{
                numsOfCakes: state.numOfCake - 1
            }
    }
}
```
![alt text](/assets/draw.pngimage.png)
![alt text](image.png)

## ACTIONS
- Actions are the only way the application can interact with the store
- Actions carry information from app to the redux store.
- Actions are plain javascript object
- Actions have a type property that describe something that happens in the application.
- The type property is usually a string and defined as constants.
- We can have more than one property.

We can use an action creator to create an action, an action creator is basically a `function` that `returns` an action.

## Reducer
Reducer specify how the application state changes in response to actions sent to the store.
A reducer is a function that accepts state and actions as arguments, and return the next state of the application.

So we created a initalState, this is the state that we see when we first open the shop for example. 
```js
const initialState = {
    numOfCakes: 10
}
```
This mean in the morning when the shop was open the number of cakes in the shop is basically 10.

Then after that we now pass the initialState(previousState) in the reducers as a param(args).

```js
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                numOfCakes: state.numOfCakes - 1,
            }
            default:
                return state
    }
}
```
So the method reducer basically takes in the initialState and the action, using a switch statement, it checks if the action type of the actio is `CAKE_ORDERED`. If `true` then it returns numOfCakes - 1, so if the number of cakes is 10 it will return 9. If false it will `return` the state as it is.

In some other cases, where we have more than one properties in the object and we want to update the numOfCakes, we have to first create a copy of the state object using the spread properties.
```js
 return {
     //Create copy of state object
         ...state, // This creates a copy of the state object.
         numOfCakes: state.numOfCakes - 1,
}
```

## The redux Store
- Brings the actions and reducer together
- One store for the entire application - like a frontend database.
### Responsibility of the Redux Store
- Holds appliction State
- Store allows access to state by using the method `getState()`
- Store allows states to be updated via `dispatch(action)`
- Store registers listeners via subscribe(listener)
- Stores handles unregistering of listeners via functions returned by subscribe(listener)

The redux lib provide a method called `createStore` which we are going to use.
First we import our store from redux
```js
const redux = require('redux')
const createStore = redux.createStore
```
Then we create our store passing it the reducer, this makes the store hold the state of the application.
```js
const store = createStore(reducer)
```
Then after we use the method getState() to get the current state of the application and then printout the state to console
```js
console.log('Intial State', store.getState())
```
Then we Subscribe to the store, because the app cannot directly interact with the store it can only subscribe.
```js
store.subscribe(() => console.log('update state', store.getState()))
```
In other for us to update the store we have to use the dispatch method and then provide the action.
```js
store.dispatch(orderCake()) // THIS UPDATE THE STORE
store.dispatch(orderCake()) 
store.dispatch(orderCake()) 
```
Finally we unsubscribe from the store by returing the subscribe method
```js
const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))

unsubscribe()
```
