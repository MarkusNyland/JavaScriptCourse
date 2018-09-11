class TownElement {

    constructor(yearConstructed){
        this.yearConstructed = yearConstructed;
    }
}

class Park extends TownElement{

    constructor(yearConstructed, trees, area){
        super(yearConstructed);
        this.trees = trees;
        this.area = area;
    }

    getAge(){
        return 2018 - this.yearConstructed;
    }

    hasMoreThan1000Trees(){
        return this.trees > 1000;
    }

    treeDensity(){
        return this.trees/this.area;
    }

}

class Street extends TownElement{

    constructor(yearConstructed, length, size = 'normal'){
        super(yearConstructed);
        this.length = length;
        this.size = size;
    }

    getSize(){
        return this.size;
    }

}

let town = new Map();
town.set('Frognerparken', new Park(1943, 3017, 450000));
town.set('Museparken', new Park(1987, 84, 479));
town.set('Katteparken', new Park(1974, 353, 24000));
town.set('Kirkeveien', new Street(1855, 8000, 'big'));
town.set('Karl Johans gate', new Street(1690, 3768));
town.set('Trondheimsveien', new Street(1857, 13200, 'huge'));
town.set('Haxthausensgate', new Street(1911, 269, 'tiny'));

const totalStreetLength = function(){

    return [...town.values()]
        .filter(el => el instanceof Street)
        .map(el => el.length)
        .reduce((a,b) => a + b);

};

const averageStreetLength = function(){

    const total = totalStreetLength();

    return total <= 0 ? -1 : total/[...town.values()]
        .filter(el => el instanceof Street)
        .length;

};

const averageParkAge = function(){

    const parks = [...town.values()].filter(el => el instanceof Park);

    return parks.map(el => el.getAge())
        .reduce((a,b) => a+b) / parks.length;

};

const moreThan1000Trees = function(){

    const parks = [...town.values()].filter(el => el instanceof Park);

    return [...town.keys()][parks.findIndex(el => el.hasMoreThan1000Trees())];

};

console.log(totalStreetLength());
console.log(averageStreetLength());
console.log(averageParkAge());
console.log(moreThan1000Trees());

