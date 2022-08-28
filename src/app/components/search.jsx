import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ onChange }) => {
    return (
        <div className="input-group">
            <input type="text" id="search" name="search" className="form-control" placeholder="Search..." onChange={onChange}/>
        </div>
    );
};

SearchString.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default SearchString;
