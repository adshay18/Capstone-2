import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';

const Routes = () => {
	return (
		<Router>
            <NavBar />
            <main>
				<Switch>
					<Route exact path="/">
                        <div className="App">
                            <header className="App-header">
                            <p>
                                Future homepage.
                            </p>
                            </header>
                        </div>
					</Route>
					{/* <Route exact path="/users/:username">
						<div>

                        </div>
					</Route>
					<Route path="/companies/:handle">
						<CompanyDetail />
					</Route>
					<Route exact path="/jobs">
						<JobList />
					</Route>
					<Route exact path="/login">
						<LoginForm />
					</Route>
					<Route exact path="/signup">
						<SignupForm />
					</Route>
					<Route exact path="/profile">
						<EditProfileForm />
					</Route> */}
					<Route>
						<p>404 page not found</p>
					</Route>
				</Switch>
            </main>
		</Router>
	);
};

export default Routes;