import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import SignupForm from './SignupForm';

const Routes = () => {
	return (
		<Router>
            <NavBar />
            <main>
				<Switch>
					<Route exact path="/">
                        Home
					</Route>
                    <Route exact path="/signup">
						<SignupForm />
					</Route>
					<Route exact path="/login">
						<p>
                            Future login form
                        </p>
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