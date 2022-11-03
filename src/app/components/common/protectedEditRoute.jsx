import React from "react";
import { Redirect, Route, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

const ProtectedEditRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    const { userId } = useParams();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (currentUser._id !== userId) {
                    return <Redirect to={`/users/${currentUser._id}/edit`}
                    />;
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedEditRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProtectedEditRoute;
