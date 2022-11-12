import './App.css';
import React, { useState, useEffect } from 'react';
import BoredApi from './Api';
import jwt from 'jwt-decode';
import UserContext from './UserContext';
import Routes from './Routes';

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
		<UserContext.Provider value={{ currUser, token, login, logout, signup }}>
			<Routes/>
		</UserContext.Provider>
	);
}

export default App;
