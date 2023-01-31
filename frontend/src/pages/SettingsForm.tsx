import { useEffect, useState } from 'react';
import UserMenu from '../components/UserMenu';
import Settings from "../models/Settings";
import axios from 'axios';
import { ApiDomainUrl, ApiKey, PLEASE_WAIT } from '../helpers/consts';
import StatusMessage from '../components/StatusMessage';

function SettingsForm() {

	const [settingsDetails, setSettingsDetails] = useState<Settings>({
		name: '',
		isLoaded: false
	});

	const user_id = localStorage.getItem('token');
	if (!user_id) { throw Error("Unauthorized API request"); }

	const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = (e: any) => {
        setShowMessage(false);
    }

	useEffect(() => {
		// show details
		axios
            .create({ 
                validateStatus: function() { return true; },
                headers: { 'Authorization': ApiKey, 'user_id': JSON.parse(user_id) }
            })
            .get(`${ApiDomainUrl}/details/` + JSON.parse(user_id))
            .then(res => {
				setSettingsDetails({
					...setSettingsDetails,
					name: res.data.data.name,
					isLoaded: true
				});
            });
	// eslint-disable-next-line
	},[]);

	const handleUpdateSettings = async (e: any) => {
		e.preventDefault();
		await axios
			.create({ 
				validateStatus: function() { return true; },
				headers: { 'Authorization': ApiKey, 'user_id': JSON.parse(user_id) }
			})
			.post(`${ApiDomainUrl}/details/` + JSON.parse(user_id), {
				name: settingsDetails.name
			})
			.then(res => {
				console.log(res.data.message);
				setMessage(res.data.message);
				setShowMessage(true);
			});
	}

	return (
		<div className="container">
            <UserMenu activeMenu="/settings" />
			<div className="col-md-6">
            <h1>Personal details</h1>    
			{!settingsDetails.isLoaded ? <>{PLEASE_WAIT}</> :
			<form onSubmit={handleUpdateSettings}>
				<StatusMessage message={message} showMessage={showMessage} handleClose={handleClose} />
				<div className="form-group">
					<label>Name</label>
					<input type="text"
						className="form-control"
						required
						value={settingsDetails.name}
						onChange={(event) => {
							setSettingsDetails({
								...settingsDetails,
								name: event.target.value
							})
						}}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Update Settings
				</button>
			</form>}
            </div>
        </div>
	)
}

export default SettingsForm;