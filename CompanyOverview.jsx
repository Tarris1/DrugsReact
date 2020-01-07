import React from 'react'

var digits = 2;
function numberFormatting(number, digits = digits) {
    if (number.length!=0){ //Checks if its actually a number
        var newNumber = new Intl.NumberFormat('ja-JP', {maximumFractionDigits: digits }).format(number);
        return (newNumber)}
    else { return number};
}

class CompanyOverview extends React.Component {
	render() {
		return (
            <div>
               {this.props.data.showCompanies ?
                 (<CompanyTable data={this.props.data} searchCompany={this.props.searchCompany} 
                    companyDrugs={this.props.companyDrugs} sortCompany={this.props.sortCompany}></CompanyTable>)
                : (<DrugsOfCompany data={this.props.data} companyDrugs={this.props.companyDrugs}></DrugsOfCompany>)
                }
            </div>
		)
	}
}

class CompanyTable extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Search: <input type="text" name="companySearch" 
                            value={this.props.data.companySearch} onChange={this.props.searchCompany}/></label></td>
                        </tr>
                    </tbody>
                </table>
                <table id="CompanyTable">
                    <tbody>
                        <tr>
                            <th onClick={() => this.props.sortCompany("id")}>#</th>
                            <th onClick={() => this.props.sortCompany("name")}>Name</th>
                            <th onClick={() => this.props.sortCompany("ticker")}>Ticker</th>
                            <th onClick={() => this.props.sortCompany("exchange")}>Exchange</th>
                            <th onClick={() => this.props.sortCompany("price")}>Price</th>
                            <th onClick={() => this.props.sortCompany("shares")}>Shares</th>
                            <th onClick={() => this.props.sortCompany("marketCap")}>Market Cap.</th>
                            <th onClick={() => this.props.sortCompany("quarterly")}>Quarterly Revenue</th>
                            <th>Drugs</th>
                            <th>Specialization</th>
                            <th>Press Releases</th>
                            <th>Headquarters</th> 
                            <th onClick={() => this.props.sortCompany("year")}>Year</th>
                        </tr>
                        
                        {this.props.data.companyData.map((company, j) => <CompanyRow key={j} data={company} 
                        companyDrugs={this.props.companyDrugs}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}



class CompanyRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.data.id}</td>
				<td>{this.props.data.name}</td>
				<td><a href = {"https://www.google.com/search?q=" + this.props.data.exchange + ":" + this.props.data.ticker}>{this.props.data.ticker}</a></td>
				<td>{this.props.data.exchange}</td>
				<td>{"$" + numberFormatting(this.props.data.price)}</td>
				<td>{numberFormatting(this.props.data.shares, digits = 0)}</td>
				<td>{"$" + numberFormatting(this.props.data.marketCap, digits = 0)}</td>
				<td>{"$" + numberFormatting(this.props.data.quarterly, digits = 0)}</td>
                <td><button name={this.props.data.name} value={JSON.stringify(this.props.data.drugs)} onClick={this.props.companyDrugs}>Products</button></td>
				<td>{this.props.data.specialization}</td>
				<td><a href={this.props.data.pressReleases}>Link</a></td>
				<td>{this.props.data.headquarters}</td>
                <td>{this.props.data.year}</td>
			</tr>
		)
    }
}

class DrugsOfCompany extends React.Component {
	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr><td><button onClick={this.props.companyDrugs} name="Return">Return</button></td></tr>
						<tr><td>{"Drugs relevant to " + this.props.data.drugsOfCompany.name + ":"}</td></tr>
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
						{this.props.data.drugsOfCompany.drugs.map((drug, i) => <DrugTableRow key={i} data={drug} id={i+1} />)}
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
                <td><a href={"https://clinicaltrials.gov/ct2/results?cond=&term=" + this.props.data.name.split(",")[0] + 
                "&cntry=&state=&city=&dist="}>Link</a></td>
			</tr>	
		);
	}
}


export default CompanyOverview;

