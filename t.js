var fs = require("fs");
var cont = fs.readFileSync("data.json");

/* let text = 'Thu, 17 Jan 2019, 12:00pm - 03:00pm (GMT+11) AEST'.split(',');
let extractedDate = text[1].trim().split(' ');
let day = extractedDate[0];
let month = extractedDate[1];
let year = extractedDate[2];
console.log(extractedDate); */
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
                addSession(items, sessions, i);
            }

            addCourse(courses, id, sessionCount, title, url, sessions);

            //clear the sessions array
            sessions = [];
        }
    }

    addSession(items, sessions, i);

    var title = items[i].courseTitle ? items[i].courseTitle : '';
    var sessionCount = items[i].offeringCount ? items[i].offeringCount : 0;
    var id = items[i].courseId ? items[i].courseId : 0;
    var url = items[i].courseDetailsURL ? items[i].courseDetailsURL : 'www.sgs.com';
}

//last element of the array
var itemsLastIndex = items.length - 1;
courses.push({
    "courseId": items[itemsLastIndex].courseId,
    "sessionsCount": items[itemsLastIndex].offeringCount,
    "courseTitle": items[itemsLastIndex].courseTitle,
    "sessions": sessions
});

console.log('courses ', courses.length);
console.log('sessions first course ', courses[0].sessions.length);
//console.log(courses);
//console.log(courses[1].sessions[0]); 

function addCourse(courses, id, sessionCount, title, url, sessions) {

    courses.push({
        "courseId": id,
        "sessionsCount": sessionCount,
        "courseTitle": title,
        "courseUrl": url,
        "sessions": sessions
    });

}

function addSession(items, sessions, i) {
    sessions.push({
        "courseTitle": items[i].courseTitle ? items[i].courseTitle : '',
        "dates": items[i].offeringDates ? items[i].offeringDates : '',
        "location": items[i].location ? items[i].location : '',
        "courseId": items[i].courseId ? items[i].courseId : 0,
        "courseUrl": items[i].courseDetailsURL ? items[i].courseDetailsURL : 'www.sgs.com'
    });
}