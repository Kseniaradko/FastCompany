import React, { useState } from 'react';
import api from '../api'


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id))
    };

    const renderPhrase = (number) => {
        const phrase = "с тобой сегодня";
        
        let num = number % 100;
        let value = num % 10;

        if (number === 0) return "Никто с тобой не тусанет!" 
        if (num > 11 && num < 15) return number + " человек тусанет " + phrase;
        return value > 1 && value < 5? number + " человека тусанут " + phrase: number + " человек тусанет " + phrase;
    };

    const renderQualitiesForTable = (user) => {
        return user.qualities.map((quality) => 
            <span key={quality._id} className= {"badge m-1 bg-" + quality.color}>
                {quality.name}
            </span>
        )
    }

    const renderTable = () => {
        if (users.length !== 0) return (
            <table className = "table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        (
                            <tr key = {user._id}>
                                <th scope="row">{user.name}</th>
                                <td>{renderQualitiesForTable(user)}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}/5</td>
                                <td>
                                    <button
                                        className='btn btn-danger' 
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <h2>
                <span className={"badge " + (users.length === 0? "bg-danger": "bg-primary")}>{renderPhrase(users.length)}</span>
            </h2>
            {renderTable()}
        </>
    )
}

export default Users;