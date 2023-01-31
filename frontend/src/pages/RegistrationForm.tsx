import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Registration from "../models/Registration";
import { ApiDomainUrl, ApiKey } from "../helpers/consts";

const RegistrationForm = () => {

	const [registrationDetails, setRegistrationDetails] = useState<Registration>({
		name: '',
		email: '',
		password: ''
	});

	useEffect(() => {
		console.log('init RegistrationForm');
	}, []);

	const handleRegister = (e: any) => {
		e.preventDefault();

		axios
			.create({
				validateStatus: function () { return true; },
				headers: { 'Authorization': ApiKey }
			})
			.post(`${ApiDomainUrl}/register`, {
				name: registrationDetails.name,
				email: registrationDetails.email,
				password: registrationDetails.password
			})
			.then(res => {
				console.log(res);

				const rData = res.data;
				if (rData.success === true) {
					console.log('success');
				} else {
					setRegistrationDetails({
						...registrationDetails,
						message: rData.message // show failure message
					})
				}
			});
	}

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-md-4">
					<h1>Registration form</h1>
					<form onSubmit={handleRegister}>
						<div className="form-group">
							<label>Name</label>
							<input type="text"
								className="form-control"
								required
								onChange={(event) => {
									setRegistrationDetails({
										...registrationDetails,
										name: event.target.value
									})
								}}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email"
								className="form-control"
								required
								onChange={(event) => {
									setRegistrationDetails({
										...registrationDetails,
										email: event.target.value
									})
								}}
							/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								autoComplete="new-password"
								required
								onChange={(event) => {
									setRegistrationDetails({
										...registrationDetails,
										password: event.target.value
									})
								}}
							/>
						</div>

						{registrationDetails.message && (<div className="alert alert-danger" role="alert">{registrationDetails.message} </div>)}

						<div className={"text-center"}>	
							<button type="submit" className="btn btn-primary">Register</button>	
							<div><Link to="/">back to home</Link></div>
						</div>

					</form>
				</div>
			</div>
		</div>
	)
}

export default RegistrationForm;