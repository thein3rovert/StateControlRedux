const { CAKE_ORDERED, CS_STUDENT_REMOVED, CAKE_RESTOCKED, ICECREAM_ORDERED, ICECREAM_RESTOCKED, STREET_UPDATED } = require('../actionTypes/actionTypes.js');

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
function:orderIceCream
===================
*/
function orderIceCream() {
    return {
        type: ICECREAM_ORDERED,
        quantity: 1,
    }
}
function restockIceCream(quantity = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: quantity, 
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

  /*
===================
function:updateStreet
===================
*/
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}
 module.exports = { ordercake, csStudentRemoved, restockCake, orderIceCream, restockIceCream, updateStreet };