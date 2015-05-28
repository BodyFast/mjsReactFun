import React from 'react';
import {reposForUser} from './repos';
import Repo from './repo';

export default class RepositoryList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {repos : []};
	}

	componentDidMount() {
		reposForUser('octocat').then(repos => {
			this.setState({ repos: repos } )
		});
	}

	render() {
		let repos = this.state.repos.map((repo) => {
			return <li key={repo.id}><Repo raw={repo} /></li>
		});

		return <ul>{ repos }</ul>;
	}
}