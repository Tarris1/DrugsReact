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
				{/*<DropdownList dropUp data = {this.props.data}></DropdownList>*/}
                <table>
                    <tbody>
                        <tr>
                            <td><button name="EMAbutton" onClick={this.props.changeDiseases}>EMA</button></td>
                            <td><button name="FDAbutton" onClick={this.props.changeDiseases}>FDA</button></td>
                        </tr>
                        <tr>
                            <td><label>Search: <input type="text" name="diseaseSearch" 
                            value={this.props.data.diseaseSearch} onChange={this.props.searchDisease}/></label></td>
                        </tr>
                    </tbody>
                </table>
				<table>
					<tbody>
						<tr>
							<td>#</td>
							<td>Names</td>
							<td>Trade Names approved</td>
							<td>Substances approved</td>
						</tr>{/*Make if function for the mapping depending on value of buttons*/}
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
        if (this.props.filter == "EMA"){
            return (
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.data.disease}</td>
                    <td>{addSpacing(this.props.data.drugNames)}</td>
                    <td>{addSpacing(this.props.data.drugSubstance)}</td>
                </tr>	
            );
        }
	}
}

export default DiseaseTable