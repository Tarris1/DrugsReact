import React from 'react'

class CompanyOverview extends React.Component{
	render() {
		return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Search: <input type="text" name = "companySearch" 
                            value = {this.props.data.companySearch} onChange = {this.props.searchCompany}/></label></td>
                        </tr>
                    </tbody>
                </table>
                <table id = "CompanyTable">
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
                            {/*<td>Drugs</td>*/}
                            <td>Specialization</td>
                            <td>Press Releases</td>
                            <td>Headquarters</td> 
                        </tr>
                        
                        {this.props.data.companyData.map((company, j) => <CompanyRow key = {j} data = {company}/>)}
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
				<td>{this.props.data.ticker}</td>
				<td>{this.props.data.exchange}</td>
				<td>{this.props.data.price}</td>
				<td>{this.props.data.shares}</td>
				<td>{this.props.data.marketCap}</td>
				<td>{this.props.data.quarterly}</td>
				{/*<td>{this.props.data.drugs}</td>*/}
				<td>{this.props.data.specialization}</td>
				<td>{this.props.data.pressReleases}</td>
				<td>{this.props.data.headquarters}</td>
			</tr>
		)
    }
}

export default CompanyOverview;

