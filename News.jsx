import React from 'react';
//let blog = require ('./Data/blogs/daridorexant.html')
//Scientific journals: see journal.csv in Desktop/Scraping
//https://www.scimagojr.com/journalrank.php?category=2701
//News sources: See drugs.xlsx "Resources"
//FDA/EMA/Japan/etc news of approvals - https://open.fda.gov/, https://www.fda.gov/news-events/fda-newsroom/press-announcements, https://www.ema.europa.eu/en/news-events, http://english.nmpa.gov.cn/index.html


class News extends React.Component {
    constructor() {
		super();
		this.state = { //State is the place where data comes from - make as simple as possible
            window: {LiteratureBtn: true, GeneralNewsBtn: false, RegulatoryBtn: false},
        }
    };
    render() {
        return(
            <div>
                <div id="NewsHeader">
                    <button name="LiteratureBtn">Literature</button>
                    <button name="GeneralNewsBtn">General News</button>
                    <button name="RegulatoryBtn">Regulatory Updates</button>
                </div>
                {this.state.window.LiteratureBtn ? (<Literature></Literature>) : (<div></div>)}
                {this.state.window.GeneralNewsBtn ? (<GeneralNews></GeneralNews>) : (<div></div>)}
            </div>
        )
    }
}

class Literature extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Journal</th>
                            <th>Published</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class GeneralNews extends React.Component { //Press releases
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Newspaper</th>
                            <th>Published</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class Regulatory extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>FDA</th>
                            <th>EMA</th>
                            <th>NMPA</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default News;