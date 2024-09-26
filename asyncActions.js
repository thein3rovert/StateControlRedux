const redux = require('redux')
const createStore = redux.createStore
const {reducer} = require('./reducers/asyncActionsReducer')
const applyMiddleware = redux.applyMiddleware
const {thunk} = require('redux-thunk')
const axios = require('axios')
const {fetchUsersSuccess, fetchUsersRequest, fetchUsersFailure} = require('./actions/asyncActionCreators')


const initialState = {
    loading: false,
    users: [],
    error: '',
}

/* 
======================
Thunk Middleware action Creator.
======================
*/
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

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
module.exports = {initialState};