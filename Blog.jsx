import React from 'react';


class Blog extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to my blog</h1>
				<p>Introduction</p>
				
				{this.props.data.reverse().map((blog, blogNumber) => <BlogEntry key = {blog.id} data= {blog}/>)}</div>
		)
	}
}
//https://dev.to/zeyadetman/how-to-pass-state-between-components-in-reactjs-2pg1

class BlogEntry extends React.Component {
	//Creates each blog entry
	render() {
		return (
			<table>
				<tbody>
					<tr><th>{"#"+this.props.data.id+": "+this.props.data.title}</th></tr>
					<tr><td>{this.props.data.text}</td></tr>
					<tr><td>{"Author: "+this.props.data.author}</td></tr>
					<tr><td>{"Date: "+this.props.data.date}</td></tr>
				</tbody>
			</table>
		);
	}	
}

export default Blog;