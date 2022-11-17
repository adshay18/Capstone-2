import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UserContext from './UserContext';
import './SignupForm.css';
import BoredApi from './Api';

const EditForm = () => {

    const {currUser} = useContext(UserContext)
	const history = useHistory();
    const {username} = useParams();
	const [ errors, setErrors ] = useState([]);
    const INIT = {firstName: '', lastName: '', email: '', avatar: ''}
	const [ formData, setFormData ] = useState(INIT);

	// Update user and send back to user profile page on form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await BoredApi.updateUser(username, formData)
			history.push(`/users/${username}`)
		} catch (err) {
			setErrors(err);
		}
	};

	// Control inputs when user types
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data)=> ({
			...data,
			[name]: value
		}));
	};
		
    useEffect(
        () => {
            async function initialize() {
                let url = '';
                if (currUser.avatar) {
                    url = currUser.avatar
                    setFormData({firstName: currUser.firstName, lastName: currUser.lastName, email: currUser.email, avatar: url})
                } else {
                    setFormData({firstName: currUser.firstName, lastName: currUser.lastName, email: currUser.email, avatar: url})
                }
            }
            initialize()
        }, [currUser]
    )

	return (
		<section className='col-md-12'>
			<div className="container mb-4 pt-5 d-flex justify-content-center">
				<Card className='signup-form border-0 shadow'>
					<CardTitle>Edit Profile</CardTitle>
					{errors ? <CardSubtitle>{errors}</CardSubtitle> : null}
					<CardBody>
						<Form onSubmit={handleSubmit}>
							<FormGroup>
								<Label htmlFor="first-name">First name</Label>
								<Input
									type="text"
									id="first-name"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="last-name">Last name</Label>
								<Input
									type="text"
									id="last-name"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="avatar">Avatar URL</Label>
								<Input
									type="url"
									id="avatar"
									name="avatar"
									value={formData.avatar}
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

export default EditForm;