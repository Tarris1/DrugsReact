import React from 'react';

class DrugTable extends React.Component {
	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<td><label>Search: <input type="text" name="search" value={this.props.data.searchDrugs} onChange={this.props.searchResults}/></label></td>
							<td><label>Save data as: <input type="text" name="saveData" value={this.props.data.saveName} onChange={this.props.changeSaveDataName}/></label></td>
							<td><button onClick={this.props.saveData}>Click to save</button></td>
						</tr>
					</tbody>
				</table>
				<table id="drugTable">
					<tbody>
						<tr> 
							<th>#</th>
							<th>Names</th>
							<th>Indications</th>
							<th>Category</th>
							<th>Firms</th>
							<th>Trials</th>
							<th>Clinical</th>
						</tr>
						{this.props.data.drugData.map((drug, i) => <DrugTableRow key={i} data={drug} />)}
					</tbody>
				</table>
			</div>
		)
	}

}

class DrugTableRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.data.id}</td>
				<td>{this.props.data.names}</td>
				<td>{this.props.data.indications}</td>
				<td>{this.props.data.category}</td>
				<td>{this.props.data.firm}</td>
				<td><a href={"https://clinicaltrials.gov/ct2/results?cond=&term=" + this.props.data.names.split(",")[0] + "&cntry=&state=&city=&dist="}>Link</a></td>
				<td>{this.props.data.clinical}</td>
			</tr>	
		);
	}
}

export default DrugTable;