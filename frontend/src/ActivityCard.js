import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import BoredApi from './Api';
import UserContext from './UserContext';

const ActivityCard = ({id}) =>{
    const {currUser} = useContext(UserContext)
    const [toDoList, setToDoList] = useState([])
    const [ids, setIds] = useState([])
    const [text, setText] = useState('')
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(true)

   

    const add = async (username, id) => {
        await BoredApi.addTask(username, id)
        setToDoList([...toDoList, {taskID: +id, 
                username: currUser.username, 
                completed: false}]);
    };

    // Gather data on current user and update loading status
    useEffect(
        () => {
            setToDoList(currUser.activities)
            setLoading(false)
        }, [currUser]
    );

    // Get details for each task and create ID list to check tasks on screen against current user's list of tasks
    useEffect(
        () => {
            try{
                let bin = [];
                for (let i = 0; i < toDoList.length; i++) {
                    bin.push(toDoList[i].taskID)
                    setIds(bin)
                };
            } catch {
                setErr(true)
            }

            async function getText(key) {
                try{
                    let res = await axios.get(`https://www.boredapi.com/api/activity?key=${key}`)
                    setText(res.data.activity)
                } catch{
                    setErr(true)
                }
            }

            getText(id);
        }, [toDoList, currUser]
    );

        return(
            <Card className="card activity-link">
                {loading ? <p>Loading...</p> : 
                <CardBody>
                <CardSubtitle>{err? 'Oops! Something went wrong' : text}</CardSubtitle>
                    {ids.includes(id) ? (
                        <Button>Added</Button>
                    ) : (
                        <Button onClick={() => add(currUser.username, id)}>Add</Button>
                    )}
                </CardBody>
                }
            </Card> 
	);
};

export default ActivityCard;