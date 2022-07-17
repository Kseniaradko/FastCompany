import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, onDelete, onBookMark}) => {

    return (
        <tr key = {user._id}>
            <th scope="row">{user.name}</th>
            <td>{user.qualities.map((qualitie) => <Qualitie key={qualitie._id} qualitie={qualitie} />)}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>{<BookMark bookmark={user.bookmark} onClick={() => onBookMark(user._id)}/>}</td>
            <td>
                <button
                    className='btn btn-danger' 
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
};

export default User;

