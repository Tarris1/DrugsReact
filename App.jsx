import React from 'react';

//import database from './database.json';
//import database from 'json!../database.json';
//const style = require('./index.css');
let data = require('../database.json');
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
      }
	  
	  this.searchResults = this.searchResults.bind(this);
	  this.hideTable = this.hideTable.bind(this);
	  this.changeSaveDataName = this.changeSaveDataName.bind(this);
	  this.saveData = this.saveData.bind(this);
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
	

	
	hideTable(event){ //Hides the table
		if(this.state.hideDatabase == "Unhide database") {
			this.setState({data:listOfDrugs, hideDatabase:"Hide database"})
		} else {this.setState({data:[], hideDatabase:"Unhide database"})}
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
	
   	render() {
      	return (
         	<div>
            	<div>
            	<h1>{this.state.header}</h1>
				<p>{this.state.paragraph.introduction}</p>
				</div>
				<table>
					<tbody>
						
						<tr>
							<td><label>Search: <input type="text" name = "search" value = {this.state.search} onChange = {this.searchResults}/></label></td>
							<td><label>Save data as: <input type="text" name = "saveData" value = {this.state.saveName} onChange = {this.changeSaveDataName}/></label></td>
							<td><button onClick = {this.saveData}>Click to save</button></td>
						</tr>
				
					</tbody>
				</table>
			
			
				<table id = "drugTable" >
				<tbody>
				
				<tr> 
						<td>#</td>
						<td><button onClick = {this.hideTable}>{"Names ("+this.state.hideDatabase+")"}</button></td>
						<td>Indications</td>
						<td>Category</td>
						<td>Firms</td>
					</tr>
		
					{this.state.data.map((drug, i) => <DrugTableRow key = {i} data = {drug} />)}

				</tbody>
				
				</table>
				
			</div>
		);
	}
}

class DrugTable extends React.Component {
	render() {
		return (
		
			<tbody>
			   
			   <tr> 
					<td>#</td>
					<td><button onClick = {this.hideTable}>{"Names"}</button></td>
					<td>Indications</td>
					<td>Category</td>
					<td>Firms</td>
				</tr>
	
                  {this.state.data.map((person, i) => <DrugTableRow key = {i} data = {person} />)}
			</tbody>
		
		
		)
		
	}
		
}

class Blog extends React.Component {
	render() {
		return (
		
			<div>
					<div>
					<h1>Welcome to my blog</h1>
					<p>Introduction</p>
					</div>
					
					<div>
					
					{this.state.blogs.map((blog, id) => <BlogEntry key = {id} data = {blog}/>)}
					
					</div>
			</div>
			
			
		)
	}
}
//https://dev.to/zeyadetman/how-to-pass-state-between-components-in-reactjs-2pg1

class BlogEntry extends React.Component {
	//Creates each blog entry
	render() {
		return (
			<table>
				<tr id = "title_field"> {this.props.data.title}</tr>
				<tr id = "text_field"> {this.props.data.text}</tr>
				<tr id = "author_field">{"Author: "+this.props.data.author}</tr>
				<tr id = "date_field">{"Date: "+this.props.data.date}</tr>
			</table>
		);
		
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