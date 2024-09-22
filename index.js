const { cakereducer } = require('./reducers/cakeReducer'); 
const { studentreducer } = require('./reducers/studentReducer');
const { ordercake, csStudentRemoved, restockCake, orderIceCream, restockIceCream } = require('./actions/actions')
const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators


/*
======================
1. Create the type of the ACTION - ENUM 
const CAKE_ORDERED = 'CAKE_ORDERED'
const CS_STUDENT_REMOVED = 'STUDENT_REMOVED'
Implement  the action creator
Define our action - object with a type property
function ordercake() {
   return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}
function csStudentRemoved() {
    return {
        type: CS_STUDENT_REMOVED,
        description: "Number of computer science student removed from course",
    }
}



(PreviousState, action) => newState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                //Create copy of state object

                numOfCakes: state.numOfCakes - 1,
            }
            default:
                return state
    }
}

const studentReducer = (state = initialStudentState, action) => {
    switch(action.type){
        case CS_STUDENT_REMOVED:
            return {
                enrolledStudent: state.enrolledStudent - 2,
            }
            default:
                return state
    }
}
======================
*/


/* 
======================
Create and Unsubscribe from store
======================
*/

// 1. Redux store holds the application state
const store = createStore(cakereducer)
// 2. Allows access to state via getState()
console.log('Intial State', store.getState())
// 3. Allow apps to subscribe to the store
const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))


/* 
======================
Povides a dispatch method to update the state
With and Without bindActionsCreator
======================
*/
// store.dispatch(ordercake())
// store.dispatch(ordercake())
// store.dispatch(ordercake())
//store.dispatch(ordercake())
//store.dispatch(restockCake(4))
const actions = bindActionCreators({ordercake, restockCake, orderIceCream, restockIceCream}, store.dispatch)
actions.ordercake()
actions.ordercake()
actions.ordercake()
actions.ordercake()
actions.restockCake(4)

/* 
======================
IceCream Dispatch
Todo: Need to fix issue with returning the state.
======================
*/
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)



/* 
======================
Unsubscribe from the store by calling the Unsubscribe method in other to do 
that we have to add a return to the subscribe method above
======================
*/
unsubscribe()

/* 
======================
Student Store
======================
*/
const studentStore = createStore(studentreducer)
console.log('Intial Student State', studentStore.getState())

const unsubscribeStudent = studentStore.subscribe(() => console.log('update state', studentStore.getState()))
studentStore.dispatch(csStudentRemoved())
studentStore.dispatch(csStudentRemoved())
studentStore.dispatch(csStudentRemoved())
unsubscribeStudent()
