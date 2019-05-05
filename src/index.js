import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i) {
		const squares 	 = this.state.squares.slice();

		// ignore if the game is won or if the square is filled
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';

	  	this.setState({
			squares,
			xIsNext: !this.state.xIsNext,
		});
	}

	getStatus() {
		const winner = calculateWinner(this.state.squares);

		if (winner) {
			return `Winner is ${winner}`;
		}

		return `Next player is ${this.state.xIsNext ? 'X' : 'O'}`;
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="status">{this.getStatus()}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

function calculateWinner(squares) {
	const lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	];

	for (let i =0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		const playerS1 	= squares[a];
		const playerS2 	= squares[b];
		const playerS3 	= squares[c];

		if (playerS1 && playerS1 === playerS2 && playerS1 === playerS3) {
			return playerS1;
		}
	}

	return null;
}