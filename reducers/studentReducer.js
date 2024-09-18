const {CS_STUDENT_REMOVED} = require('../actionTypes/actionTypes')

// Initial state for the cake reducer
const initialStudentState = {
    enrolledStudent: 10,
}

// Create student reducer function

const studentreducer = (state = initialStudentState, action) => {
    switch(action.type){
        case CS_STUDENT_REMOVED:
            return {
                enrolledStudent: state.enrolledStudent - 2,
            }
            default:
                return state
    }
}

module.exports = {studentreducer}