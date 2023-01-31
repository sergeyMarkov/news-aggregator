import dayjs from "dayjs";
import { NEWS_FEED_DATE_COMPACT_FORMAT } from "../consts";

interface NewsElement {
	abstract: string;
	web_url: string;
	pub_date: string;
}

export const getNews = (search: any, date: any) => {
    console.log(search, date);
    let baseUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?`; 
    let params = '';
    if (search) params = `q=${search}&`;
    if (date) {
        let formatedDate = dayjs(date).format(NEWS_FEED_DATE_COMPACT_FORMAT);
        params += `begin_date=${formatedDate}&end_date=${formatedDate}&`;
    }
    let url = `${baseUrl}${params}api-key=${process.env.REACT_APP_NYTIMES_KEY}`;

	return fetch(url)
	.then((response) => response.json())
	.then(data => {
        return data.response.docs.map((el: NewsElement) => {
            return {
                title: el.abstract, 
                url: el.web_url, 
                date: el.pub_date
            }
        })
    })
}
