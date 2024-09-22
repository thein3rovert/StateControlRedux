const redux = require('redux')
const {nestedReducer} = require('./reducers/nestedStateReducer')
const {updateStreet} = require('./actions/actions')


const store = redux.createStore(nestedReducer)
console.log('Initial State', store.getState())
const unsubscribe= store.subscribe(() => {
    console.log('Updated State ', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe