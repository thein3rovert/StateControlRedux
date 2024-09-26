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

> Questions
- How do i work with multiple reducers?
- Can we have more than one actions in one action creator?
- How do we struture actions in the creator?

- Stopped at Restocking Cakes.

So i modularize the code, make sure each functionalities have different folder.

Today we will be starting from the restocking cake section
## Restocking Cakes
Everyday, a vendor comes to the shop to restock the shelves.
The vendor can stock up one or more number of cakes depending on the previous day sales. 
- Actor
Vendor
Stock
Shelves

- Use cases
Restock the cakes on shelves
### Implementation
1.  First we need to determine the action type
- ActionType
`CAKE_RESTOCKED` is the eveent that happen whent the vendor restock the cake.
2. Use the action type to define an action creator
- Action Creator
We create a restock function called restockCake and then return an object with a property type and then we added a quantity parameter for the cake object.
```js
 function restockCake(quantity = 1) {
    return {
        type: CAKE_RESTOCKED,
        quantity
    }
 }
```
3. Create a reducer from the cakeRestock

In this example we will not create a new reducer for the cake restock, instead we will use an existing reducer meaning we will only update the state of the cakeReducer.

So first we create a new case statement and then return a new `object`. 
> Always remember in `redux` we dont directly `mutate/update` state so what we have to do is `spread` the existing state [...] so that we dont affect other `properties` in the state object in our case we previously had a `numOfCakes` `properties` related to the case `CAKE_ORDERED` and we dont want to affect that.

So when a cake restock `event` has been dispatched(executed/activated/triggered), we want to `increase` the number of cake

```js
    case CAKE_RESTOCKED:
        return {
        ...state,
        numOfCakes: state.numOfCakes + 1
    }
```
In the code (case) above this will only restock only one cake, because we hardcodede the value to restock, so the best thing to do is use the param associated with the restockCake function.
```js
    case CAKE_RESTOCKED:
        return {
        ...state,
        numOfCakes: state.numOfCakes + action.quanity
    }
```
This will restock based on the quantity provided.
4. Store
Now in the stock since we initially removed 4 cakes from the numOfCakes, we will make sure the quantity for the restock cake will be 4, you can restock any number but just so we can see the stock bacl to being full(10). 
So we go to our subscribed Store and dispatch teh restockCake event passing in the quantity.
```js
store.dispatch(restockCake(4))
```
> Tips
Always make sure to use payload instead of quantity, becuase in redux paylaod is used for any addtional attributed.
```js
 function restockCake(quantity = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: quantity // Renamed
    }
 }

return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload //Renamed
}
```
Then we run
```bash
node index
```

### Bind Action Creators
This is a helper function provided by Redux.
So for the bind action, first we need to import the  bindActionCreator helper function
```js
const bindActionCreators = redux.bindActionCreators
```
Then we created a new function called actions, that takes in the bindActionCreator which takes in the actions and then dispatch the store.
```js
const actions = bindActionCreators({ordercake, restockCake}, store.dispatch)
```
Then we call the actions and dispatch the actions
```js
actions.ordercake()
actions.restockCake(4)
```
BindActionCreators is not really neccessary, use to be helpful but not anymore.

## Cake and Ice creams (Cake Shop Expansion)
- We have a Cake shop
- Cakes stored on the shelf
- The ShopKeeper handles CAKE_ORDERED from customer
---------------------------------------------------------
- Now the cake shop want to expland to ice creams!!
- Ice Creams will be stored in the Freezer
- We have a new shopkeeper to handle the `ICECREAM_ORDERED` from customer.

One most important thing to keep in mind is that the `state` of the shop is now
both the `cakes` on the shelf along with the number of `ice-creams` in the freezer.

We could have just one shop keeper handle the state of the shop but what if we want to scale the shop..thats why we have two shop keeper instead.
One person selling both cakes and ice cream will be somehow difficault to handle.

Also if something was to happen with the cake order we narrow it down to the shopkeeper than handle the CAKE_ORDER and if the something was to happen with the ice-cream we can narrow it down to the shopkeeper that handle the ICE_CREAM order.

### Multiple Reducer
In this section, because we have new shop item( iceCream), we have to have new actions related to the ice cream like restocking the shelf with ice cream and handling ice-cream order.
- First we have to define the actionTypes
```js
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';
```
- Then we define the actions creators for the actionTypes
```js
function orderIceCream(quantity = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: quantity
    }
}
function restockIceCream(quantity = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: quantity
    }
}
```
- Next we add another state object to the initial property, since the ice cream belongs to the shop and also on the same shelf, we dont have to create a new state for the for the ice cream, we just have to update the state.

