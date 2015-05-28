import React from 'react';

class ListItems extends React.Component {
	render() {
	    let createItem = function(itemText, index) {
			return <li key={index + itemText}>{itemText}</li>;
   		};
		return (
			<ul>
				{this.props.items.map(createItem)}
			</ul>
		);
	}
}


export default class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items: [], text: ''};
	}
	onChange(e) {
		this.setState({text: e.target.value});
	}
	handleSubmit(e) {
		e.preventDefault();
		let nextItems = this.state.items.concat(this.state.text);
		let nextText = '';
		this.setState({items: nextItems, text: nextText});
	}
	render() {
		return (
			<div>
				<h3>TodoList</h3>
				<ListItems items={this.state.items} />
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input onChange={this.onChange.bind(this)} value={this.state.text} />
					<button>{'Add #' + (this.state.items.length +1)}</button>
				</form>
			</div>
		)
	}
}
