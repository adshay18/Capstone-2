import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

const Home = () => {
	const { currUser } = useContext(UserContext);
	return (
		<section className="col-md-8">
			<Card>
				<CardBody className="text-center">
					<CardTitle className="font-weight-bold">
						<b>Bored?</b>
					</CardTitle>
					<span>Not anymore.</span>
					{currUser.username ? (
						<h2>Welcome back, {currUser.firstName}!</h2>
					) : (
						<div>
							<Button className="Home-form-button">
								<Link to="login">Log in</Link>
							</Button>
							<Button className="Home-form-button">
								<Link to="/signup">Sign up</Link>
							</Button>
						</div>
					)}
				</CardBody>
			</Card>
		</section>
	);
}

export default Home;
