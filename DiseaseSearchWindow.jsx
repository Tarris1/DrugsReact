import React from 'react';

class DiseaseSearchWindow extends React.Component {
    constructor(){
		super();
		this.state = {
            search: "",
            searchResults: []
		}
	}
    changeSearchArea = event => {
        var searchInput = event.target.value.toLowerCase();
        const allDiseases = this.props.data;
        this.setState({ search: searchInput})
        var searchResults = []
        for (var disease in allDiseases) {
            var diseaseName = allDiseases[disease]
            diseaseName = diseaseName.toLowerCase();
            if (diseaseName.indexOf(searchInput) !== -1) {
                searchResults.push(diseaseName)
            }
        }
        if (searchResults.length<25){this.setState( { searchResults: searchResults})}

}
	render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Search for a disease: <input type="text" name="diseaseSearch" 
                            value={this.state.search} onChange={this.changeSearchArea}/></label></td>
                        </tr>
                        {this.state.searchResults.map((disease, i) => <tr key={i}><td>{disease}</td></tr>)}
                    </tbody>
                </table>
            </div>


        )
        


    }
}

export default DiseaseSearchWindow