import React from 'react';
import Blog from './Blog.jsx'; //Import 'Blog' component 
import DrugTable from './DrugTable.jsx'; //Import 'DrugTable component
import CompanyOverview from './CompanyOverview.jsx';
import DrugsOfCompany from './DrugsOfCompany.jsx';

let data = require('../database.json');
let blogs = require('./blogs.json');
let paragraphs = require('../paragraphs_two.json'); //not sure why regular paragraphs.json does not work
let companyData = require('./companyOverview.json');
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

class App extends React.Component {
	constructor() {
		super();
		this.state = { //State is the place where data comes from - make as simple as possible
			data: listOfDrugs,
			header: 'My Drug Database',
			paragraph: paragraphs,
			search: "",
			companySearch: "",
			hideDatabase: "Hide database",
			saveName: "",
			blogs: blogs.reverse(),
			window: {drugTableWindow: "Hide", blogWindow: "Show", databankWindow: "Show", companyWindow: "Show"},
			companyData: companyData,
			drugsOfCompany: {drugs: [], name: ""},
		}
		};
   
	searchResults = event => {
		//Search for matching drugs in database
		this.setState({ search: event.target.value});
		var toFind = (this.state.search).toLowerCase();
		if(toFind != "") {
			var newList = [];
			var stringOfData = "";
			for (var z in listOfDrugs) {
				stringOfData = (listOfDrugs[z].names + listOfDrugs[z].indications
					+ listOfDrugs[z].firm + listOfDrugs[z].category).toLowerCase()
				if (stringOfData.indexOf(toFind) !== -1) {newList.push(listOfDrugs[z])}
			}
			this.setState({ data: newList});
		} else {this.setState({ data: listOfDrugs})};
		
	}
		
	searchCompany = event => {
		this.setState({ companySearch: event.target.value});
		var toFind = (this.state.companySearch).toLowerCase();
		if (toFind != ""){
			var companies = this.state.companyData;
			var newCompanyList = [];
			var stringOfData = "";
			for (var j in companies){
				stringOfData = (companies[j].name + companies[j].ticker + companies[j].exchange + companies[j].specialization
					+ companies[j].headquarters).toLowerCase();
				if (stringOfData.indexOf(toFind) !== -1) {newCompanyList.push(companies[j])}
			}
			this.setState({companyData:newCompanyList})
		} else{this.setState({companyData:companyData})}
	}

	saveData = event => { //Saves the data with the name determined by this.state.saveName in the label or this.state.search if no saveName exists
		var blob = new Blob([JSON.stringify(this.state.data)], {type: "application/json"});
		const saveToName = this.state.saveName;
		const searchName = this.state.search;
		if (saveToName.length > 0 && searchName.length > 0){
			fileSaver.saveAs(blob, saveToName + ".json")
		} else if (saveToName.length == 0 && searchName.length > 0) 
			{fileSaver.saveAs(blob, searchName + ".json")}
			else {fileSaver.saveAs(blob, "drugTable.json")};
	}
	
	changeSaveDataName = event => {this.setState({ saveName: event.target.value})} //Changes the save data label
	
	hideTable = event => { //Hides the table
		//console.log(this.state.hideDatabase);
		if(this.state.hideDatabase == "Unhide database") {
			this.setState({data: listOfDrugs, hideDatabase: "Hide database"})
		} else {this.setState({ data: [], hideDatabase: "Unhide database"})}
	}

	showElement = event => {
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
			this.setState({ window: newState});
		} else if (this.state.window[nameOfElement] == ("Hide")) {
			newState[nameOfElement] = "Show";
			document.getElementById(nameOfElement).style.display = 'none';
			this.setState({ window: newState});
		}
	}

	companyDrugs= event => {
		var buttonName = event.target.name;
		var drugsOfCompany = this.state.drugsOfCompany;
		if (buttonName != "Return"){
			var drugs = JSON.parse(event.target.value);
			drugsOfCompany['drugs'] = drugs
			drugsOfCompany['name'] = buttonName
			this.setState({drugsOfCompany:drugsOfCompany});
			document.getElementById("companyWindow").style.display = 'none';
			document.getElementById("drugsOfCompanyWindow").style.display = "inline";
		} else {
		document.getElementById("companyWindow").style.display = 'inline';
		document.getElementById("drugsOfCompanyWindow").style.display = "none";
		}
	}

	render() {
		return (
			<div>
				<div id="siteHeader">
					<button name="drugTableWindow" id="drugTableBtn" onClick={this.showElement}>Drug Table</button>
					<button name="companyWindow" id="companyBtn" onClick={this.showElement}>Companies</button>
					<button name="diseaseWindow" id="diseaseBtn">Diseases & Indicated Drugs</button>
					<button name="databankWindow" id="databankBtn" onClick={this.showElement}>Databank</button>
					<button name="blogWindow" id="blogBtn" onClick={this.showElement}>My Blog</button>
				</div> 

				<div id="drugTableWindow">
					{<DrugTable data={this.state} hideTable={this.hideTable} searchResults={this.searchResults} 
					changeSaveDataName={this.changeSaveDataName} saveData={this.saveData}></DrugTable>}
				</div>

				<div id="companyWindow">
					
					{<CompanyOverview data={this.state} searchCompany={this.searchCompany} 
					companyDrugs={this.companyDrugs}></CompanyOverview>}
				</div>

				<div id="drugsOfCompanyWindow">
					{<DrugsOfCompany data={this.state.drugsOfCompany} companyDrugs={this.companyDrugs}></DrugsOfCompany>}
				</div>

				<div id="databankWindow">
					<button name="drugDataBtn">Drug Data</button>
					<button name="companyDataBtn">Company Data</button>
					<button name="diseaseDataBtn">Disease Data</button>
				</div>

				<div id="blogWindow">
					{<Blog data={this.state.blogs}></Blog>}
				</div>
			</div>
		);
	}
}

export default App;