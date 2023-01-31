import React, { useEffect, useState } from 'react';
import UserMenu from '../components/UserMenu';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ApiDomainUrl, ApiKey, PLEASE_WAIT } from '../helpers/consts';
import PreferencesDetails from '../models/PreferencesDetails';
import StatusMessage from '../components/StatusMessage';

const NewsPreferences = () => {

    const [state, setState] = useState<PreferencesDetails>({
        showNewsAPI: false,
        showNYTimes: false,
        showGuardian: false,
        isLoaded: false
    });

    const [prefs, setPrefs] = useState<string[]>([]);

    const user_id = localStorage.getItem('token');
	if (!user_id) { throw Error("Unauthorized API request"); }

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = (e: any) => {
        setShowMessage(false);
    }

    const handleUpdatePreferences = (e: any) => {
        e.preventDefault();
        axios
			.create({ 
				validateStatus: function() { return true; },
				headers: { 'Authorization': ApiKey, 'user_id': JSON.parse(user_id) }
			})
			.post(`${ApiDomainUrl}/preferences/` + JSON.parse(user_id), {
				newsAPI: state.showNewsAPI,
                NYTimes: state.showNYTimes,
                guardian: state.showGuardian,
                preferences: prefs
			})
			.then(res => {
                setMessage(res.data.message);
                setShowMessage(true);
			});
    }

    useEffect(() => {
        axios
			.create({ 
				validateStatus: function() { return true; },
				headers: { 'Authorization': ApiKey, 'user_id': JSON.parse(user_id) }
			})
			.get(`${ApiDomainUrl}/preferences/` + JSON.parse(user_id))
			.then(result => {
				const res = result.data.data;
                if (res) {
                    setState({
                        ...state,
                        showNewsAPI: res.newsAPI || false,
                        showNYTimes: res.NYTimes || false,
                        showGuardian: res.guardian || false,
                        isLoaded: true
                    })
                    setPrefs([
                        ...prefs,
                        ...JSON.parse(res.preferences)
                    ]);
                } else {
                    setState({
                        ...state,
                        isLoaded: true
                    })
                }
			});
    // eslint-disable-next-line
    }, []);

    const handleClick = (e: any) => {
        setState({
            ...state,
            showNewsAPI: (e.target.id === 'NewsAPI') ? e.target.checked : state.showNewsAPI,
            showNYTimes: (e.target.id === 'NYTimes') ? e.target.checked : state.showNYTimes,
            showGuardian: (e.target.id === 'Guardian') ? e.target.checked : state.showGuardian,
        })
    }

    const handleCbxChange = (e: any) => {
        if (e.target.checked) {
            setPrefs([
                ...prefs,
                e.target.id
            ])
        } else {
            setPrefs(old => old.filter(el => el !== e.target.id));
        }
    }

	return (
		<div className="container">
            <UserMenu activeMenu='/news-preferences'/>
            <h1>Preferences</h1>                
            {!state.isLoaded ? <>{PLEASE_WAIT}</> :
            <form onSubmit={handleUpdatePreferences}>
                <StatusMessage message={message} showMessage={showMessage} handleClose={handleClose} />

                <small>Customize your news feed by selecting your preferred sources, categories, and authors:</small>
                <div className="detailed-preferences">
                <Form.Check type="switch" id="NewsAPI" checked={state.showNewsAPI} label="NewsAPI" onChange={handleClick} />
                {state.showNewsAPI && <>
                <b>Sources:</b>
                    <Form.Check type="checkbox" id="NewsAPI.source.abc-news-au" label="ABC News (AU)" checked={prefs.includes("NewsAPI.source.abc-news-au")} onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.source.australian-financial-review" checked={prefs.includes("NewsAPI.source.australian-financial-review")} label="Australian Financial Review" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.source.google-news-au" checked={prefs.includes("NewsAPI.source.google-news-au")} label="Google News (Australia)" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.source.news-com-au" checked={prefs.includes("NewsAPI.source.news-com-au")} label="News.com.au" onChange={handleCbxChange} />
                <b>Categories:</b>
                    <Form.Check type="checkbox" id="NewsAPI.category.business" checked={prefs.includes("NewsAPI.category.business")} label="Business" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.category.entertainment" checked={prefs.includes("NewsAPI.category.entertainment")} label="Entertainment" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.category.health" checked={prefs.includes("NewsAPI.category.health")} label="Health" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.category.science" checked={prefs.includes("NewsAPI.category.science")} label="Science" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.category.sports" checked={prefs.includes("NewsAPI.category.sports")} label="Sports" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NewsAPI.category.technology" checked={prefs.includes("NewsAPI.category.technology")} label="Technology" onChange={handleCbxChange} />
                <hr/>
                </>}
                </div>

                <div className="detailed-preferences">
                <Form.Check type="switch" id="NYTimes" checked={state.showNYTimes} label="NY Times" onChange={handleClick} />
                {state.showNYTimes && <>
                <b>Sources:</b>
                    <Form.Check type="checkbox" id="NYTimes.source.The New York Times" checked={prefs.includes("NYTimes.source.The New York Times")} label="The New York Times" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NYTimes.source.AP" checked={prefs.includes("NYTimes.source.AP")} label="AP" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NYTimes.source.Reuters" checked={prefs.includes("NYTimes.source.Reuters")} label="Reuters" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NYTimes.source.International Herald Tribune" checked={prefs.includes("NYTimes.source.International Herald Tribune")} label="International Herald Tribune" onChange={handleCbxChange} />
                <b>Categories:</b>
                    <Form.Check type="checkbox" id="NYTimes.category.Foreign" checked={prefs.includes("NYTimes.category.Foreign")} label="Foreign" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="NYTimes.category.Sports" checked={prefs.includes("NYTimes.category.Sports")} label="Sports" onChange={handleCbxChange} />
                <hr/>
                </>}
                </div>

                <div className="detailed-preferences">
                <Form.Check type="switch" id="Guardian" checked={state.showGuardian} label="Guardian" onChange={handleClick} />
                {state.showGuardian && <>
                <b>Categories:</b>
                    <Form.Check type="checkbox" id="Guardian.category.australia-news" checked={prefs.includes("Guardian.category.australia-news")} label="Australia news" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="Guardian.category.better-business" checked={prefs.includes("Guardian.category.better-business")} label="Better Business" onChange={handleCbxChange} />
                    <Form.Check type="checkbox" id="Guardian.category.books" checked={prefs.includes("Guardian.category.books")} label="Books" onChange={handleCbxChange} />
                <hr/>
                </>}
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>}
            
        </div>
	)
}

export default NewsPreferences;