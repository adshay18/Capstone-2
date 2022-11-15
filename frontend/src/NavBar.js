import React, { useContext } from 'react';
import './NavBar.css';
import { NavLink, Link } from 'react-router-dom';
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
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    				<span className="navbar-toggler-icon"></span>
  				</button>

				  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					{currUser.username ? (
						<Nav navbar>
							<NavItem>
								<NavLink to="/do-something">Do Something</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to={`/users/${currUser.username}`}>@{currUser.username}</NavLink>
							</NavItem>
							<NavItem>
								<NavLink exact to="/">
									<Button onClick={logout} className="shadow">logout</Button>
								</NavLink>
							</NavItem>
							
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
				  </div>
				
			</Navbar>
		</div>
	);
}

export default NavBar;
