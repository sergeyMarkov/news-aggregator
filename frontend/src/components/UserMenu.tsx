import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  activeMenu: string;
}
export default function UserMenu (props: UserMenuProps) {

	const navigate = useNavigate();

	const handleLogout = () => {
		if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      window.location.reload();
		  navigate("/");
		}
  }

	return <Container>
	  <Nav variant="pills" activeKey={props.activeMenu}>
      <Nav.Item>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/news-preferences">News Preferences</Nav.Link>
      </Nav.Item>
	    <Nav.Item>
        <Nav.Link eventKey="/logout" onClick={handleLogout}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
	</Container>
}
