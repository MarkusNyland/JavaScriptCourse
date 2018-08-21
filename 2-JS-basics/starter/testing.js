var calculageAge = function (year) {
    console.log(this);
    return 2018 - year;
};

console.log(calculageAge(1996));