import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import { useParams} from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';

const ActivityCard = ({id, updateTotal, updateBadgeTotal, tasks}) =>{
    const {currUser} = useContext(UserContext)
    let {username} = useParams();
    const [toDoList, setToDoList] = useState([])
    const [ids, setIds] = useState([])
    const [text, setText] = useState('')
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(true)
    const [match, setMatch] = useState(false)
    const [display, setDisplay] = useState(true)
    const [badges, setBadges] = useState(currUser.badges)

   
    // Add activity to user's list of things to do
    const add = async (username, id) => {
        await BoredApi.addTask(username, id)
        setToDoList([...toDoList, {taskID: +id, 
                username: currUser.username, 
                completed: false}]);
    };

    // Remove activity from user's list of things to do
    const remove = async (username, id) => {
        await BoredApi.deleteTask(username, id)
        let temp = [...toDoList]
        for (let i = 0; i < toDoList.length; i++) {
            if(toDoList[i].taskID === id) {
                temp.splice(i, 1)
            }
        }
        setToDoList(temp)
        setDisplay(false)
    }

    // Badge checking function
    const checkBadge = async (username) => {
        let currTasks = tasks;
        let badgeIDs = [1, 5, 10, 20, 30, 50, 100, 101, 500, 1000]
        for (let i = 0; i < badgeIDs.length; i++) {
            if (currTasks === badgeIDs[i] - 1) {
                await BoredApi.addBadge(username, badgeIDs[i])
                setBadges([...badges, {badgeId: badgeIDs[i], username: currUser.username}])
                updateBadgeTotal()
            }
        }
    }

    // Mark a task as completed
    const done = async (username, id) => {
        await BoredApi.markComplete(username, id)
        checkBadge(username)
        let temp = [...toDoList]
        for (let i = 0; i < toDoList.length; i++) {
            if(toDoList[i].taskID === id) {
                temp.splice(i, 1)
            }
        }
        setToDoList(temp);
        updateTotal();
        setDisplay(false);
    }

    // Gather data on current user and update loading status
    useEffect(
        () => {
            setToDoList(currUser.activities)
            if (currUser.username === username) {
                setMatch(true)
            };
            setLoading(false);
        }, [username]
    );

    // Get details for each task and create ID list to check tasks on screen against current user's list of tasks
    useEffect(
        () => {
            try{
                let bin = [];
                for (let i = 0; i < toDoList.length; i++) {
                    bin.push(toDoList[i].taskID);
                    setIds(bin);
                };
            } catch {
                setErr(true);
            };

            async function getText(key) {
                try{
                    let res = await axios.get(`https://www.boredapi.com/api/activity?key=${key}`)
                    setText(res.data.activity);
                } catch{
                    setErr(true);
                };
            };

            getText(id);
        }, [toDoList, currUser]
    );

        return(
            <section>
                {display ? 
                    <Card className="card activity-link border-0 mb-2 shadow-sm">
                        {loading ? <p>Loading...</p> : 
                        <CardBody>
                        <CardSubtitle>{err? 'Oops! Something went wrong' : text}</CardSubtitle>
                            {match ? null : 
                                (ids.includes(id) ?  null : 
                                    (<Button onClick={() => add(currUser.username, id)}>Add</Button>)
                                )
                            }
                            {match ? (<Button className="bg-success user-button done" onClick={() => done(currUser.username, id)}>Done</Button>)
                            : null}
                            {match ? (<Button className="bg-danger user-button" onClick={() => remove(currUser.username, id)}>Delete</Button>)
                            : null}
                        </CardBody>
                        }
                    </Card> 
                : null}
                
            </section>
            
	);
};

export default ActivityCard;