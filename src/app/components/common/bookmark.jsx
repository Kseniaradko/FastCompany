import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";

const BookMark = ({ bookmark, onBookMark }) => (
    <>
        <div className="bookmark" onClick={onBookMark}>
            <h4>
                <i
                    className={
                        "bi bi-bookmark-star" + (!bookmark ? "" : "-fill")
                    }
                ></i>
            </h4>
        </div>
    </>
);

BookMark.propTypes = {
    bookmark: PropTypes.bool,
    onBookMark: PropTypes.func
};

export default BookMark;
