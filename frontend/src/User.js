import React, { useContext } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

const User = () =>{
    // const {currUser} = useContext(UserContext)
    let {username} = useParams()
    console.log(username)
    
    return (
        <section className='col-md-8'>
            <Card>
                <CardBody className='text-center'>
                <CardTitle className="font-weight-bold">
						<b>{username}</b>
					</CardTitle>
                </CardBody>
            </Card>
        </section>
    )
};

export default User;