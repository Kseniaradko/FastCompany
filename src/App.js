import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/layout/login";
import Main from "./app/layout/main";
import NavBar from "./app/components/ui/navbar";
import Users from "./app/layout/users";

function App() {
    return (
        <div>
            <NavBar />
            <Route exact path="/" component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?" component={Users} />
        </div>
    );
}

export default App;
