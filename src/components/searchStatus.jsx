import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => (
    <h2>
        <span
            className={"badge " + (length === 0 ? "bg-danger" : "bg-primary")}
        >
            {getSearchStatusPhrase(length)}
        </span>
    </h2>
);

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

const getSearchStatusPhrase = (length) => {
    const phrase = "с тобой сегодня";
    const num = length % 100;
    const value = num % 10;
    if (length === 0) return "Никто с тобой не тусанет!";
    if (num > 11 && num < 15) {
        return length + " человек тусанет " + phrase;
    }
    if (value > 1 && value < 5) {
        return length + " человека тусанут " + phrase;
    }
    return length + " человек тусанет " + phrase;
};

export default SearchStatus;
