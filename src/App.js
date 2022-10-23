import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/layout/login";
import Main from "./app/layout/main";
import NavBar from "./app/components/ui/navbar";
import Users from "./app/layout/users";
import EditUserPage from "./app/components/page/editUserPage/editUserPage";
import UserProvider from "./app/hooks/useUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./app/hooks/useProfession";
import { QualitiesProvider } from "./app/hooks/useQualities";

function App() {
    return (
        <div>
            <NavBar />
            <Route exact path="/" component={Main} />
            <QualitiesProvider>
                <ProfessionProvider>
                    <Route path="/login/:type?" component={Login} />
                    <UserProvider>
                        <Route path="/users/:userId?" exact component={Users} />
                        <Route path="/users/:userId/edit" component={EditUserPage} />
                    </UserProvider>
                </ProfessionProvider>
            </QualitiesProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
