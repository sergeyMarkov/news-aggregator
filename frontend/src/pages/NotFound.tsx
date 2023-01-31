import { useEffect } from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {

	useEffect(() => {
		console.log('init not found');
	}, []);

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-md-4">
					<form>
						Page not found
					</form>
					<Link to="/">back to home</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound;