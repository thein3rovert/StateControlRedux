//import { CAKE_ORDERED } from "./actionTypes"
const { CAKE_ORDERED, CAKE_RESTOCKED } = require('../actionTypes/actionTypes')


/*
===================
currentState
===================
*/
const initialState = {
    numOfCakes: 10
}


/*
===================
Reducer: (currentState, event)
===================
*/
 const cakereducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                //Create copy of state object
                numOfCakes: state.numOfCakes - 1,
            }
            case CAKE_RESTOCKED:
                return {
                    ...state,
                    numOfCakes: state.numOfCakes + action.payload,
                }
            default:
                return state
    }
} 

module.exports = {cakereducer}