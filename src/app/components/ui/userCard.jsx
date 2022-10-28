import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfessions } from "../../hooks/useProfession";

const UserCard = ({ user }) => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const { getProfession } = useProfessions();
    const profession = getProfession(user.profession);
    const handleChange = () => {
        history.push(`/users/${user._id}/edit`);
    };

    return (
        <>
        {profession && (
            <div className="card mb-3">
                <div className="card-body">
                    {currentUser._id === user._id && (
                        <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleChange}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                    )}
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">{profession.name}</p>
                            <div className="text-muted">
                                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                <i className="bi bi-caret-up text-secondary" role="button"></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
