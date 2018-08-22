var john = {

    johnArray: [124, 48, 268, 180, 42],
    johnWithTip: [],
    tip: function () {
        for (var i = 0; i<this.johnArray.length; i++){
            if(this.johnArray[i]<50){
                this.johnWithTip.push(this.johnArray[i] * 1.2);
            }

            else if(this.johnArray[i]<200){
                this.johnWithTip.push(this.johnArray[i] * 1.15);
            }

            else {
                this.johnWithTip.push(this.johnArray[i] * 1.1);
            }
        }
    }
};

console.log(john.johnArray);
console.log(john.tip());
console.log(john.johnWithTip);




var markArray = [77, 375, 110, 45];
var markWithTip = [];

for (var i = 0; i<markArray.length; i++){
    if(markArray[i]<100){
        markWithTip.push(markArray[i] * 1.2);
    }

    else if(markArray[i]<300){
        markWithTip.push(markArray[i] * 1.1);
    }

    else {
        markWithTip.push(markArray[i] * 1.25);
    }
}

console.log(markArray);
console.log(markWithTip);
console.log(average());


function average() {

    var jSum = 0;
    var mSum = 0;

    for (var i = 0; i<john.johnWithTip.length; i++){
        jSum += john.johnWithTip[i];
    }

    for (var j = 0; j<markWithTip.length; j++){
        mSum += markWithTip[j];
    }

    return jSum / john.johnWithTip.length > mSum / markWithTip.length ? 'john' : 'mark';

}