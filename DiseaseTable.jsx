import React from 'react'

function addSpacing(names){
    if (Array.isArray(names)){
        if (names.length>1) {return names.map((name, i) => name + "; ")}
    } else { return names}
}


class DiseaseTable extends React.Component {
	render() {
		return (
			<div>
                <table>
                    <tbody>
                        <tr>
                            <td><label><input type="text" name="diseaseSearch" 
                            value={this.props.data.diseaseSearch} onChange={this.props.searchLabel}/></label></td>
                            <td><button name="searchDiseasesButton" onClick={this.props.searchDisease}>Search</button></td>
                            <td><button name="EMAbutton" onClick={this.props.changeDiseases}>EMA</button></td>
                            <td><button name="FDAbutton" onClick={this.props.changeDiseases}>FDA</button></td>
                            <td><button name="clearButton" onClick={this.props.changeDiseases}>Clear</button></td>
                        </tr>
                        <tr><td><label>{this.props.data.dataToShow ? ("EMA Indications: ") : ("FDA Indications: ")}</label></td></tr>
                    </tbody>
                </table>
				<table>
					<tbody>
						<tr>
                            <td>#</td>
                            <td>Company</td>
                            <td>Generic Name</td>
                            <td>Trade Name</td>
                            <td>Established Pharmacologic Class(es)</td>
                            <td>Label Link</td>
                            <td>Therapeutic area</td>
                            <td>Indication</td>
                            <td>Approval Date</td>
                        </tr>
                        {this.props.data.diseases.map((disease,i) => <DiseaseTableRow filter={this.props.data.dataToShow}
                        key={i} data={disease} id={i+1}/>)}
					</tbody>
				</table>
			</div>
		)
	}
}


class DiseaseTableRow extends React.Component {
	render() {
        if (this.props.filter == true){
            return (
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.data["Marketing authorisation holder/company name"]}</td>
                    <td>{this.props.data["International non-proprietary name (INN) / common name"]}</td>
                    <td>{this.props.data["Medicine name"]}</td>
                    <td>{this.props.data["Human pharmacotherapeutic group"]}</td>
                    <td><a href={this.props.data["URL"]}>Url</a></td>
                    <td>{this.props.data["Therapeutic area"]}</td>
                    <td>{this.props.data["Condition / indication"]}</td>
                    <td>{this.props.data["Marketing authorisation date"]}</td>
                    {/*<td>{addSpacing(this.props.data.drugNames)}</td>
                    <td>{addSpacing(this.props.data.drugSubstance)}</td>*/}
                </tr>	
            );
        } else {
            return(
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.data.Company}</td>
                    <td>{this.props.data["Trade Name"]}</td>
                    <td>{this.props.data["Active Ingredient(s)"]}</td>
                    <td>{this.props.data["Established Pharmacologic Class(es)"]}</td>
                    <td><a href={this.props.data["FDALabel Link"]}>Label</a></td>
                </tr>
            );
        }
	}
}

export default DiseaseTable