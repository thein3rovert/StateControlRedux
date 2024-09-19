//import { CAKE_ORDERED } from "./actionTypes"
const { CAKE_ORDERED, CAKE_RESTOCKED } = require('../actionTypes/actionTypes')

// Initial state for the cake reducer
const initialState = {
    numOfCakes: 10
}

// Cake reducer function
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