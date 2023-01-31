import dayjs from "dayjs";
import { NEWS_FEED_DATE_FORMAT } from "../consts";

interface NewsElement {
    title: string;
    url: string;
    publishedAt: string;
}

export const getNews = (search: any, date: any, category: any) => {
    let baseUrl = `https://newsapi.org/v2/`;
    if (category) baseUrl += `top-headlines?`; else baseUrl += `everything?`;
    let params = '';
    if (search) params = `q=${search}&`;
    if (category.startsWith("NewsAPI.category.")) {
		params += `category=${category.substr(17)}&`;
	}
    if (date) {
        let formatedDate = dayjs(date).format(NEWS_FEED_DATE_FORMAT);
        params += `from=${formatedDate}T00:00:00&to=${formatedDate}T00:00:00&`;
    }
    if (!search && !category) {
        params += `sources=abc-news&`;
    }
    let url = `${baseUrl}${params}pageSize=10&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`;

    return fetch(url)
    .then((response) => response.json())
    .then(data => {
        return data.articles.map((el: NewsElement) => {
            return {
                title: el.title, 
                url: el.url,
                date: el.publishedAt
            }
        })
    })
}