import React from 'react';

export default class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {secondsElapsed : 1};
	}

	tick() {
		this.setState({secondsElapsed: this.state.secondsElapsed * 2});
	}

	componentDidMount() {
		this.interval = setInterval(this.tick.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return(
			<div>Seconds elapsed: {this.state.secondsElapsed}</div>
		);
	}
}