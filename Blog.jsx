import React from 'react';

class Blog extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to my blog</h1>
				<p>In this blog I will give overviews and analysis on the various drugs and companies that I encounter in my studies.</p>
				
				{this.props.data.map((blog, blogNumber) => <BlogEntry key={blogNumber} data={blog}/>)}</div>
		)
	}
}
//https://dev.to/zeyadetman/how-to-pass-state-between-components-in-reactjs-2pg1

class BlogEntry extends React.Component {
	render() {
		return (
			<table>
				<tbody>
					<tr id="blogTitle"><td>{"#" + this.props.data.id + ": " + this.props.data.title}</td></tr>
					<tr><td dangerouslySetInnerHTML={ { __html: this.props.data.text } }></td></tr>
					{/*<tr><td>{"Author: " + this.props.data.author}</td></tr>*/}
					<tr><td>{"Date: " + this.props.data.date}</td></tr>
					<tr><td>{"Last edited: " + this.props.data.lastEdited}</td></tr>
				</tbody>
			</table>
		);
	}	
}

export default Blog;