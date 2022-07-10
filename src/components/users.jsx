import React, { useState } from 'react';
import api from '../api'
import { fetchAll } from '../api/fake.api/user.api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (id) => {
        setUsers(users => users.filter((user) => user._id !== id))
    };

    const renderPhrase = (number) => {
        const phrase = "тусанет с тобой сегодня";
        
        let num = number % 100;
        let value = num % 10;

        if (number === 0) return "Никто с тобой не тусанет!" 
        if (num > 11 && num < 15) return number + " человек " + phrase;
        return value > 1 && value < 5? number + " человека " + phrase: number + " человек " + phrase;
    };

    const classesQualities = "badge m-1 bg-";
    console.log(classesOfPhrases)

    const renderTable = () => {
        if (users.length !== 0) return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        (
                            <tr key = {user._id}>
                                <th scope="row">{user.name}</th>
                                <td>{user.qualities.map((quality) => <span key={quality._id} className= {classesQualities + quality.color}>
                                    {quality.name}</span>)}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}/5</td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        )
    }

    
    let classesOfPhrases = "badge ";
    classesOfPhrases += users.length === 0? "bg-danger": "bg-primary";

    return (
        <>
            <h2>
                <span className={classesOfPhrases}>{renderPhrase(users.length)}</span>
            </h2>
            {renderTable()}
        </>
    )
}

export default Users;