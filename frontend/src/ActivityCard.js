import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import BoredApi from './Api';
import UserContext from './UserContext';

const ActivityCard = ({id, results}) =>{
    const {currUser} = useContext(UserContext)
    const [activities, setActivities] = useState(currUser.activities)
    const [ids, setIds] = useState([])

    const add = async (username, id) => {
        await BoredApi.addTask(username, id)
        setActivities([...activities, {taskID: +id, 
                username: currUser.username, 
                completed: false}]);
    };

    useEffect(
        () => {
            let bin = [];
            for (let i = 0; i < activities.length; i++) {
                bin.push(activities[i].taskID)
                setIds(bin)
            }
        }, [activities]
    )

    return (
		<Card className="card activity-link">
			<CardBody>
				<CardSubtitle>{results}</CardSubtitle>
				{ids.includes(id) ? (
					<Button>Added</Button>
				) : (
					<Button onClick={() => add(currUser.username, id)}>Add</Button>
				)}
			</CardBody>
		</Card>
	);
};

export default ActivityCard;