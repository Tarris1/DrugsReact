import React from 'react';
import Blog from './Blog.jsx'; //Import 'Blog' component 
import DrugTable from './DrugTable.jsx'; //Import 'DrugTable component

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
		search: "",
		hideDatabase: "Hide database",
		saveName: "",
		blogs: blogs,
		window: {drugTableWindow: "Hide", blogWindow: "Show"},
      }
	  this.hideTable = this.hideTable.bind(this);
	  this.searchResults = this.searchResults.bind(this);
	  this.changeSaveDataName = this.changeSaveDataName.bind(this);
	  this.saveData = this.saveData.bind(this);
	  this.showElement = this.showElement.bind(this);
   };
   

	
//https://stackoverflow.com/questions/48019130/download-save-file-in-react-js
//https://www.npmjs.com/package/file-saver
	
   searchResults(event){
	   //Search for matching drugs in database
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
	
	changeSaveDataName(event){this.setState({saveName:event.target.value})} //Changes the save data label
	
	hideTable(event){ //Hides the table
		//console.log(this.state.hideDatabase);
		if(this.state.hideDatabase == "Unhide database") {
			this.setState({data:listOfDrugs, hideDatabase:"Hide database"})
		} else {this.setState({data:[], hideDatabase:"Unhide database"})}
	}

	showElement(event){
		//Shows the website parts corresponding to the button clicked and ensures the other is hidden
		var newState = this.state.window; //Copy of button data
		var nameOfElement = event.target.name; //Name of element to hide/show
		var windowsToClose = Object.keys(this.state.window); //All elements that can be hidden/shown
		if (this.state.window[nameOfElement] == "Show"){
			for (var n in windowsToClose){
				var other = windowsToClose[n]
				if (other != nameOfElement){
					newState[other] = "Show";
					document.getElementById(other).style.display = 'none';}
				}
			newState[nameOfElement] = "Hide";
			document.getElementById(nameOfElement).style.display = 'inline';
			this.setState({window:newState});
		} else if (this.state.window[nameOfElement] == ("Hide")) {
			newState[nameOfElement] = "Show";
			document.getElementById(nameOfElement).style.display = 'none';
			this.setState({window:newState});
		}
	}

   	render() {
      	return (
         	<div>
				<div id = "siteHeader">
					<button name = "drugTableWindow" id = "drugTableBtn" onClick = {this.showElement}>Drug Table</button>
					<button name = "companyWindow" id = "companyBtn">Companies</button>
					<button name = "diseaseWindow" id = "diseaseBtn">Diseases & Indicated Drugs</button>
					<button name = "databankWindow" id = "databankBtn">Databank</button>
					<button name = "blogWindow" id = "blogBtn" onClick = {this.showElement}>My Blog</button>
				</div> 

				<div id = "blogWindow">
					{<Blog data = {this.state.blogs}></Blog>}
				</div>

				<div id = "drugTableWindow">
					{<DrugTable data = {this.state} hideTable = {this.hideTable} searchResults = {this.searchResults} 
					changeSaveDataName = {this.changeSaveDataName} saveData = {this.saveData}></DrugTable>}
						
				</div>
			</div>
		);
	}
}




export default App;