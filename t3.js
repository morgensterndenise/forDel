var moment = require('moment');
var inputFromDay = new Date('2019-01-17');
const date = moment('2019-01-17').format('LL'); //January 17, 2019
//moment(someMoment).startOf('day')

let first = moment('2010-10-20').isSameOrBefore('2010-10-21');  // true
let second = moment('2012-10-20').isSameOrBefore('2011-10-20', 'year');  // true 1ta data dali e sushstata ili predi

console.log(first);
console.log(second);
console.log(new Date('10-20'));

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
console.log(currentYear);