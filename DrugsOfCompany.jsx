import React from 'react'

class DrugsOfCompany extends React.Component {
	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr><td><button onClick = {this.props.companyDrugs} name = "Return">Return</button></td></tr>
						<tr><td>{"Drugs relevant to "+this.props.data.name+":"}</td></tr>
					</tbody>
				</table>
				<table>
					<tbody>
						<tr> 
							<td>#</td>
							<td>Names</td>
							<td>Indications</td>
							<td>Category</td>
							<td>Firms</td>
							<td>Trials</td>
						</tr>
						{this.props.data.drugs.map((drug, i) => <DrugTableRow key = {i} data = {drug} id = {i+1} />)}
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
				<td>{this.props.id}</td>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.disease}</td>
				<td>{this.props.data.category}</td>
				<td>{this.props.data.misc}</td>
				<td><a href = {"https://clinicaltrials.gov/ct2/results?cond=&term="+this.props.data.name.split(",")[0]+"&cntry=&state=&city=&dist="}>Link</a></td>
			</tr>	
		);
	}
}

export default DrugsOfCompany;

