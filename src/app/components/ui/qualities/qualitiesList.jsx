import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    const qualitiesArray = qualities.map((qual) => getQuality(qual));
    console.log(qualitiesArray);
    if (!isLoading) {
        return (
            <>
                {qualitiesArray.map((qualitie) => (
                    <Qualitie key={qualitie._id} {...qualitie} />
                ))}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
