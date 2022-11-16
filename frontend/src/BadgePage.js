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

    const displayMessage = (message) => {
        alert(message)
    }

    useEffect(
        () =>{
            async function getBadges(username) {
                let res = await BoredApi.getBadges(username);
                setBadges(res.badges)
                setLoading(false)
            }
            getBadges(username)
        }, [username, currUser]
    )
    
    return (
        <section className='col-md-12 justify-content-center'>
            <div className="page-container">
                <h1><Link to={`/users/${username}`}>@{username}'s</Link> badges</h1>
                {loading ? 'Loading...' : 
                    <div>
                        {badges.map(badge => 
                            <div onClick={() => displayMessage(badge.message)} className={`shadow badge number${badge.unlockNum}`} key={badge.badgeId}>
                                <span className={`value number${badge.badgeId}`}>
                                    {badge.unlockNum}
                                </span>
                            </div>)}
                    </div>
                }
            </div>
        </section>
    )
};

export default BadgePage;