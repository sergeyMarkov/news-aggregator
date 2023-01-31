import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface StatusMessageProps {
	message: string;
	showMessage: boolean;
	handleClose: any;
}

const StatusMessage = (props: StatusMessageProps) => {
	return (
		<ToastContainer position="top-end" className="p-3 position-fixed">
			<Toast show={props.showMessage} onClose={props.handleClose}>
				<Toast.Header>
					<strong className="me-auto">Status</strong>
				</Toast.Header>
				<Toast.Body>{props.message}</Toast.Body>
			</Toast>
		</ToastContainer>
	)
}

export default StatusMessage;