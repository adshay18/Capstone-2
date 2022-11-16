import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import SignupForm from './SignupForm';
import Home from './Home'
import User from './User';
import ActivityForm from './ActivityForm';
import BadgePage from './BadgePage';
import EditForm from './EditForm';

const Routes = () => {
	return (
		<Router>
            <NavBar />
            <main>
				<Switch>
					<Route exact path="/">
                        <Home />
					</Route>
                    <Route exact path="/signup">
						<SignupForm />
					</Route>
					<Route exact path="/login">
						<LoginForm />
					</Route>
					<Route path="/users/:username">
						<User/>
					</Route>
					<Route path="/badges/:username">
						<BadgePage />
					</Route>
					<Route path="/edit/:username">
						<EditForm />
					</Route>
					<Route exact path="/do-something">
						<ActivityForm />
					</Route>
					<Route>
						<p>404 page not found</p>
					</Route>
				</Switch>
            </main>
		</Router>
	);
};

export default Routes;