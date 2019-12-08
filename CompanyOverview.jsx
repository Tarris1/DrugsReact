import React from 'react'

var digits = 2;
function numberFormatting(number, digits = digits) {
    if (number.length!=0){ //Checks if its actually a number
        var newNumber = new Intl.NumberFormat('ja-JP', {maximumFractionDigits: digits }).format(number);
        return ("$"+newNumber)}
    else{return number};
}

class CompanyOverview extends React.Component{
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
                            <td>#</td>
                            <td>Name</td>
                            <td>Ticker</td>
                            <td>Exchange</td>
                            <td>Price</td>
                            <td>Shares</td>
                            <td>Market Cap.</td>
                            <td>Quarterly Revenue</td>
                            <td>Drugs</td>
                            <td>Specialization</td>
                            <td>Press Releases</td>
                            <td>Headquarters</td> 
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
				<td>{numberFormatting(this.props.data.price)}</td>
				<td>{numberFormatting(this.props.data.shares, digits = 0)}</td>
				<td>{numberFormatting(this.props.data.marketCap, digits = 0)}</td>
				<td>{numberFormatting(this.props.data.quarterly, digits = 0)}</td>
                <td><button name={this.props.data.name} value={JSON.stringify(this.props.data.drugs)} onClick={this.props.companyDrugs}>Products</button></td>
				<td>{this.props.data.specialization}</td>
				<td><a href={this.props.data.pressReleases}>Link</a></td>
				<td>{this.props.data.headquarters}</td>
			</tr>
		)
    }
}

export default CompanyOverview;

