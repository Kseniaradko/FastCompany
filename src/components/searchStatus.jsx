import React from "react";

const SearchStatus = ({ length }) => (
    <h2>
        <span 
        className={"badge " + (length === 0? 
        "bg-danger": "bg-primary")}
        >
            {getSearchStatusPhrase(length)}
        </span>
    </h2>
)


const getSearchStatusPhrase = (length) => {
    const phrase = "с тобой сегодня";
    let num = length % 100;
    let value = num % 10;
    if (length === 0) return "Никто с тобой не тусанет!"
    if (num > 11 && num < 15) {
        return length + " человек тусанет " + phrase;
    } 
    if (value > 1 && value < 5) {
        return length + " человека тусанут " + phrase;
    } 
    return length + " человек тусанет " + phrase;
}

export default SearchStatus;