var ships = [
    ['A1', 'A2', 'A3', 'A4', 'A5']
];

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function placeShip(length) {
    var isHorizontal = Math.random() < 0.5;
    var newShip;
    if (isHorizontal) { 
    //horizontal 
        var coordinates = [];
        var coordinate;
        do {
            newShip = [];
            coordinates[0] = Math.floor(Math.random() * (10 - length + 1));
            coordinates[1] = Math.floor(Math.random() * 10) + 1;
            coordinate = letters[coordinates[0]] + coordinates[1];
            newShip[newShip.length] = coordinate;
        } while (isExist(coordinate));
    } else { 
        //vertical 
        console.log('vertical');
    }
    console.log(newShip);
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
