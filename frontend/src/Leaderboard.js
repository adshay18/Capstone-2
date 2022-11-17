import React, { useContext, useEffect, useState } from 'react';
import BoredApi from './Api';
import UserRow from './UserRow';
import UserContext from './UserContext';
import './Leaderboard.css'

const Leaderboard = () => {
    // Grab state for leaderboard
    const [leaderboard, setLeaderboard] = useState([])
    const { currUser } = useContext(UserContext)

    useEffect(
        () => {
            const getLeaderboard = async () => {
                let res = await BoredApi.getLeaderboard();
                setLeaderboard(res.leaderboard)
            }
            getLeaderboard();
        }, [currUser]
    )

    return (
        <section className='col-md-12 justify-content-center'>
            <table className='rounded-top'>
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map(user => <UserRow key={user.username} username={user.username} avatar={user.avatar} tasks={user.completedTasks}/>)}
                </tbody>
            </table>
        </section>
    )
}

export default Leaderboard;