
function determineMovement(from, to) {
    var higher;
    var lower;
    if (from > to) {
        higher = from;
        lower = to;
    }
    else {
        higher = to;
        lower = from;
    }

    var higherMinusLower = higher - lower;

    if (higherMinusLower % 8 === 0) {
        return { type: "vertical", length: (higherMinusLower / 8) }
    }

    var fromRowStart = from - (from % 8);
    var fromRowEnd = fromRowStart + 7;

    if (to >= fromRowStart && to <= fromRowEnd) {
        return { type: "horizontal", length: higherMinusLower }
    }

    var rows = ((higher - (higher % 8)) - (lower - (lower % 8))) / 8

    if (((higher - rows - (rows * 8)) === lower) || ((higher + rows - (rows * 8)) === lower)) {
        return { type: "diagonal", length: rows }
    }

    if (to === from + 6 || to === from + 10 || to === from + 15 || to === from + 17
        || to === from - 6 || to === from - 10 || to === from - 15 || to === from - 17) {
        return {type: "horse"}
    }

    return { type: "unknown", length: 0 }
}

function Pawn(colour) {
    this.colour = colour
    this.symbol = colour + 'P'

    this.isLegalMove = function(from, to) {
        var movement = determineMovement(from, to);
        return movement.type === "vertical" &&
            (movement.length === 1 || 
                (movement.length === 2 && 
                    ((from < 16 && from > 7 ) || (from < 56 && from > 47)))); 
  }
}

function Castle(colour) {
    this.colour = colour
    this.symbol = colour + 'C'

    this.isLegalMove = function(from, to) {
        var movement = determineMovement(from, to);
        return movement.type === "vertical" 
            || movement.type === "horizontal";
    }
}

function Horse(colour) {
    this.colour = colour
    this.symbol = colour + 'H'

    this.isLegalMove = function(from, to) {
        var movement = determineMovement(from, to);
        return movement.type === "horse" 
    }
}

function Bishop(colour) {
    this.colour = colour
    this.symbol = colour + 'B'

    this.isLegalMove = function(from, to) {
        var movement = determineMovement(from, to);
        console.log(movement)
        return movement.type === "diagonal" 
    }
}

function Queen(colour) {
    this.colour = colour
    this.symbol = colour + 'Q'

    this.isLegalMove = function(from, to) {
        var movement = determineMovement(from, to);
        return movement.type === "vertical" 
            || movement.type === "horizontal"
            || movement.type === "diagonal";
    }
}

function King(colour) {
    this.colour = colour
    this.symbol = colour + 'K'

    this.isLegalMove = function(from, to) {
        var movement = determineMovement(from, to);
        return (movement.type === "vertical" 
            || movement.type === "horizontal"
            || movement.type === "diagonal")
            && movement.length === 1;
    }
}

module.exports.pawn = Pawn;
module.exports.castle = Castle;
module.exports.horse = Horse;
module.exports.bishop = Bishop;
module.exports.queen = Queen;
module.exports.king = King;