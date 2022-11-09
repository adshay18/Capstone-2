import React, { useContext, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import BoredApi from './Api';
import UserContext from './UserContext';

const ActivityCard = ({id, results}) =>{
    const {currUser} = useContext(UserContext)
    const [activities, setActivities] = useState(currUser.activities)

    const add = async (username, id) => {
        await BoredApi.addTask(username, id)
        setActivities([...activities, id])
    }

    return (
		<Card className="card activity-link">
			<CardBody>
				<CardSubtitle>{results}</CardSubtitle>
                {console.log(activities)}
				{activities.includes(id) ? (
					<Button>Added</Button>
				) : (
					<Button onClick={() => add(currUser.username, id)}>Add</Button>
				)}
			</CardBody>
		</Card>
	);
};

export default ActivityCard;