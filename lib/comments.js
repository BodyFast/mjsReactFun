import React from 'react';
import marked from 'marked';

var example = [
//  {author: "Pete Hunt", text: "This is one comment"},
//  {author: "Jordan Walke", text: "This is *another* comment"}
];

export default class CommentBox extends React.Component {
	constructor(props) {
		super(props)
		this.state =  {data: example};
	}

	handleNewComment(comment) {
		var newlist = this.state.data.concat([comment]);
		this.setState({data: newlist});
	}

	render() {
		return (
			<div className="commentBox">
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleNewComment.bind(this)}/>
			</div>
		);
	}
}

class CommentList extends React.Component {
	render() {
		let nodes = this.props.data.map((comment,index) => {
			return (
				<Comment key={index} author={comment.author}>{comment.text}</Comment>
			);
		})

		return (
			<div>
				{nodes}
			</div>
		);
	}
}

class CommentForm extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		var author = React.findDOMNode(this.refs.author).value.trim();
		var text = React.findDOMNode(this.refs.text).value.trim();

		if(!text || !author) {
			return;
		}

		this.props.onCommentSubmit({author: author, text: text});
		React.findDOMNode(this.refs.author).value = '';
		React.findDOMNode(this.refs.text).value = '';
		return;
	}


	render() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        		<input type="text" ref="author" placeholder="Your name" />
        		<input type="text" ref="text" placeholder="Say something..." />
        		<input type="submit" value="Post" />
      		</form>
		);
	}
}

class Comment extends React.Component {
	render() {
		let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return (
			<div className="comment">
				<h2 className="commentAuthor">{this.props.author}</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
}

