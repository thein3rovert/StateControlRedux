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
//(PreviousState, action) => newState
