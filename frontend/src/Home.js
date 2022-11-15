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
				<div className='home-text'>
					{currUser.username ? 
						<div>
							<h1 className="title">BORED?</h1>
							<p>...again?</p>
						</div>	
						
						: 
						<div>
							<h1 className="title">BORED?</h1>
							<p>No more.</p>
						</div>}
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
			</div>
				
			
		</section>
	);
}

export default Home;
