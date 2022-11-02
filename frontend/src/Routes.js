import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import SignupForm from './SignupForm';
import Home from './Home'

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
						<p>future user data</p>
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