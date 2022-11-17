import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UserContext from './UserContext';
import './LoginForm.css';
import BoredApi from './Api';

const LoginForm = () => {
	// Set initial form state
	const { login } = useContext(UserContext);
	const INIT = { username: '', password: '' };
	const [ formData, setFormData ] = useState(INIT);
	const history = useHistory();
	const [ errors, setErrors ] = useState([]);

	// Verify user exists and entered correct info
	async function auth(info) {
		let res = await BoredApi.loginUser(info);
		return res.token;
	}

	// Login user on form submission and assign token
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let token = await auth(formData);
			if (token) {
				BoredApi.token = token;
				login(token);
				setFormData(INIT);
				history.push('/');
			}
		} catch (err) {
			setErrors([ err ]);
		}
	};

	// Controls inputs when user makes changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};
	return (
		<section className='col-md-12'>
			 <div className="container mb-4 pt-5 d-flex justify-content-center">
				<Card className="login-form shadow border-0">
					<CardTitle>Log In</CardTitle>
					{errors ? <CardSubtitle>{errors}</CardSubtitle> : null}
					<CardBody>
						<Form onSubmit={handleSubmit}>
							<FormGroup>
								<Label htmlFor="username">Username</Label>
								<Input
									type="text"
									id="username"
									name="username"
									value={formData.username}
									onChange={handleChange}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="username">Password</Label>
								<Input
									type="password"
									id="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</FormGroup>
							<Button>Submit</Button>
						</Form>
					</CardBody>
				</Card>
			 </div>
			
		</section>
	);
};

export default LoginForm;
