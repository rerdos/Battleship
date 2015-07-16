var ships = [];

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

var guessedCoords = [];

// generate ships to random positions
placeShip(5);
placeShip(4);
placeShip(4);

// user input
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
console.log(ships);
console.log("To start the game, input a coordinate (for example 'F5'):");

rl.on('line', function(line) {
    if (isValidInput(line)) { // if the user has typed a valid input
        if (isGuessed(line)) { // checks if the user has typed that value before
            console.log("You have already guessed that coordinate!");
        } else {
            guessedCoords.push(line); // if he/she hasn't guessed that before than save it
            if (isExist(line)) { // if the user find a ship
                console.log("You've just bombed that coordinate!");
                setCoordinateToX(line); // set that coordinate x, so we will know that part of the ship has sunk
                if (isGameOver()){ // if he finds all the ships and their parts then it's game over
                    console.log("You have finished the game!");
                    process.exit(); // ends the input
                }
            } else {
                console.log("There was nothing on that coordinate!");
            }
        }
    } else {
        console.log("You have entered an invalid coordinate!");
    }
});

function placeShip(length) {
    var coordinates = [];
    var coordinate;
    var i;
    var isHorizontal = Math.random() < 0.5; // decided if the ship will be horizontally or vertically
    var newShip;

    if (isHorizontal) { 
    // This will run if the program decides to place down a ship horizontally
        do {
            newShip = [];
            for (i = 0; i < length; i++) {
                if(i === 0) {
                    // this will run if newShip is empty
                    coordinates[0] = Math.floor(Math.random() * (10 - length + 1)); // first coordinate (1-(10-length)) (this will be changed to letter)
                    coordinates[1] = Math.floor(Math.random() * 10) + 1;    // second coordinate (number 1-10)
                    coordinate = letters[coordinates[0]] + coordinates[1]; // converts those coordinates to string
                    newShip[newShip.length] = coordinate; // puts it into the newShip variable
                } else {
                    // this will run if newShip isn't empty
                    coordinate = letters[coordinates[0]+i] + coordinates[1]; // next letter (right), the number remains the same
                    newShip[newShip.length] = coordinate; // puts it into the newShip variable
                }
            }
        } while (!isValidPlace(newShip)); // redo if it has been generated on another ship (or crossed it)
    } else {
        // This will run if the program decides to place down a ship vertically
        do {
            newShip = [];
            for (i = 0; i < length; i++) {
                if(i === 0) {
                    // this will run if newShip is empty
                    coordinates[0] = Math.floor(Math.random() * 10); // first coordinate (1-10) (this will be changed to letter)
                    coordinates[1] = Math.floor(Math.random() * (10 - length + 1)) + 1; // second coordinate (number 1-(10-length))
                    coordinate = letters[coordinates[0]] + coordinates[1]; // converts them to string
                    newShip[newShip.length] = coordinate; // puts them into the newShip variable
                } else {
                    // this will run if newShip isn't empty
                    coordinate = letters[coordinates[0]] + (coordinates[1]+i); // the letter remains the same, the number increments
                    newShip[newShip.length] = coordinate; // puts them into the newShip variable
                }
            }
        } while (!isValidPlace(newShip)); // redo if it has been generated on another ship (or crossed it)
    }
    ships[ships.length] = newShip; // puts the newShip array inside the ships array
}

function isValidInput(input) { // checks the input
    var inputArray = input.split(""); // splits the string into an array and puts it inside the inputArray
    if (inputArray.length === 3) { // if the user entered 3 character
        return (inputArray[1] === '1' && inputArray[2] === '0'); // decides if it's valid or not
    }
    // otherwise
    if (inputArray.length !== 2) { // if its length isn't 2
        return false;
    }

    if (isNaN(inputArray[1]) || inputArray[1] === '0') { // if the second character isn't number or the second character is 0
        return false;
    }

    // checks if the letter is correct
    for (var i = 0; i < letters.length; i++) {
        if (letters[i]===inputArray[0]) {
            return true;
        }
    }

    // if it isn't
    return false;
}

// checks if the 'ship' has been generated on another ship (or crossed it)
function isValidPlace(ship) {
    for (var i = 0; i < ship.length; i++) {
        if (isExist(ship[i])) {
            return false;
        }
    }
    return true;
}

// checks if the 'coordinate' exist in the ships array
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

// if every value in the ships array is 'x' then it's the end of the game
function isGameOver() {
    for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < ships[i].length; j++) {
            if (ships[i][j] !== 'x') {
                return false;
            }
        }
    }
    return true;
}

// checks if the user has played that coordinate before
function isGuessed(coordinate) {
    for (var i = 0; i < guessedCoords.length; i++) {
        if (coordinate === guessedCoords[i]) {
            return true;
        }
    }
    return false;
}

// sets 'coordinate' to x in the ships array
function setCoordinateToX(coordinate) {
    for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < ships[i].length; j++) {

            if (ships[i][j] === coordinate) {
                ships[i][j] = 'x';
                isShipSink(i);
            }
        }
    }

    // checks if the current ship has sunk
    function isShipSink(currentShip) {
        for (var i = 0; i < ships[currentShip].length && ships[currentShip][i] === 'x'; i++) {}
        if (i === ships[currentShip].length) {
            console.log("You have sunk that ship!");
        }
    }
}