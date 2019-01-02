var fs = require("fs");
var cont = fs.readFileSync("data.json");

var moment = require('moment'); //.format('LL')
var inputFromDayMoment = moment(new Date('2019-01-17')).format('LL');//new Date('2019-01-17'); //TODO take it from bot input
var inputFromDay = moment(new Date(inputFromDayMoment)).toDate();
var inputTillDayMoment = moment(new Date('2019-03-07')).format('LL');//new Date('2019-03-07'); //TODO take it from bot input
var inputTillDay = moment(new Date(inputTillDayMoment)).toDate();

const parsed = JSON.parse(cont);
var items = parsed.items;
var sessions = [];
var courses = [];
let courseId = 0;
let prevCourseId = 0;


for (let i = 0; i < items.length; i++) {
    courseId = items[i].courseId;

    if (courseId != prevCourseId) {

        prevCourseId = courseId;

        //always will have at least 1
        if (sessions.length > 0) {


            if (items.length === 1) {
                addSession(items, sessions, i, inputFromDay, inputTillDay);
            }

            addCourse(items, courses, i, id, sessionCount, title, url, sessions, inputFromDay, inputTillDay);

            //clear the sessions array
            sessions = [];
        }
    }

    addSession(items, sessions, i, inputFromDay, inputTillDay);



    var title = items[i].courseTitle ? items[i].courseTitle : '';
    var sessionCount = items[i].offeringCount ? items[i].offeringCount : 0;
    var id = items[i].courseId ? items[i].courseId : 0;
    var url = items[i].courseDetailsURL ? items[i].courseDetailsURL : 'www.sgs.com';
}

//last element of the array
var itemsLastIndex = items.length - 1;
//addArray = addToArray(items, itemsLastIndex, inputFromDay,inputTillDay);

if (sessions.length > 0) {
    courses.push({
        "courseId": items[itemsLastIndex].courseId,
        "sessionsCount": items[itemsLastIndex].offeringCount,
        "courseTitle": items[itemsLastIndex].courseTitle,
        "sessions": sessions
    });
}


console.log('courses ', courses.length);
if (courses.length >= 1) {
    console.log('sessions first course ', courses[0].sessions.length);
}

if (courses.length > 1) {
    console.info("second course sessions ", courses[1].sessions.length);
}

//console.log('sessions second course ', courses[1].sessions.length);
//console.log(courses);
//console.log(courses[0].sessions[0]); 

function addCourse(items, courses, i, id, sessionCount, title, url, sessions, inputFromDay, inputTillDay) {

    //   var addArray = addToArray(items, i, inputFromDay,inputTillDay);

    //if(addArray){
    courses.push({
        "courseId": id,
        "sessionsCount": sessionCount,
        "courseTitle": title,
        "courseUrl": url,
        "sessions": sessions
    });
    //}
}

function addSession(items, sessions, i, inputFromDay, inputTillDay) {

    let addArray = addToArray(items, i, inputFromDay, inputTillDay);

    if (addArray) {
        sessions.push({
            "courseTitle": items[i].courseTitle ? items[i].courseTitle : '',
            "dates": items[i].offeringDates ? items[i].offeringDates : '',
            "location": items[i].location ? items[i].location : '',
            "courseId": items[i].courseId ? items[i].courseId : 0,
            "courseUrl": items[i].courseDetailsURL ? items[i].courseDetailsURL : 'www.sgs.com'
        });
    }
}

function addToArray(items, i, inputFromDate, inputTillDate) {

    //'Thu, 17 Jan 2019, 12:00pm - 03:00pm (GMT+11) AEST'; 
    // "Thu, 17 Jan, 12:00pm - 03:00pm (GMT+11) AEST"
    let textDate = items[i].offeringDates.split(',');
    let extractedDate = textDate[1].trim();
    let containsYear = extractedDate.split(" ");

    if(containsYear.length === 2){
        //if enters here, IPLUS date doesn't contains year
        extractedDate = addCurrentYear(extractedDate);
    }

    let sessionDateMoment = moment(new Date(extractedDate)).format('LL');
    let sessionDate = moment(new Date(sessionDateMoment)).toDate();

   /*  if (sessionDate >= inputFromDate)  {
          if(sessionDate <= inputTillDate){
            return true;
          }
    } */
    
    if(moment(sessionDate).isSameOrAfter(inputFromDate) && moment(sessionDate).isSameOrBefore(inputTillDate)){
        return true;
    }

    return false;
}

function addCurrentYear(extractedDate){
    let currentYear;
    let currentDate = new Date();
    currentYear = currentDate.getFullYear();
    extractedDate = extractedDate + " " + currentYear.toString();
   return extractedDate;
}