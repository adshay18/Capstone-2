import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';


const BadgePage = () => {
    const {currUser} = useContext(UserContext)
    const {username} = useParams();
    const [badges, setBadges] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(
        () =>{
            async function getBadges(username) {
                let res = await BoredApi.getBadges(username);
                setBadges(res.badges)
                setLoading(false)
            }
            getBadges(username)
        }, [username]
    )
    
    return (
        <section className='col-md-8 justify-content-center'>
            <div>
                <h1>{username}</h1>
                {loading ? 'Loading...' : 
                <ul>
                    {badges.map(badge => <li key={badge.badgeId}>{badge.badgeId}</li>)}
                </ul>}
            </div>
        </section>
    )
};

export default BadgePage;