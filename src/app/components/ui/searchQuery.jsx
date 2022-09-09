import React from "react";
import PropTypes from "prop-types";

const SearchQuery = ({ onChange, value }) => {
    return (
        <div className="input-group">
            <input type="text" id="search" value={value} name="search" className="form-control" placeholder="Search..." onChange={onChange}/>
        </div>
    );
};

SearchQuery.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default SearchQuery;
