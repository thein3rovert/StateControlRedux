const { STREET_UPDATED } = require('../actionTypes/actionTypes')


const initialState = {
    name: 'Visha',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA'
    },
}

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

module.exports = {nestedReducer}