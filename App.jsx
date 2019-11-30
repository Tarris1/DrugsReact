import React from 'react';

let data = require('../database.json');
let blogs = require('./blogs.json');
let paragraphs = require('../paragraphs_two.json'); //not sure why regular paragraphs.json does not work
var fileSaver = require('file-saver'); 


function transferToDict(id) {
	var dictionary = data['drugs'][id];
	return {
		id: id,
		names: dictionary['name'],
		category: dictionary['category'],
		firm: dictionary['misc'],
		indications: dictionary['disease']
	}
}

var listOfDrugs = [];
for (var n in data['drugs']) {listOfDrugs.push(transferToDict(n))}


//https://medium.com/@siobhanpmahoney/local-storage-in-a-react-single-page-application-34ba30fc977d
//https://www.robinwieruch.de/local-storage-react
//https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link


class App extends React.Component {
	
   constructor() {
      super();
      this.state = { //State is the place where data comes from - make as simple as possible
		data: listOfDrugs,
		header: 'My Drug Database',
		paragraph: paragraphs,
		i: n,
		search: "",
		hideDatabase: "Hide database",
		saveName: "",
		blogs: blogs,
		window: {drugTableWindow: "Hide drugTableWindow", blogWindow: "Hide blogWindow"},
      }
	  this.hideTable = this.hideTable.bind(this);
	  this.searchResults = this.searchResults.bind(this);
	  this.changeSaveDataName = this.changeSaveDataName.bind(this);
	  this.saveData = this.saveData.bind(this);
	  this.showElement = this.showElement.bind(this);
   };
   

//https://medium.com/better-programming/handling-multiple-form-inputs-in-react-c5eb83755d15
	
//https://stackoverflow.com/questions/48019130/download-save-file-in-react-js
//https://www.npmjs.com/package/file-saver
	
   searchResults(event){
	   
	   this.setState({search:event.target.value});
	   var toFind = (this.state.search).toLowerCase();
	   var newList = [];
	   var stringOfData = "";
	   if(toFind != "") {
		   for (var z in listOfDrugs) {
			   stringOfData = (listOfDrugs[z].names+listOfDrugs[z].indications+listOfDrugs[z].firm+listOfDrugs[z].category).toLowerCase()
			   if (stringOfData.indexOf(toFind) !== -1) {newList.push(listOfDrugs[z])}
		   }
		   this.setState({data:newList});
	   } else {this.setState({data:listOfDrugs})};
	   
   }
	
   

	
	//https://javascript.info/blob
	saveData(event){ //Saves the data with the name determined by this.state.saveName in the label or this.state.search if no saveName exists
		var blob = new Blob([JSON.stringify(this.state.data)], {type: "application/json"});
		const saveToName = this.state.saveName;
		const searchName = this.state.search;
		if (saveToName.length > 0 && searchName.length > 0){
			fileSaver.saveAs(blob, saveToName+".json")
		} else if (saveToName.length == 0 && searchName.length > 0) 
			{fileSaver.saveAs(blob, searchName+".json")}
			else {fileSaver.saveAs(blob, "drugTable.json")};
	}
	
	changeSaveDataName(event){this.setState({saveName:event.target.value})} //Changes the save data label - fix so that it works for any label
	
	hideTable(event){ //Hides the table
		console.log(this.state.hideDatabase);
		if(this.state.hideDatabase == "Unhide database") {
			this.setState({data:listOfDrugs, hideDatabase:"Hide database"})
		} else {this.setState({data:[], hideDatabase:"Unhide database"})}
	}

	showElement(event){
		var newState = this.state.window;
		var nameOfElement = event.target.name;
		if (this.state.window[nameOfElement] == "Hide "+ nameOfElement){
			newState[nameOfElement] = "Show "+ nameOfElement;
			document.getElementById(nameOfElement).style.display = 'inline';//.visibility = 'hidden';
			this.setState({window:newState});
		} else if (this.state.window[nameOfElement] == ("Show "+ nameOfElement)) {
			newState[nameOfElement] = "Hide "+ nameOfElement;
			document.getElementById(nameOfElement).style.display = 'none';//.visibility = 'visible';
			this.setState({window:newState});
		}
	}

   	render() {
      	return (
         	<div>
				<div>
					<button name = "drugTableWindow" onClick = {this.showElement}>{this.state.window.drugTableWindow}</button>
					<button name = "blogWindow" onClick = {this.showElement}>{this.state.window.blogWindow}</button>
					</div> 
				<div id = "blogWindow">
				{<Blog data = {this.state.blogs} hideTable = {this.hideTable}></Blog>}</div>

				<div id = "drugTableWindow">
				<h1>{this.state.header}</h1>
				<p>{this.state.paragraph.introduction}</p>
				
				<table>
					<tbody>
						<tr><td><button onClick = {this.hideTable}>{this.state.hideDatabase}</button></td></tr>
						<tr>
							<td><label>Search: <input type="text" name = "search" value = {this.state.search} onChange = {this.searchResults}/></label></td>
							<td><label>Save data as: <input type="text" name = "saveData" value = {this.state.saveName} onChange = {this.changeSaveDataName}/></label></td>
							<td><button onClick = {this.saveData}>Click to save</button></td>
						</tr>
					</tbody>
				</table>
			
			
				<table id = "drugTable" >

					{<DrugTable data = {this.state} hideTable = {this.hideTable}></DrugTable>}
				</table>
				</div>
			</div>
		);
	}
}



class Blog extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to my blog</h1>
				<p>Introduction</p>
				
				{this.props.data.map((blog, i) => <BlogEntry key = {i} data= {blog}/>)}</div>
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
					<tr id = "title_field">{"Title: "+this.props.data.title}</tr>
					<tr id = "text_field">{this.props.data.text}</tr>
					<tr id = "author_field">{"Author: "+this.props.data.author}</tr>
					<tr id = "date_field">{"Date: "+this.props.data.date}</tr>
				</tbody>
			</table>
		);
	}	
}


class DrugTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
		  
		}
		//this.updateDatabase = this.updateDatabase.bind(this);
	}

	//updateDatabase(){this.props.hideTable};

	render() {
		return (
			<tbody>
			   	<tr> 
					<td>#</td>
					<td>Names</td>
					<td>Indications</td>
					<td>Category</td>
					<td>Firms</td>
				</tr>
	
				{this.props.data.data.map((drug, i) => <DrugTableRow key = {i} data = {drug} />)}
			</tbody>

		)
	}

}

class DrugTableRow extends React.Component {
   render() {
      return (
        <tr>
			<td> {this.props.data.id}</td>
			<td> {this.props.data.names}</td>
			<td> {this.props.data.indications}</td>
			<td> {this.props.data.category}</td>
			<td> {this.props.data.firm}</td>
        </tr>	
      );
   }
}


export default App;