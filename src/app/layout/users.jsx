import React from "react";
import { useParams, Route } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import ProtectedEditRoute from "../components/common/protectedEditRoute";
import { useSelector } from "react-redux";
import { getDataStatus } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    const dataStatus = useSelector(getDataStatus());
    if (!dataStatus) return "Loading...";
    return (
        <UsersLoader>
            <Route path="/users" exact component={UsersListPage} />
            {userId && <Route path="/users/:userId?" exact component={() => <UserPage id={userId} />} />}
            <ProtectedEditRoute path="/users/:userId/edit" exact component={EditUserPage} />
        </UsersLoader>
    );
};

export default Users;
