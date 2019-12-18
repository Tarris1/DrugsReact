import React from 'react';
import Blog from './Blog.jsx'; //Import 'Blog' component 
import DrugTable from './DrugTable.jsx'; //Import 'DrugTable component
import CompanyOverview from './CompanyOverview.jsx';
import DrugsOfCompany from './DrugsOfCompany.jsx';
import DiseaseTable from './DiseaseTable.jsx';
import DiseaseSearchWindow from './DiseaseSearchWindow.jsx';

let data = require('../database.json');
let blogs = require('./Data/blogs');
let EMAdiseases = require('./EMALabels');
let FDAdiseases = require('./FDALabels');
let paragraphs = require('../paragraphs_two.json'); //not sure why regular paragraphs.json does not work
let companyData = require('./companyOverview.json');
//let diseaseList = require('./Data/trials/diseaselist.json');
let trials = require('./Data/trials/diseaseandtrials.json');
var fileSaver = require('file-saver'); 

let diseaseList = Object.keys(trials);
//console.log(diseaseList);

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

function compareValues(key, order = 'asc') {
	return function innerSort(a, b) {
	  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
		// property doesn't exist on either object
		return 0;
	  }
	  const varA = (typeof a[key] === 'string')
		? a[key].toUpperCase() : a[key];
	  const varB = (typeof b[key] === 'string')
		? b[key].toUpperCase() : b[key];
	  let comparison = 0;
	  if (varA > varB) {
		comparison = 1;
	  } else if (varA < varB) {
		comparison = -1;
	  }
	  return (
		(order === 'desc') ? (comparison * -1) : comparison
	  );
	};
  }

//Make separate blog comments file and combine it here

var listOfDrugs = [];
for (var n in data['drugs']) {listOfDrugs.push(transferToDict(n))}

class App extends React.Component {
	constructor() {
		super();
		this.state = { //State is the place where data comes from - make as simple as possible
			drugData: listOfDrugs,
			header: 'My Drug Database',
			paragraph: paragraphs,
			drugSearch: "",
			companySearch: "",
			sortOrder: "desc",
			hideDatabase: "Hide database",
			diseases: [],//EMAdiseases, 
			diseaseList: diseaseList,
			trials: trials,
			dataToShow: true,
			saveName: "",
			blogs: {blogData: blogs.reverse(), blogClicked: 1, blogList: false},
			window: {drugTableWindow: "Hide", blogWindow: "Show", diseaseWindow: "Show", databankWindow: "Show", companyWindow: "Show"},
			companyData: companyData,
			drugsOfCompany: {drugs: [], name: ""},
		}
		};
   
