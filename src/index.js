import "./index.css";

var React = require('react')
var ReactDom = require('react-dom')
var Pieces = require('./pieces')

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.squareSelected = this.squareSelected.bind(this)
        this.state = {
            turn: 'W',
            selectedPiece: null,
            squares: getInitialSquares(),
            message: 'Current turn: W'
        }
    }
    
    render() {
        return (
            <div className="game">
                <div class = "game-info">
                    <Message message = {this.state.message}/>
                </div>
                <div className="game-board">
                    <Board pieces = {this.state.squares} selected = {this.squareSelected}/>
                </div>
            </div>
        )
    }

    squareSelected(i) {
        var newSelection = this.state.squares[i];
        var existingSelection = this.state.selectedPiece;
        if (!existingSelection && newSelection && newSelection.colour === this.state.turn) {
            newSelection.selected = true;
            this.setState({selectedPiece: {square: i, piece: newSelection}})
        }
        else if (existingSelection && newSelection && existingSelection.piece.colour === newSelection.colour) {
            existingSelection.piece.selected = null;
            newSelection.selected = true;
            this.setState({selectedPiece: {square: i, piece: newSelection}})
        }
        else if (existingSelection && (!newSelection || newSelection.colour !== this.state.turn)) {
            if (existingSelection.piece.isLegalMove(existingSelection.square, i)) {
                existingSelection.piece.selected = null
                this.state.squares[existingSelection.square] = null;
                this.state.squares[i] = existingSelection.piece;
                var nextTurn = this.state.turn === 'W' ? 'B': 'W';
                this.setState({turn: nextTurn, selectedPiece: null, message: 'Current turn: ' + nextTurn})
            }
            else { 
                this.setState({message: 'Invalid move'})
            }
        }
    }
}

function Message(prop) {
    return <div>{prop.message}</div>
}

function Board(prop) {
    var board = []
    for (let i = 0; i < 8; i++) {
        var rowStart = i === 0 ? 0 : i * 8;
        board.push(<div className="board-row">
            {createRow(prop.pieces.slice(rowStart, rowStart + 8), rowStart, prop.selected)}
        </div>)
    }
    return <div>{board}</div>
}

function createRow(pieces, rowStart, callback) {
    var row = [];
    for (let i = 0; i < 8; i++) {
            row.push(<Square piece = {pieces[i]} onClick = {() => callback(rowStart + i)}/>);
    }
    return row
}

function Square(props) {
    if (props.piece) {
        return ( 
            <button className={props.piece.selected ? "selected-square" : "square"} onClick = {props.onClick}>
                {props.piece.symbol}
            </button>
        );
    }
    else {
        return <button className="square" onClick = {props.onClick}></button>;
    }
}

function getInitialSquares() { 
    var piecePositions = [];
    for (var i = 0; i < 64; i++) {
        switch(i) {
            case 0:
            case 7:
                piecePositions[i] = new Pieces.castle("B");
                break;
            case 1:
            case 6:
                piecePositions[i] = new Pieces.horse("B");
                break;
            case 2:
            case 5:
                piecePositions[i] = new Pieces.bishop("B");
                break;
            case 3:
                piecePositions[i] = new Pieces.queen("B");
                break;
            case 4:
                piecePositions[i] = new Pieces.king("B");
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                piecePositions[i] = new Pieces.pawn("B");
                break;
            case 56:
            case 63:
                piecePositions[i] = new Pieces.castle("W");
                break;
            case 57:
            case 62:
                piecePositions[i] = new Pieces.horse("W");
                break;
            case 58:
            case 61:
                piecePositions[i] = new Pieces.bishop("W");
                break;
            case 59:
                piecePositions[i] = new Pieces.queen("W");
                break;
            case 60:
                piecePositions[i] = new Pieces.king("W");
                break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
                piecePositions[i] = new Pieces.pawn("W");
                break;
            default:
                piecePositions[i] = null;
                break;
        }
    }
    return piecePositions;
}


ReactDom.render(<Game/>, document.getElementById('root')
);