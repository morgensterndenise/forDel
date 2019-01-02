
let a = '18 Feb 2019';
let sessionDay = new Date(a);
let tomorrow = sessionDay.setDate(sessionDay.getDate() + 1);

//let sessionDay = new Date(a); //17 jan



let imputFromDay = new Date('2019-01-17');

let imputTillDay = new Date('2019-03-17');


console.log(sessionDay);
console.log(imputTillDay);


//(sessionDay + 1)
if(tomorrow >= imputFromDay &&  sessionDay <= imputTillDay.setDate(imputTillDay.getDate() + 1)){
    console.log('entered');
}