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
    const [activities, setActivities] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        // get initial user data and extrapolate user's activities and badges
        async function getUserDetails(username) {
            try{
            let res = await BoredApi.getUser(username);
            setUserDetails(res.user)
            setActivities(res.user.activities)
            setLoading(false)
            } catch {
                setNotFound(true)
            }    
        }

        getUserDetails(username);
    }, [username])

    return (
        
        <section className='col-md-8'>
            {loading ? <p>Loading...</p> : <Card>
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
                            {/* {badges.map(badge => <li key={badge.Id}>{badge.Id}</li>)} */}
                        </ul>
                    </div>
                    <div className='activities'>
                        {activities.map(activity => <ActivityCard key={activity.taskID} id={activity.taskID}/>)}
                    </div>
                </CardBody>}
            </Card>}
        </section>
    );
};

export default User;