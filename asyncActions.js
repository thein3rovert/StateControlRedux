const redux = require('redux')
const createStore = redux.createStore
const {reducer} = require('./reducers/asyncActionsReducer')

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const store = createStore(reducer)
// Make API call and dispach the appropraite action we have in our as
module.exports = {initialState}