const { CAKE_ORDERED, CS_STUDENT_REMOVED, CAKE_RESTOCKED } = require('../actionTypes/actionTypes.js');

/*
===================
function:ordercake 
===================
*/
 function ordercake() {
    return {
         type: CAKE_ORDERED,
         quantity: 1,
     }
 }
 /*
===================
function:restockCake 
===================
*/
 function restockCake(quantity = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: quantity
    }
 }
 /*
===================
function:csStudentRemoved 
===================
*/
 function csStudentRemoved() {
     return {
         type: CS_STUDENT_REMOVED,
         description: "Number of computer science student removed from course",
     }
 }

 module.exports = { ordercake, csStudentRemoved, restockCake };