```JS
const iceCreamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                //Create copy of state object
                numOfIceCreams: state.numOfIceCreams - 1,
            }
            case ICECREAM_RESTOCKED:
                return {
                    ...state,
                    numOfIceCreams: state.numOfIceCreams + action.payload,
                }
            default:
                return state
    }
} 
```
> Warning
You cannot pass in more than one reducers to a store, this can only be done using combine reducer which we will get to later.

In the case of using multiple reducers we will create two state, one for cake and one for ice cream. This was our state before, now we will break it down into two state so they wont affect each other.
```js
const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamsState = {
    numOfIceCreams: 20
}
```
Now we will also create two reducers,one for handling cake and other for handling icecream

## Combine Reducers
First we import with combineReducers, this helps us to combine multiple reducers.
```js
const combineReducers = redux.combineReducers
```
Then we create a rootReducer function, this function hold the values of all the reducer by passing it a key and then a values , the value being the reducers.
```js
const rootReducer = combineReducers({
    // (Key = values)
    cake: cakereducer,
    iceCream: iceCreamReducer
})
```
As explained above, instead of passing multiple reducers to the store, we only need the pass in the rootReducers instead.
```js
const store = createStore(rootReducer)
```

## Immer
Immer is a library that will help when workng with redux.
In the case where we have nested-state, it can be quite complicated to update a propeety in a state without affecting to other properties, previously we use spread to basically update the properties of the initial state so we dont affect others. 

Let give an example, we will create a nested0-state called the `nested-state` then we create our initial state.
```js
const intialState = {
    name: 'Visha',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA'
    },
}
```
so what we want to do now is chanage the street address in this object without affecting the other properties in this object.

Here is how we will do this in the redux pattern:
- First we create action type
```js
const STREET_UPDATED = "STREET_UPDATED"
```
- We define the action creator which returns the action object, so we pass in the street as the param because we will be passing in and returning the street.
```js
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}
```
- Define the reducer to handle the action
```js
const nestedReducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                },
            }
        default: {
            return state
        }
    }
} 
```
The `nextReducer` serves as a reducewr for the nested state, it takes in the initial state and an action, the create a switch statement that perform an action if the case is `STREET_UPDATED`, so it the action is triggered update the state and return an object if the street. So we had to first spread the state then spread the address so we wont affect other properties of the state and address object.

- Create the store and subscribe to the store
```js
const store = redux.createStore(nestedReducer)
console.log('Initial State', store.getState())
const unsubscribe= store.subscribe(() => {
    console.log('Updated State ', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe
```
Finally we created a redux store which takes in the reducer and the subscribe to the store.

Todo: Continue with using immer to simplify the nested-state then implement changing the state or the Name in the object.
#### Immer impl
So we can also spread the state each time we want to make an update to this state properties which is fine but in a much larger application, it is really hard to keep track of the states so in other to improve and simplify this process we make use of a library called `Immer`.

- First we need to install the package
```bash
npm i immer
```
- Import a method called producer from the immer library
```js
const produce = require('immer').produce
```
- Instead of returning the properties, we will just return produce.
```js
return produce(state, () => (draft) => )
```
The first arg is the current state, the second arg is the `function` which `recieves` a `draft` copy of the `state`. 

Immer allows is to do is udpdate the draft copy of the state as if the state is multable. 
```js
  return produce(state, (draft) => {
                draft.address.street = action.payload
            })
```
In this code above using the immer we are updating the properties directly, however under the hood, immer is doing something similar to this.
```js
// return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     },
            // }
```
So now if we save an run, `node nexted-state` we get the same output as before.
So basically Immer simplify handling complex data structures and work very well with redux.

### Middleware
Middleware is an suggested way to extend redux with custom functionality, if there is any case where we want redux with extra features then middleware is the way to go.

In provides a thirdpary extension point between ==dispacting an action== and the moment it reaches the reducer.

Middleware can be use for crash reporting, logging, performing asynchronous tasks etc. 

#### How to use a middleware
Using the redux logger lib - log every information relating to redux application.
```bash
npm i redux-logger
```
Next we impoer the redux logger from redux logger, using the reduxlogger we were able to create our logger middleware for the application.
```js
const logger = reduxLogger.createLogger() 
```
In other to imclude a middleware, the reduxLogger library offers a funtion called `appyMiddleware` which is used to apply middleware. Now we will import the apply middleware function. 

After importing the applyMiddleware function we will then go to the createStore function and then add the applyMiddleware as arg, we can add as many middleware as want in the application,
```js
const applyMiddleware = redux.applyMiddleware
const store = createStore(rootReducer, applyMiddleware(logger))
```
Then finally we will remove the console-log statement in the store subscribtion as we now have the logger to handle that and if we run the application we should be able to see thw logs.
```text
Intial State { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
 action CAKE_ORDERED @ 12:54:12.632
   prev state { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
   action     { type: 'CAKE_ORDERED', quantity: 1 }
   next state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 20 } }
 action CAKE_ORDERED @ 12:54:12.634
   prev state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 20 } }
   action     { type: 'CAKE_ORDERED', quantity: 1 }
   next state { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 20 } }
 action CAKE_ORDERED @ 12:54:12.636
   prev state { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 20 } }
   action     { type: 'CAKE_ORDERED', quantity: 1 }
```
Steps
1. Import applyMiddleware
2. Pass it as an argument to the createStore
3. Then pass in the middleware to the applyMiddleware.

