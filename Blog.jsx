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
				(<BlogSpecific data={this.props.data.blogData[this.props.data.blogClicked]} submitComment={this.props.submitComment}
				showBlogText={this.props.showBlogText}/>)
				}
			</div>
		)
	}
}
//https://dev.to/zeyadetman/how-to-pass-state-between-components-in-reactjs-2pg1

class BlogEntry extends React.Component {
	render() {
		return (
			<table id="blogList">
				<tbody>
					<tr id="blogTitle"><td><button name={this.props.data.id} onClick={this.props.showBlogText}>
						{"#" + this.props.data.id + ": " + this.props.data.title}</button></td></tr>
					<tr><td>{this.props.submitComment}</td></tr>
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
			commentText: "",
			commentAuthor: "",
		}
	}
	changeTextArea = event => {this.setState({ commentText: event.target.value})}
	changeAuthorArea = event => {this.setState({ commentAuthor: event.target.value})}
	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr><td><button name="return" onClick={this.props.showBlogText}>Return to blog list</button></td></tr>
						<tr id="blogTitle"><td>{"#" + this.props.data.id + ": " + this.props.data.title}</td></tr>
						<tr><td id="blogText" dangerouslySetInnerHTML={ { __html: this.props.data.text } }></td></tr>
						{/*<tr><td>{"Author: " + this.props.data.author}</td></tr>*/}
						<tr><td>{"Date: " + this.props.data.date}</td></tr>
						<tr><td>{"Last edited: " + this.props.data.lastEdited}</td></tr>
					</tbody>
				</table>
				{this.props.data.comments.map((comment, commentID) => <BlogComment key={commentID} data={comment}/>)}
				<table>
					<tbody>
						<tr><td><label>Author: <input type="text" name="commentAuthor" value={this.state.commentAuthor} 
							onChange={this.changeAuthorArea}/></label></td></tr>
						<tr><td><textarea placeholder="Write a comment here" type="text" name="commentText" onChange={this.changeTextArea} 
							value={this.state.commentText}></textarea></td></tr>
						<tr><td><button value={this.state.commentText + ";" + this.state.commentAuthor}
							onClick={this.props.submitComment}>Submit comment</button></td></tr>
					</tbody>
				</table>
			</div>
		)
	}
}

class BlogComment extends React.Component {
	render() {
		return (
			<table>
				<tbody>
					<tr><td>{this.props.data.author + " (" + this.props.data.date + ")"}</td></tr>
					<tr><td>{this.props.data.text}</td></tr>
				</tbody>
			</table>
		)
	}
}


export default Blog;