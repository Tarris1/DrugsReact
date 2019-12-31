import React from 'react';

//Scientific journals: see journal.csv in Desktop/Scraping
//https://www.scimagojr.com/journalrank.php?category=2701
//News sources: See drugs.xlsx "Resources"
//FDA/EMA/Japan/etc news of approvals - https://open.fda.gov/, https://www.fda.gov/news-events/fda-newsroom/press-announcements, https://www.ema.europa.eu/en/news-events, http://english.nmpa.gov.cn/index.html



class News extends React.Component {
    render() {
        return(
            <div>
                <div id="NewsHeader">
                    <button name="LiteratureBtn">Literature</button>
                    <button name="GeneralNewsBtn">General News</button>
                    <button name="RegulatoryBtn">FDA/EMA/Etc News</button>
                </div>
            </div>
        )
    }
}

export default News;