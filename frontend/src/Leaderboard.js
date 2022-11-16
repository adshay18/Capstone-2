import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';


const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const { currUser } = useContext(UserContext)


    useEffect(
        () => {
            async function getLeaderboard() {
                let res = await BoredApi.getLeaderboard();
                console.log(res)
                setLeaderboard(res)
            }
            getLeaderboard();
            console.log(leaderboard)
        }, [currUser]
    )

    return (
        <section className='col-md-12 justify-content-center'>
            {leaderboard.map(user => <span>{user.username}</span>)}
        </section>
    )
}

export default Leaderboard;