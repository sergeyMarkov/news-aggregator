import React, { useEffect, useState } from 'react';
import UserMenu from '../components/UserMenu';
import { getNews as getGuardianNews } from '../helpers/newsFeeds/guardian';
import { getNews as getNewsAPINews } from '../helpers/newsFeeds/newsapi';
import { getNews as getNYTimesNews } from '../helpers/newsFeeds/nytimes';
import axios from 'axios';
import { ApiDomainUrl, ApiKey, NEWS_FEED_DATE_FORMAT, PLEASE_WAIT } from '../helpers/consts';
import NewsArticle from '../models/NewsArticle';
import ListGroup from 'react-bootstrap/ListGroup';
import { Search } from '../components/Search';
import DashboardDetails from '../models/DashboardDetails';
import dayjs from "dayjs";

function Dashboard() {

    const [allNews, setAllNews] = useState<NewsArticle[]>([]);
    const [state, setState] = useState<DashboardDetails>({
        showNewsAPI: false,
        showNYTimes: false,
        showGuardian: false,
        isLoaded: false,
        searchText: '',
        searchDate: dayjs(new Date()).format(NEWS_FEED_DATE_FORMAT), // today
        searchCategory: ''
    });

    const user_id = localStorage.getItem('token');
	if (!user_id) { throw Error("Unauthorized API request"); }

    const getNewsHelper = async (showNewsAPI: boolean, showNYTimes: boolean, showGuardian: boolean) => {
        let [news1, news2, news3] = await Promise.all([
            ...(showNewsAPI ? [getNewsAPINews(state.searchText, state.searchDate, state.searchCategory)] : []),
            ...(showNYTimes ? [getNYTimesNews(state.searchText, state.searchDate)] : []),
            ...(showGuardian ? [getGuardianNews(state.searchText, state.searchDate, state.searchCategory)] : [])
            ]);
        setAllNews([...(news1 || []), ...(news2 || []), ...(news3 || [])]);
    }

    useEffect(() => {
        axios
			.create({ 
				validateStatus: function() { return true; },
				headers: { 'Authorization': ApiKey, 'user_id': JSON.parse(user_id) }
			})
			.get(`${ApiDomainUrl}/preferences/` + JSON.parse(user_id))
			.then(result => {
                if (result.data.data) {
                    const res = result.data.data;
                    setState({
                        ...state,
                        showNewsAPI: res.newsAPI,
                        showNYTimes: res.NYTimes,
                        showGuardian: res.guardian,
                        isLoaded: true
                    });
                    getNewsHelper(res.newsAPI, res.NYTimes, res.guardian);
                }  else {
                    setState({
                        ...state,
                        isLoaded: true
                    });
                }
				
			});
    // eslint-disable-next-line
    }, [state.searchText, state.searchDate, state.searchCategory]);

    const handleSearchTextBlur = (e:any) => {
        setState({
            ...state,
            searchText: e.target.value
        })
    }

    const handleSearchDateBlur = (e: any) => {
        console.log('date blur', dayjs(e.target.value).format(NEWS_FEED_DATE_FORMAT));
        setState({
            ...state,
            searchDate: dayjs(e.target.value).format(NEWS_FEED_DATE_FORMAT)
        })
    }

    const handleCategorySelect = (e: any) => {
        console.log('category select', e.target.value);
        setState({
            ...state,
            searchCategory: e.target.value
        })
    }
    
    return (
        <div className="container">
            <UserMenu activeMenu="/dashboard" />
            <div className="col-md-12">
            <h1>News Aggregator</h1>  
            {!state.isLoaded ? <>{PLEASE_WAIT}</> :
                <>
                    <Search 
                        onTextBlur={handleSearchTextBlur} 
                        onDateBlur={handleSearchDateBlur} 
                        searchDate={state.searchDate} 
                        onCategorySelect={handleCategorySelect}
                    />

                    <ListGroup className={"news-list"}>
                    {allNews.map((el, idx) => 
                    <ListGroup.Item key={idx} action href={el.url}>{el.title}
                    <br /><small>{el.date}</small></ListGroup.Item>
                    )}  
                    </ListGroup>
                    
                </>
            }
            </div>
        </div>
    )
}

export default Dashboard;