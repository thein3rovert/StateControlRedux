//  Create the type of the action - ENUM 
const CAKE_ORDERED = 'CAKE_ORDERED'
// Implement  the action creator
// Define our action - object with a type property
function ordercake() {
   return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}


// Now lets create a reducer
// PreviousState - 10 cakes 
const initialState = {
    numOfCakes: 10,
    anotherProperty: 0, 
}
//(PreviousState, action) => newState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                //Create copy of state object
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
            default:
                return state
    }
}