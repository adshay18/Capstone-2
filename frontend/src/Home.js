import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

const Home = () => {
	const { currUser } = useContext(UserContext);
	return (
		<section className="col-md-12">
			
			<div className='home-container'>
				<div className='side-blue'></div>
				<div className='home-text'>
					<h1>BO</h1>
					<h1>RED?</h1>
				</div>
				{currUser.username ? 
				<h4>Welcome back, {currUser.firstName}.</h4> :
				<div>
					<Button className="Home-form-button">
						<Link to="login">Log in</Link>
					</Button>
					<Button className="Home-form-button">
						<Link to="/signup">Sign up</Link>
					</Button>
				</div>
				}
			</div>
			
		</section>
	);
}

export default Home;