	searchResults = event => {
		//Search for matching drugs in database
		this.setState({ drugSearch: event.target.value});
		var toFind = (this.state.drugSearch).toLowerCase();
		if(toFind != "") {
			var newList = [];
			var stringOfData = "";
			for (var z in listOfDrugs) {
				stringOfData = (listOfDrugs[z].names + listOfDrugs[z].indications
					+ listOfDrugs[z].firm + listOfDrugs[z].category).toLowerCase()
				if (stringOfData.indexOf(toFind) !== -1) {newList.push(listOfDrugs[z])}
			}
			this.setState({ drugData: newList});
		} else {this.setState({ drugData: listOfDrugs})};
		
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

	searchDisease = event => {
		var toFind = (event.target.value).toLowerCase();
		if (toFind != ""){
			var diseases
			this.state.dataToShow ? (diseases = EMAdiseases) : (diseases = FDAdiseases);
			var newDiseaseList = [];
			var stringOfData = "";
			if (this.state.dataToShow == true){
				for (var k in diseases){
					stringOfData = (diseases[k]["Therapeutic area"] + diseases[k]["Condition / indication"] + 
					diseases[k]["Marketing authorisation holder/company name"] + diseases[k]["Medicine name"]).toLowerCase();
					if (stringOfData.indexOf(toFind) !== -1){newDiseaseList.push(diseases[k])}
				}}
			else {
				for (var k in diseases){
					stringOfData = (diseases[k].Company + diseases[k]["Active Ingredient(s)"] + diseases[k]["Trade Name"]).toLowerCase();
					if (stringOfData.indexOf(toFind) !== -1){newDiseaseList.push(diseases[k])}
				}
			}	
			this.setState({ diseases: newDiseaseList});
		} else if (this.state.dataToShow == true){this.setState({ diseases: EMAdiseases})}
		else {this.setState({ diseases: FDAdiseases})}
	}

	searchLabel = event => { this.setState({ diseaseSearch: event.target.value});}

	saveData = event => { //Saves the data with the name determined by this.state.saveName in the label or this.state.search if no saveName exists
		var blob = new Blob([JSON.stringify(this.state.drugData)], {type: "application/json"});
		const saveToName = this.state.saveName;
		const searchName = this.state.drugSearch;
		if (saveToName.length > 0 && searchName.length > 0){
			fileSaver.saveAs(blob, saveToName + ".json")
		} else if (saveToName.length == 0 && searchName.length > 0) 
			{fileSaver.saveAs(blob, searchName + ".json")}
			else {fileSaver.saveAs(blob, "drugTable.json")};
	}
	
	changeSaveDataName = event => {this.setState({ saveName: event.target.value})} //Changes the save data label
	
	hideTable = event => { //Hides the table
		if(this.state.hideDatabase == "Unhide database") {
			this.setState({ drugData: listOfDrugs, hideDatabase: "Hide database"})
		} else {this.setState({ drugData: [], hideDatabase: "Unhide database"})}
	}

	showElement = event => {
		//Shows the website parts corresponding to the button clicked and ensures the other is hidden
		var newState = this.state.window; //Copy of button data
		var nameOfElement = event.target.name; //Name of element to hide/show
		var windowsToClose = Object.keys(this.state.window); //All elements that can be hidden/shown
		document.getElementById("drugsOfCompanyWindow").style.display = "none"
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

	companyDrugs = event => {
		var buttonName = event.target.name;
		var drugsOfCompany = this.state.drugsOfCompany;
		if (buttonName != "Return"){
			var drugs = JSON.parse(event.target.value);
			drugsOfCompany['drugs'] = drugs
			drugsOfCompany['name'] = buttonName
			this.setState({ drugsOfCompany: drugsOfCompany});
			document.getElementById("companyWindow").style.display = 'none';
			document.getElementById("drugsOfCompanyWindow").style.display = "inline";
		} else {
		document.getElementById("companyWindow").style.display = 'inline';
		document.getElementById("drugsOfCompanyWindow").style.display = "none";
		}
	}

	changeDiseases = event => {
		var dataToShow = event.target.name;
		if (dataToShow == "EMAbutton") {this.setState ({ diseases: EMAdiseases, dataToShow: true})}
		else if (dataToShow == "FDAbutton"){this.setState({ diseases: FDAdiseases, dataToShow: false})}
		else if (dataToShow == "clearButton"){this.setState({ diseases: []})}
	}
	
	showBlogText = event => {
		//const clicked = this.state.blogClicked //Show only the article that is clicked
		console.log(event.target.name)
		//if (clicked = event.target.id){
		//	return <articleText/>;}
	}

	submitComment = event => {
		var newDate = new Date;
		var text = event.target.value.split(" ");
		var date = newDate.toString();
		var comment = {text: text[0], author: text[1], date: date};
		var newBlogs = this.state.blogs
		newBlogs.blogData[this.state.blogs.blogClicked].comments.push(comment)
		this.setState({ blogs: newBlogs})
	}

	sortCompany = event => {
		var sortBy = event;
		var companies = this.state.companyData;
		var order = this.state.sortOrder;
		if (order == "desc") {this.setState( {sortOrder: "asc"})}
		else {this.setState ({ sortOrder: "desc"})}
		companies = companies.sort(compareValues(sortBy, order = order));
		this.setState({ companyData: companies})
	}

	render() {
		return (
			<div>
				<div id="siteHeader">
					<button name="drugTableWindow" id="drugTableBtn" onClick={this.showElement}>Drug Table</button>
					<button name="companyWindow" id="companyBtn" onClick={this.showElement}>Companies</button>
					<button name="diseaseWindow" id="diseaseBtn" onClick = {this.showElement}>Diseases & Indicated Drugs</button>
					<button name="newsWindow" id = "newsBtn">News</button>
					<button name="databankWindow" id="databankBtn" onClick={this.showElement}>Databank</button>
					<button name="blogWindow" id="blogBtn" onClick={this.showElement}>My Blog</button>
				</div> 

				<div id="drugTableWindow">
					{<DrugTable data={this.state} hideTable={this.hideTable} searchResults={this.searchResults} 
					changeSaveDataName={this.changeSaveDataName} saveData={this.saveData}></DrugTable>}
				</div>

				<div id="companyWindow">
					{<CompanyOverview data={this.state} searchCompany={this.searchCompany} 
					companyDrugs={this.companyDrugs} sortCompany={this.sortCompany}></CompanyOverview>}
				</div>

				<div id="drugsOfCompanyWindow">
					{<DrugsOfCompany data={this.state.drugsOfCompany} companyDrugs={this.companyDrugs}></DrugsOfCompany>}
				</div>

				<div id="diseaseWindow">
					{<DiseaseSearchWindow data={this.state}></DiseaseSearchWindow>}
				</div>

				<div id="databankWindow">
					<li><button name="drugDataBtn">Drug Data</button></li>
					<li><button name="companyDataBtn">Company Data</button></li>
					<li><button name="diseaseDataBtn">Disease Data</button></li>
				</div>

				<div id="blogWindow">
					{<Blog data={this.state.blogs} showBlogText={this.showBlogText} submitComment={this.submitComment}></Blog>}
				</div>

				<div id="footer">
					<table>
						<tbody>
							<tr>
								<td>Contacts: x@email.com</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
		);
	}
}


//{<DiseaseTable data={this.state} searchDisease={this.searchDisease} 
//					changeDiseases={this.changeDiseases} searchLabel={this.searchLabel}></DiseaseTable>}
export default App;