import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import UserContext from './UserContext';
import './ActivityForm.css';
import axios from 'axios';
import ActivityCard from './ActivityCard';

const ActivityForm = () => {
    // Initial Form Data
	const INIT = { type: "education", participants: 1, price: "Yes"};
	const [ formData, setFormData ] = useState(INIT);
	const [ errors, setErrors ] = useState([]);
    const types = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
    const participants = [1, 2, 3, 4, 5, 6, 7, 8]

    // Form submission variables
    const url = `http://www.boredapi.com/api/activity?type=${formData.type}&participants=${formData.participants}`
    const [submitted, setSubmitted] = useState(false)
    const [results, setResults] = useState(null)

    // ------------ Form handlers -------------------

    // Handle form submit button
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            if(formData.price==="yes"){
                const res = await axios.get(url+'&price=0.0');
                setResults(res.data);
                setSubmitted(true);
            } else{
                const res = await axios.get(url);
                setResults(res.data);
                setSubmitted(true);
            };
		} catch (err) {
			setErrors(err);
		}
	};

    // Control elements in the form
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data)=> ({
			...data,
			[name]: value
		}));
	};
		
    // Handle click of random button
    const handleClick = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.get('http://www.boredapi.com/api/activity/');
            setResults(res.data);
            setSubmitted(true);
        } catch (err) {
            setSubmitted(false)
        }
    }

	return (
        <div>
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
                <Button onClick={handleClick}>Random</Button>
			</CardBody>
		</Card>
        {submitted ? 
            <div>
               {results.error ? <p>"Oops! Try different filters or a random activity"</p> : <ActivityCard id={+results.key} results={results.activity}/>}
            </div>
            : null}
        </div>
		
	);
};

export default ActivityForm;