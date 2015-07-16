var ships = [
    ['A1', 'A2', 'A3', 'A4', 'A5']
];

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

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