## Async Actions
- Synchronous Actions: This mean as soon as an action was dispatch, then state was updated immediately. When we dispatch the `CAKE_ORDERED` action, the `numOfCakes` was immediately `decremented` by 1. Same with the other actions as well.

- Async Actions: We will need this actions when we want to call to fectch data from an end point and use the data in an application.

### Application
The application we are going to build will `fetch` a list of `users` from  an API end point and `stores` it in the redux `store`.

In other to do this we need to first understand the following:
- State
- Action
- Reducer


#### State Object
```js
{
 loading: true, //Indicate weather is data is currently being fectch or not.
 data: [], // Data that is being fetch (users), currently empty(no users)
 error: '' // Incase our Api request fail for some reason, we store the error messages.
}
```
- Loading: Display a loading spinner in component.
- Data: List of users.
- error: Display error to the user.


#### Action Object
- FETCH_USERS_REQUESTED - Fetch list of users
The second and the third action are dependent on the first action, if the FETCH_USERS_REQUESTED is successful then can we get the list of users else we get an error.
- FETCH_USERS_SUCCEEDED - Users fetch successfully
- FETCH_USERS_FAILED - Error when fetching the users.


#### Reducer Object
- If action type is FETCH_USERS_REQUESTED, we set loading to true.
```js
case: FETCH_USERS_REQUESTED
    loading: true
```
- If action type is FETCH_USERS_SUCCEEDED, we set loading to false and users returned from the API.
```js
case: FETCH_USERS_SUCCEEDED
    loading: false
    users: data (from API)
```
- If action type is FETCH_USERS_SUCCEEDED, we set loading to false and error to error returned from the API.
```js
case: FETCH_USERS_FAILED
    loading: false
    users: error (from API)
```
#### Application Implementation
- Defines the state
```js
const initialState = {
    loading: false,
    users: [],
    error: '',
}
```
- Defines the action
```js
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
```
- Defines the reducer

- Create redux store
What is next now is making an api call and dispatch the appropriate api call.

## Redux Thunk Middleware
Making an API call when working with redux, there are twp packages we need to install:
1. AXIOS - This will be used to make GET request to an API endpoint.
2. REDUX-THUNK: This is the standard way to define async action creators in a redux application. This middle-thunk library is the `middleware` we will be applying to our redux store.  

#### Define Async action creator using AXIOS and REDUX-THUNK
- First we need to install the two packages:
```bash
npm i axios redux-thunk
```
- Apply the redux-thunk middleware to our redux store, in other to do this have to first import the applymiddleware function then after we add the applymiddleware to our createStrore param. 
```js
const applyMiddleware = redux.applyMiddleware
const store = createStore(reducer, applyMiddleware)
```
The argument to apply middleware will be the `thunk` middleware unlike the previous applymiddleware were we passed in the logger. In this case we are passing in the thunk. In other to add the thunk Middleware we first have to import the thunk redux-thunk then pass it to the applyMiddleware.
```js
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
```
Now the final step is to define our async action creator, in the case of the async action creator we all know that `initally` an `actionCreator` is meant to return an `action` but what is require by the `thunk middleware` is the ablity for an action to return a `function` instead of an `action` object(advantage).

>What is allow by this fuctuin is it doesnt have to be pure, it is allowed to have side effects such as the asynchronous api call and these functions can also dispatch actions like the one we have seen before. This done because the function recieves the `dispatch` actions as argument.
```js
const fetchUsers = () => {
    return function(dispatch) {
        axios.
    }
}
```

Now lets see how to call axios in the fuction, first we need to import axios, for the request we are going to be using `JSON PLACEHOLDER.`
So in the return function we pass in the dispatch and then use axios to get a user object from the Json Placeholder Library then dispatching the action to the response.
```js
const fetchUsers = () => {
    return function(dispatch) {
        // Before we dispatch our api we have to dispatch our actions
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            //respose.data is the users 
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
           // error.message is the error message
           dispatch(fetchUsersFailure(error.message))
        })
    }
}
```
After we then subscribe to the store and dispatch the fetchUsers functions.
```js
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
```
Then we run the application, This is the end of the Redux, then next thing to move to is redux toolkit so thats what we are going to be working in next.

```bash
node index.js
node nested-state.js
node asyncActions.js
```





