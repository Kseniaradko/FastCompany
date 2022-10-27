import React from "react";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUsers";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ id }) => {
    const { getUserById } = useUser();
    const user = getUserById(id);

    if (!user) return <>loading...</>;

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user}/>
                    <QualitiesCard qualities={user.qualities}/>
                    <MeetingsCard amountOfMeetings={user.completedMeetings}/>
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
