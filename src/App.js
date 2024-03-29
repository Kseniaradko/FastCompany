import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/layout/login";
import Main from "./app/layout/main";
import NavBar from "./app/components/ui/navbar";
import Users from "./app/layout/users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./app/components/common/protectedRoute";
import LogOut from "./app/layout/logOut";
import AppLoader from "./app/components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Route exact path="/" component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={LogOut} />
                <ProtectedRoute path="/users/:userId?" component={Users} />
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
