import React, { useContext } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import UserContext from './UserContext';

function NavBar() {
	const { currUser, logout } = useContext(UserContext);
	return (
		<div>
			<Navbar expand="md">
				<NavLink exact to="/" className="navbar-brand">
					Not Bored
				</NavLink>

				{currUser.username ? (
					<Nav className="ml-auto" navbar>
						{/* <NavItem>
							<NavLink to="/jobs">Jobs</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/companies">Companies</NavLink>
						</NavItem> */}
						<NavItem>
							<NavLink to="/profile">{currUser.username}</NavLink>
						</NavItem>
						<Button onClick={logout}>logout</Button>
					</Nav>
				) : (
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink to="/login">Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/signup">Signup</NavLink>
						</NavItem>
					</Nav>
				)}
			</Navbar>
		</div>
	);
}

export default NavBar;
