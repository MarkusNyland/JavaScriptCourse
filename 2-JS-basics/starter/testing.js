//console.log(calculateAge());

calculateAge = function (year) {
    //console.log(this);
    return 2018 - year;
};

console.log(calculateAge(1996));

console.log(ageCalculation(1990));

function ageCalculation (year) {
    //console.log(this);
    return 2018 - year;
}

console.log(ageCalculation(1996));

console.log(ageCalculation);
