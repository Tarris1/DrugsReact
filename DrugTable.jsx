import React from 'react';

class DrugTable extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.data.header}</h1>
				<p>{this.props.data.paragraph.introduction}</p>
				<table>
					<tbody>
						<tr><td><button onClick={this.props.hideTable}>{this.props.data.hideDatabase}</button></td></tr>
						<tr>
							<td><label>Search: <input type="text" name="search" value={this.props.data.search} onChange={this.props.searchResults}/></label></td>
							<td><label>Save data as: <input type="text" name="saveData" value={this.props.data.saveName} onChange={this.props.changeSaveDataName}/></label></td>
							<td><button onClick={this.props.saveData}>Click to save</button></td>
						</tr>
					</tbody>
				</table>
				<table id="drugTable">
					<tbody>
						<tr> 
							<td>#</td>
							<td>Names</td>
							<td>Indications</td>
							<td>Category</td>
							<td>Firms</td>
							<td>Trials</td>
						</tr>
						{this.props.data.data.map((drug, i) => <DrugTableRow key={i} data={drug} />)}
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
			</tr>	
		);
	}
}

export default DrugTable;