//import { CAKE_ORDERED } from "./actionTypes"
const { CAKE_ORDERED, CAKE_RESTOCKED, ICECREAM_ORDERED, ICECREAM_RESTOCKED } = require('../actionTypes/actionTypes')


/*
===================
currentState
Question? Do we have to keep the state in the same class as the reducer
===================
*/
const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}


/*//
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

/* 
======================
Ignore IceCream redcucer
======================
*/

// const iceCreamReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ICECREAM_ORDERED:
//             return {
//                 ...state,
//                 //Create copy of state object
//                 numOfIceCreams: state.numOfIceCreams - 1,
//             }
//             case ICECREAM_RESTOCKED:
//                 return {
//                     ...state,
//                     numOfIceCreams: state.numOfIceCreams + action.payload,
//                 }
//             default:
//                 return state
//     }
// } 

module.exports = {cakereducer}