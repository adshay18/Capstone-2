import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import BoredApi from './Api';
import UserContext from './UserContext';

const ActivityCard = ({id, results}) =>{
    const {currUser} = useContext(UserContext)
    const [activities, setActivities] = useState(currUser.activities)
    const [ids, setIds] = useState([])
    const [text, setText] = useState('')

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
            async function getText(key) {
                let res = await axios.get(`https://www.boredapi.com/api/activity?key=${key}`)
                setText(res.data.activity)
            }
            
            getText(id)
        }, [activities, currUser]
    )

    return (
		<Card className="card activity-link">
			<CardBody>
				<CardSubtitle>{text}</CardSubtitle>
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