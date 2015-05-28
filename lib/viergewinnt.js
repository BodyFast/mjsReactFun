import React from 'react';
import classnames from 'classnames';

export default class VierGewinnt extends React.Component {
	constructor(props) {
		super(props)
		this.state =  {
			game: new Game(),
			stop: false
		};
	}

	handleDropToken(data) {
		this.state.game.dropToken(data.column_index);

		if(this.state.stop) {
			this.setState({game: new Game(), stop: false});
		}
		else if(this.state.game.gameover) {
			this.setState({game: this.state.game, stop: true});
		}
		else {
			this.setState({game: this.state.game, stop: false});			
		}
	}

	render() {
		var that = this;
		let columns = this.state.game.board.columns.map((column, index) =>
		{
			return (
				<Column index={index} column={column} key={index}
					onDropToken={that.handleDropToken.bind(that)} 
				/>
			);
		});

		return (
			<div className="vg-board clearfix">
				{columns}
			</div>
		);
	}
}

class Column extends React.Component {
	handleClick () {
		this.props.onDropToken({column_index: this.props.index}); 
	}

	render() {
		let cells = this.props.column.cells.map((cell, index) =>
		{	
			return(
				<Cell index={index} cell={cell} key={index} />
			);
		});

    	let classes = classnames(
    		"vg-column",
    		"vg-column-"+this.props.index
    	);


		return (
			<div className={classes} onClick={this.handleClick.bind(this)}>
				{cells}
			</div>
		);
	}
}

class Cell extends React.Component {
	render() {
    	let classes = classnames (
    		"vg-cell",
    		"vg-cell-"+this.props.index,
    		"vg-cell-state-" + this.props.cell.color,
    		{"vg-cell-win-member": this.props.cell.win_member}
    	);

		return (
			<div className={classes}/>
		);
	}
}


class Game {
	constructor() {
		this.gameover= false;
		this.turn = 'yellow';
		this.round = 0;
		this.board = {columns: []};
		for(var i=0; i<8; ++i) {
			let cells = [];
			for(var j=0; j<8; ++j) {
				cells.push({color:'none'});
			}
			this.board.columns.push({cells:cells});
		}
	}

	dropToken(column_index) {
		let column = this.board.columns[column_index];
		for (var i = 0; i < 8 && column.cells[i].color == 'none'; ++i);
		let cell_index = i-1;

		if(cell_index == -1)
			return;
		
		let free_cell = column.cells[cell_index];
		free_cell.color = this.turn;

		this.check_winner(free_cell);

		this.turn = this.turn == 'yellow' ? 'red' : 'yellow';

		++this.round;
		if(this.round >= 8*8) {
			this.gameover = true;
		}
	}

	check_winner(start_cell) {
		let {x,y} = this.get_cell_coordinates(start_cell);

		var check_props = [[1,0], [0,1], [1,1], [-1,1]]

		for(var i=0; i< check_props.length; ++i) {
			let dx = check_props[i][0];
			let dy = check_props[i][1];

			var win_candidates = [].concat(
				this.get_color_streak(start_cell, dx, dy).reverse(),
				[start_cell],
				this.get_color_streak(start_cell, -dx, -dy)
			);

			if (win_candidates.length >= 4) {
				this.gameover = true;
				win_candidates.slice(0,4).forEach((cell) => cell.win_member=true);
				break;
			}
		}

	}

	get_color_streak(start_cell, dx, dy) {
		let streak = [];

		var current_cell = start_cell;

		while((current_cell = this.get_neighbor_cell(current_cell, dx, dy))
		       && current_cell.color == start_cell.color) {
			streak.push(current_cell);
		}
		return streak;
	}

	get_cell_coordinates(cell) {
		for (var x = 0; x<this.board.columns.length; ++x) {
			let column = this.board.columns[x];
			for (var y=0; y<column.cells.length; ++y) {
				if(column.cells[y] === cell)
					return {x,y};
			}
		}
	}

	get_cell(x,y) {
		if(x < 0 || x > 7 || y < 0 || y > 7)
			return null;
		return this.board.columns[x].cells[y];
	}

	get_neighbor_cell(current_cell, dx, dy) {
		let {x,y} = this.get_cell_coordinates(current_cell);
		return this.get_cell(x+dx, y+dy);
	}
}