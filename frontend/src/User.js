import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';
import './User.css';
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
            {notFound ? '404 user not found' :
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                {loading ? <p>Loading...</p> :
                <div className="card p-4"> 
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                        <button className="btn btn-secondary avatar-holder"> 
                            <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                        </button> 
                        <span className="name mt-3">{userDetails.firstName} {userDetails.lastName}</span> 
                        <span className="idd">@{userDetails.username}</span> 
                        <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
                            <span className="number"> {userDetails.completedTasks} 
                                <span className="follow">Accomplishments</span>
                            </span> 
                        </div> 
                        <div className=" d-flex mt-2"> 
                            <button className="btn1 btn-dark">Edit Profile</button> 
                        </div> 
                        <div className='activities'>
                            {activities.map(activity => <ActivityCard updateTotal={updateTotal} key={activity.taskID} id={activity.taskID}/>)}
                        </div>
                    </div>
                </div>
                }
            </div>}
            <Card>
                <CardBody className='text-center'>
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
                    
                </CardBody>
            </Card>
        </section> 
    );
};

export default User;