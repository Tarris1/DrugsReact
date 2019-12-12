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
                            <td><label>Search: <input type="text" name="diseaseSearch" 
                            value={this.props.data.diseaseSearch} onChange={this.props.searchDisease}/></label></td>
                            <td><button name="EMAbutton" onClick={this.props.changeDiseases}>EMA</button></td>
                            <td><button name="FDAbutton" onClick={this.props.changeDiseases}>FDA</button></td>
                        </tr>
                        <tr><td><label>{this.props.data.dataToShow ? ("EMA Indications: ") : ("FDA Indications: ")}</label></td></tr>
                    </tbody>
                </table>
				<table>
					<tbody>
						{this.props.data.dataToShow ?
                            (<tr>
                                <td>#</td>
                                <td>Names</td>
                                <td>Trade Names approved</td>
                                <td>Substances approved</td>
						    </tr>)
                            : (<tr>
                                <td>#</td>
                                <td>Company</td>
                                <td>Generic Name</td>
                                <td>Trade Name</td>
                                <td>Established Pharmacologic Class(es)</td>
                                <td>FDALabel Link</td>
                            </tr>)
                        }
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
                    <td>{this.props.data.disease}</td>
                    <td>{addSpacing(this.props.data.drugNames)}</td>
                    <td>{addSpacing(this.props.data.drugSubstance)}</td>
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