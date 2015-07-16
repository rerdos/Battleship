var ships = [];

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

placeShip(5);
placeShip(4);
placeShip(4);

var prompt = require('prompt');

var userInput;

prompt.start();

prompt.get(['coordinate'], function (err, result) {
    console.log("jfoisdhfoisdiufhsdiofhisdhjf");
    console.log('coordinate: ' + result.coordinate);
    userInput = 4;

});

console.log(userInput);

function placeShip(length) {
    var coordinates = [];
    var coordinate;
    var i;
    var isHorizontal = Math.random() < 0.5;
    var newShip;

    if (isHorizontal) { 
    //horizontal 
        do {
            newShip = [];
            for (i = 0; i < length; i++) {
                if(i === 0) {
                    coordinates[0] = Math.floor(Math.random() * (10 - length + 1));
                    coordinates[1] = Math.floor(Math.random() * 10) + 1;
                    coordinate = letters[coordinates[0]] + coordinates[1];
                    newShip[newShip.length] = coordinate;
                } else {
                    coordinate = letters[coordinates[0]+i] + coordinates[1];
                    newShip[newShip.length] = coordinate;
                }
            }
        } while (!isValidPlace(newShip));
    } else { 
        //vertical 
        do {
            newShip = [];
            for (i = 0; i < length; i++) {
                if(i === 0) {
                    coordinates[0] = Math.floor(Math.random() * 10);
                    coordinates[1] = Math.floor(Math.random() * (10 - length + 1)) + 1;
                    coordinate = letters[coordinates[0]] + coordinates[1];
                    newShip[newShip.length] = coordinate;
                } else {
                    coordinate = letters[coordinates[0]] + (coordinates[1]+i);
                    newShip[newShip.length] = coordinate;
                }
            }
        } while (!isValidPlace(newShip));
    }
    ships[ships.length] = newShip;
}

function isValidInput(input) {
    var inputArray = input.split("");
    if (inputArray.length === 3) {
        return (inputArray[1] === '1' && inputArray[2] === '0');
    }

    if (inputArray.length !== 2) {
        return false;
    }

    if (isNaN(inputArray[1]) || inputArray[1] === '0') {
        return false;
    }

    for (var i = 0; i < letters.length; i++) {
        if (letters[i]===inputArray[0]) {
            return true;
        }
    }
    return false;
}

function isValidPlace(ship) {
    for (var i = 0; i < ship.length; i++) {
        if (isExist(ship[i])) {
            return false;
        }
    }
    return true;
}

function isExist(coordinate) {
    for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < ships[i].length; j++) {
            if (ships[i][j] === coordinate) {
                return true;
            }
        }
    }
    return false;
}
