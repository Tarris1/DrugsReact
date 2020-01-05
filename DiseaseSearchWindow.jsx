import React from 'react';
//let diseaseList = require('./Data/trials/diseaselist.json');
//let trials = require('./Data/trials/diseaseandtrials.json');
//https://dev.to/saulojoab/how-to-get-data-from-an-mysql-database-in-react-native-53a4
//https://www.sqlservercentral.com/articles/building-dynamic-react-apps-with-sql-server-data-2
//https://www.codeproject.com/Articles/3148328/Building-Dynamic-React-Apps-with-Database-Data
//https://www.cdata.com/kb/articles/apiserver-react.rst
//https://www.sqlitetutorial.net/


function listToString(string){
    if (typeof string == "object"){
        var newString = ""
        for (var a in string) {
            if (a == 0) {newString = string[a]}
            else if (a <= 20) {newString = newString + ", " + string[a]}
        }
        return newString
    }
    else {return string}
}

class DiseaseSearchWindow extends React.Component {
    constructor(){
		super();
		this.state = {
            search: "",
            searchResults: [],
            showSearch: true,
            trials: [0],
            interventions: [0],
            diseaseName: ""
		}
	}
    changeSearchArea = event => {
        var searchInput = event.target.value.toLowerCase();
        const resultLimit = 40;
        const allDiseases = this.props.data.diseaseList;
        this.setState({ search: searchInput})
        var searchResults = []
        for (var disease in allDiseases) {
            var diseaseName = allDiseases[disease]
            diseaseName = diseaseName.toLowerCase();
            if (diseaseName.indexOf(searchInput) !== -1) {
                searchResults.push(diseaseName)
            }
        }
        if (searchResults.length < resultLimit){this.setState( { searchResults: searchResults})}   
    }

    diseaseTrials = event => {
        var diseaseName = event
        this.setState( {diseaseName: diseaseName})
        //console.log(diseaseName)
        //var trials = require('./Data/trials/diseaseandtrials.json');
        /*if (diseaseName in this.props.data.trials){
            const trialsOfDisease = trials[diseaseName]
            trials = {}
            const interventionsOfDisease = interventions[diseaseName]
            this.setState({ trials: trialsOfDisease, interventions: interventionsOfDisease})}*/
        const interventionsOfDisease = this.props.data.interventions[diseaseName]
        if (this.state.showSearch == true) {this.setState({ showSearch: false, interventions: interventionsOfDisease})}
    }
    returnToSearch = event => {this.setState({ showSearch: true})}
    
	render() {
        return (
            <div>
                {this.state.showSearch ? (
                <table>
                    <tbody>
                        <tr>
                            <td><label>Search for a disease: <input type="text" name="diseaseSearch" 
                            value={this.state.search} onChange={this.changeSearchArea}/></label></td>
                        </tr>
                        {this.state.searchResults.map((disease, i) => <tr key={i}><td onClick={() => this.diseaseTrials(disease)}>{disease}</td></tr>)}
                    </tbody>
                </table>)
                : (<TrialsTable data={this.state} returnToSearch={this.returnToSearch}/>)}
            </div>
        )
    }
}

class TrialsTable extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><td><button onClick={this.props.returnToSearch}>Return</button></td></tr>
                        <tr><td>Unique interventions: {listToString(this.props.data.interventions)}</td></tr>
                        <tr><td>Trials for {this.props.data.diseaseName}: </td></tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>NCT ID</th>
                            <th>Title</th>
                            <th>Interventions</th>
                            <th>Condition</th>
                            <th>Primary Outcome</th>
                            <th>Sponsor</th>
                            <th>Start Date</th>
                            <th>Completion Date</th>
                            <th>Study Type</th>
                        </tr>
                        {/*this.props.data.trials.map((trial, i) => <Trial data={trial} key={i} id={i+1}/>)*/}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Trial extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td><a href={"https://clinicaltrials.gov/ct2/show/"+this.props.data.NCTId}>{this.props.data.NCTId}</a></td>
                <td>{this.props.data.BriefTitle}</td>
                <td>{listToString(this.props.data.InterventionName)}</td>
                <td>{listToString(this.props.data.Condition)}</td>
                <td>{listToString(this.props.data.PrimaryOutcomeMeasure)}</td>
                <td>{listToString(this.props.data.LeadSponsorName)}</td>
                <td>{listToString(this.props.data.StartDate)}</td>
                <td>{listToString(this.props.data.PrimaryCompletionDate)}</td>
                <td>{listToString(this.props.data.StudyType)}</td>
            </tr>
        )
    }
}

export default DiseaseSearchWindow