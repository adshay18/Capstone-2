import './App.css';
import React, { useState, useEffect } from 'react';
import BoredApi from './Api';
import jwt from 'jwt-decode';
import UserContext from './UserContext';
import Routes from './Routes';
import { useHistory } from 'react-router-dom';

function App() {
	// Set state for current user and associated token
	const [ currUser, setCurrUser ] = useState({});
	const [ token, setToken ] = useState(localStorage.getItem('User-Token'));
	const history = useHistory();

	// Login function to set token which is needed to make API requests
	const login = (token) => {
		setToken(token);
		localStorage.setItem('User-Token', token);
	};

	// Remove token and current user
	const logout = () => {
		localStorage.removeItem('User-Token');
		setCurrUser({});
		setToken(undefined);
	};
	
	// Register a new user to db and assign token
	const signup = async (info) => {
		let res = await BoredApi.registerUser(info);
		return res.token;
	};

	useEffect(
		() => {
			async function getUser(username) {
				let res = await BoredApi.getUser(username);
				setCurrUser({...res.user});
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
		<UserContext.Provider value={{ currUser, token, login, logout, signup, history }}>
			<Routes/>
		</UserContext.Provider>
	);
}

export default App;
