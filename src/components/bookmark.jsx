import React from "react";
import "bootstrap/dist/css/bootstrap.css"

const BookMark = ({ bookmark, onClick }) => (
    <>
        <div className="bookmark" onClick={onClick}>
            <h4>
            <i className={"bi bi-bookmark-star" + (!bookmark ? "": "-fill")}></i>
        </h4></div>
    </>
)


export default BookMark