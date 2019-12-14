import React from 'react';

class Blog extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to my blog</h1>
				<p>In this blog I give overviews and analysis on the various drugs and companies that I encounter in my studies.</p>
				{this.props.data.blogList ? 
				(this.props.data.blogData.map((blog, blogNumber) => 
					<BlogEntry key={blogNumber} data={blog} showBlogText={this.props.showBlogText}/>))
				:
				(<BlogSpecific data={this.props.data.blogData[this.props.data.blogClicked]} submitComment={this.props.submitComment}/>)
				}
			</div>
		)
	}
}
//https://dev.to/zeyadetman/how-to-pass-state-between-components-in-reactjs-2pg1

class BlogEntry extends React.Component {
	render() {
		return (
			<table>
				<tbody>
					<tr id="blogTitle"><td><button name={this.props.data.id}>
						{"#" + this.props.data.id + ": " + this.props.data.title}</button></td></tr>
					<tr><td>{"Date: " + this.props.data.date}</td></tr>
				</tbody>
			</table>
		);
	}	
}

class BlogSpecific extends React.Component {
	constructor(){
		super();
		this.state = {
			blogComment: ""
		}
	}
	changeTextArea = event => {this.setState({ blogComment: event.target.value})}
	render() {
		return (
			<table>
				<tbody>
					<tr id="blogTitle"><td>{"#" + this.props.data.id + ": " + this.props.data.title}</td></tr>
					<tr><td dangerouslySetInnerHTML={ { __html: this.props.data.text } }></td></tr>
					{this.props.data.comments.map((comment, commentID) => 
						<tr><td>comment</td></tr>)} {/*Make comments component with date submitted etc*/}
					<tr><td><textarea placeholder="Write a comment here" type="text" name="comment" onChange={this.changeTextArea}
						value={this.state.blogComment}></textarea></td>
					</tr>
					<tr><td><button data={this.state.blogComment} onClick={this.props.submitComment}>Submit comment</button></td></tr>
					{/*<tr><td>{"Author: " + this.props.data.author}</td></tr>*/}
					<tr><td>{"Date: " + this.props.data.date}</td></tr>
					<tr><td>{"Last edited: " + this.props.data.lastEdited}</td></tr>
				</tbody>
			</table>
		)
	}
}

export default Blog;