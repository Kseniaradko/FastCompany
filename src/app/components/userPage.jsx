import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.push("/users");
    };

    if (!user) return <>loading...</>;

    return (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <h5>completedMeetings: {user.completedMeetings}</h5>
            <h5>Rate: {user.rate}</h5>
            <button
                onClick={() => {
                    handleClick();
                }}
            >
                Все пользователи
            </button>
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
