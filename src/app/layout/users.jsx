import React from "react";
import { useParams, Route } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";
import ProtectedEditRoute from "../components/common/protectedEditRoute";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <UserProvider>
            <Route path="/users" exact component={UsersListPage} />
            {userId && <Route path="/users/:userId?" exact component={() => <UserPage id={userId} />} />}
            <ProtectedEditRoute path="/users/:userId/edit" exact component={EditUserPage} />
        </UserProvider>
    );
};

export default Users;
