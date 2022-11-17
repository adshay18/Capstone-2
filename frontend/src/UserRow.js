import React from 'react';
import {Link} from 'react-router-dom';
import './UserRow.css'


const UserRow = ({username, tasks, avatar}) => {
    return (
        <tr>
            <td>
                {tasks}
            </td>
            <td className='text-align-right'>
                <img className="avatar-img" alt="User Avatar" src={avatar ? avatar : "https://i.imgur.com/wvxPV9S.png"}></img>
                <span><Link to={`/users/${username}`}>{`@${username}`}</Link></span>
            </td>
        </tr>
    )
}

export default UserRow;