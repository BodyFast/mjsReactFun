import {bootstrap} from './bootstrap';
import React from 'react';
import RepositoryList from './repository-list';
import Timer from './timer';
import CommentBox from './comments';
import VierGewinnt from './viergewinnt';

window.React = React;

//let {a,b} = bootstrap(); 
//$('body').append(`<div>A: ${a} and B: ${b}!!</div>`);

class HelloWorld extends React.Component {
	render() {
		let {a,b} = bootstrap();
 		return (
 			<div>
 				<h2>Vier Gewinnt</h2>
				<VierGewinnt />
				<br/><br/>
	 			<Timer/>
	 			<CommentBox/>
	 		</div>
		);
	}
}

React.render(<HelloWorld name="Yay" />, document.getElementById('App'));

