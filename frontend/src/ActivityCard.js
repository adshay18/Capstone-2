import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import { useParams } from 'react-router-dom';
import BoredApi from './Api';
import UserContext from './UserContext';

const ActivityCard = ({id, updateTotal}) =>{
    const {currUser} = useContext(UserContext)
    let {username} = useParams();
    const [toDoList, setToDoList] = useState([])
    const [ids, setIds] = useState([])
    const [text, setText] = useState('')
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(true)
    const [match, setMatch] = useState(false)
    const [display, setDisplay] = useState(true)

   
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

    // Mark a task as completed
    const done = async (username, id) => {
        await BoredApi.markComplete(username, id)
        let temp = [...toDoList]
        for (let i = 0; i < toDoList.length; i++) {
            if(toDoList[i].taskID === id) {
                temp.splice(i, 1)
            }
        }
        setToDoList(temp)
        updateTotal()
        setDisplay(false)
    }

    // Gather data on current user and update loading status
    useEffect(
        () => {
            setToDoList(currUser.activities)
            setLoading(false)
            if (currUser.username === username) {
                setMatch(true)
            }
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
            <section>
                {display ? 
                    <Card className="card activity-link">
                        {loading ? <p>Loading...</p> : 
                        <CardBody>
                        <CardSubtitle>{err? 'Oops! Something went wrong' : text}</CardSubtitle>
                            {ids.includes(id) ? null : (
                                <Button onClick={() => add(currUser.username, id)}>Add</Button>
                            )}
                            {match ? (<Button onClick={() => done(currUser.username, id)}>Done</Button>)
                            : null}
                            {match ? (<Button onClick={() => remove(currUser.username, id)}>Delete</Button>)
                            : null}
                        </CardBody>
                        }
                    </Card> 
                : null}
                
            </section>
            
	);
};

export default ActivityCard;