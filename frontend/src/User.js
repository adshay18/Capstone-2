import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useParams } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';
import './Home.css';

const User = () =>{
    const {currUser} = useContext(UserContext);
    let {username} = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [notFound, setNotFound] = useState(false)
    const [badges, setBadges] = useState(null)

    useEffect(()=>{
        BoredApi.getUser(username)
            .then(res => setUserDetails(res.user))
            .then(res => setNotFound(false))
            .catch(err => setNotFound(true))
        if(!notFound) {
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
                </CardBody>}
            </Card>
        </section>
    );
};

export default User;