import dayjs from "dayjs";
import { NEWS_FEED_DATE_FORMAT } from "../consts";

interface NewsElement {
	webTitle: string;
	webUrl: string;
	webPublicationDate: string;
}

export const getNews = (search: any, date: any, category: any) => {
	
	let baseUrl = `https://content.guardianapis.com/search?`;
	let params = '';
	if (search) params = `q=${search}&`;
	if (category.startsWith("Guardian.category.")) {
		params += `sectionName=${category.substr(18)}&`;
	}
	if (date) {
		let formatedDate = dayjs(date).format(NEWS_FEED_DATE_FORMAT);
        params += `from-date=${formatedDate}&to-date=${formatedDate}&`;
	}
	let url = `${baseUrl}${params}api-key=${process.env.REACT_APP_GUARDIAN_KEY}`

	return fetch(url)
		.then((response) => response.json())
		.then(data => {
			return data.response.results.map((el: NewsElement) => {
				return {
					title: el.webTitle, 
					url: el.webUrl, 
					date: el.webPublicationDate
				}
			})
		})
}