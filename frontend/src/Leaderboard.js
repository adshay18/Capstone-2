import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';


const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const { currUser } = useContext(UserContext)


    useEffect(
        () => {
            const getLeaderboard = async () => {
                let res = await BoredApi.getLeaderboard();
                console.log(res)
                setLeaderboard(res.leaderboard)
            }
            getLeaderboard();
        }, [currUser]
    )

    return (
        <section className='col-md-12 justify-content-center'>
            <ul>
            {leaderboard.map(user => <li>{user.username}</li>)}

            </ul>
        </section>
    )
}

export default Leaderboard;