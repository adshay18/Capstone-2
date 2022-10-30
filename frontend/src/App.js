import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import BoredApi from './Api';
import jwt from 'jwt-decode'

function App() {
	const [ currUser, setCurrUser ] = useState({});
	const [ token, setToken ] = useState(localStorage.getItem('User-Token'));
	const login = (token) => {
		setToken(token);
		localStorage.setItem('User-Token', token);
	};
	const logout = () => {
		localStorage.removeItem('User-Token');
		setCurrUser({});
		setToken(undefined);
	};
	const signup = async (info) => {
		let res = await BoredApi.registerUser(info);
		return res.token;
	};

	useEffect(
		() => {
			async function getUser(username) {
				let res = await BoredApi.getUser(username);
				setCurrUser(res.user);
			}
			if (token) {
				BoredApi.token = token;
				let loggedInUser = jwt(token).username;
				if (loggedInUser) {
					getUser(loggedInUser);
				}
			}
		},
		[ token ]
	);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
