const { CAKE_ORDERED, CS_STUDENT_REMOVED } = require('../actionTypes/actionTypes.js');

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

 module.exports = { ordercake, csStudentRemoved };