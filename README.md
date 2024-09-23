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