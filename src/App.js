import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/layout/login";
import Main from "./app/layout/main";
import NavBar from "./app/components/ui/navbar";
import Users from "./app/layout/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./app/hooks/useProfession";
import { QualitiesProvider } from "./app/hooks/useQualities";
import ProtectedRoute from "./app/components/common/protectedRoute";
import AuthProvider from "./app/hooks/useAuth";
import LogOut from "./app/layout/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Route exact path="/" component={Main} />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <ProtectedRoute path="/users/:userId?" component={Users} />
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
