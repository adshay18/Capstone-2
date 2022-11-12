import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';
import './Home.css';
import ActivityCard from './ActivityCard';

const User = () =>{
    const {currUser} = useContext(UserContext);
    let {username} = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [notFound, setNotFound] = useState(false)
    const [badges, setBadges] = useState([])
    const [activities, setActivities] = useState([])

    useEffect(()=>{
        async function getUserDetails(username) {
            try{
            let res = await BoredApi.getUser(username);
            let activities = await BoredApi.getTasksForUser(username);
            setUserDetails(res.user)
            setActivities(activities.tasks)
            } catch {
                setNotFound(true)
            }    
        }

        getUserDetails(username);

        if(!notFound) {
            console.log(userDetails)
            BoredApi.getBadges(username).then(res => setBadges(res.badges)).catch(err => setBadges([]))
        }
    }, [username])

    return (
        
        <section className='col-md-8'>
            <Card>
                {notFound ? '404 not found' : <CardBody className='text-center'>
                    <CardTitle className="font-weight-bold">
						<b>{userDetails ? userDetails.username : "Loading..."}</b>
					</CardTitle>
                    <div>
                        <Button className="Home-form-button">
							<Link to="/do-something">Bored?</Link>
						</Button>
                    </div>
                    <div>
                        <h3>
                            Badges: {userDetails ? userDetails.completedTasks : "Loading..."}
                        </h3>
                        <ul>
                            {badges.map(badge => <li key={badge.Id}>{badge.Id}</li>)}
                        </ul>
                    </div>
                    <div className='activities'>
                        {activities.map(activity => <ActivityCard key={activity.taskID} id={activity.taskID}/>)}
                    </div>
                </CardBody>}
            </Card>
        </section>
    );
};

export default User;