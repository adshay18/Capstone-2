import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';
import './BadgePage.css'


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
        <section className='col-md-12 justify-content-center'>
            <div className="page-container">
                <h1>@{username}'s badges</h1>
                {loading ? 'Loading...' : 
                    <div>
                        {badges.map(badge => 
                            <div className={`shadow badge number${badge.badgeId}`}>
                                <span className={`number${badge.badgeId}`} key={badge.badgeId}>
                                    {badge.badgeId}
                                </span>
                            </div>)}
                    </div>
                }
            </div>
        </section>
    )
};

export default BadgePage;