import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessonsLoadingStatus, getProfessionById } from "../../store/professions";

const Profession = ({ id }) => {
    const professionLoading = useSelector(getProfessonsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    if (!professionLoading && prof) return <p>{prof.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
