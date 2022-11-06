import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import UserContext from './UserContext';
import './ActivityForm.css';
import BoredApi from './Api';

const ActivityForm = () => {
	const INIT = { type: "select", participants: 1, price: "Yes"};
	const [ formData, setFormData ] = useState(INIT);
	const history = useHistory();
	const { login, signup } = useContext(UserContext);
	const [ errors, setErrors ] = useState([]);
    const types = ["select", "education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
    const participants = [1, 2, 3, 4, 5, 6, 7, 8]

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			alert('you clicked submit')
		} catch (err) {
			setErrors(err);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
        console.log(name, value)
		setFormData((data)=> ({
			...data,
			[name]: value
		}));
	};
		

	return (
		<Card>
			<CardTitle>Bored No More!</CardTitle>
			{errors ? <CardSubtitle>{errors}</CardSubtitle> : null}
			<CardBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="type">Type</Label>
						<select
							id="type"
							name="type"
                            value={formData.type}
							onChange={handleChange}
							required
						>
                            {types.map(type => <option value={type} key={Math.random()}>{type}</option>)}
                        </select>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="participants">Participants</Label>
                        <select
							id="participants"
							name="participants"
                            value={formData.participants}
							onChange={handleChange}
							required
						>
                            {participants.map(num => <option value={num} key={Math.random()}>{num}</option>)}
                        </select>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="price">Free</Label>
						<select
                            id="price"
                            name="price"
                            vale={formData.price}
                            onChange={handleChange}
                            required>
                            <option value="yes" key={1}>Yes</option>
                            <option value="no" key={2}>No</option>
                        </select>
					</FormGroup>
					<Button>Submit</Button>
				</Form>
			</CardBody>
		</Card>
	);
};

export default ActivityForm;