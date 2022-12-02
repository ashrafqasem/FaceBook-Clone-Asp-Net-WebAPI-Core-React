let data = 42;
let data2: any = 42;
data2 = 'ddd'

let data3: number | string = 42;

export interface Duck {
    name: string;
    numLegs: number;
    //makeSound: (sound: string) => void;
    makeSound?: (sound: string) => void;
}

const duck1 = {
    name: 'duck1Name'
    ,numLegs: 2
    ,makeSound: (sound: any) => console.log(sound)
}

const duck2 = {
    name: 'duck2Name'
    ,numLegs: 2
    ,makeQuack: (sound: any) => console.log(sound)
}

duck1.makeSound('dquackd');

const duck3: Duck = {
    name: 'duck3Name'
    ,numLegs: 2
    ,makeSound: (sound: any) => console.log(sound)
}

const duck4: Duck = {
    name: 'duck4Name'
    ,numLegs: 2
    ,makeSound: (sound: any) => console.log(sound)
}


//duck3.makeSound('wwww');
duck3.makeSound!('wwww');

export const ducks = [duck3, duck4]