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
    const [total, setTotal] = useState(0)

    const updateTotal = function () {
        let num = total;
        num += 1;
        setTotal(num)
    }

    useEffect(()=>{
        // get initial user data and extrapolate user's activities and badges
        async function getUserDetails(username) {
            try{
            let res = await BoredApi.getUser(username);
            let activityList = res.user.activities;
            let temp = [];
            for (let i = 0; i < activityList.length; i++) {
                if (!activityList[i].completed) {
                    temp.push(activityList[i])
                }
            }
            setUserDetails(res.user)
            setActivities(temp)
            setTotal(res.user.completedTasks)
            setLoading(false)
            } catch {
                setNotFound(true)
            }    
        }

        getUserDetails(username);
    }, [username, currUser])

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
                            All time things done: {userDetails ? total : "Loading..."}
                        </h3>
                        <ul>
                            {/* {badges.map(badge => <li key={badge.Id}>{badge.Id}</li>)} */}
                        </ul>
                    </div>
                    <div className='activities'>
                        {activities.map(activity => <ActivityCard updateTotal={updateTotal} key={activity.taskID} id={activity.taskID}/>)}
                    </div>
                </CardBody>}
            </Card>}
        </section>
    );
};

export default User;