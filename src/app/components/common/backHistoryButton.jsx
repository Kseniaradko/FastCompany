import React from "react";
import { useHistory } from "react-router-dom";

const BackHistoryButton = () => {
    const history = useHistory();
    const handleChange = () => {
        history.goBack();
    };
    return (
        <button
            className="btn btn-primary"
            onClick={handleChange}
        >
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackHistoryButton;
