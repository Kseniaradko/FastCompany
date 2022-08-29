import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import NavBar from "./components/navbar";
import Users from "./components/users";

function App() {
    return (
        <div>
            <NavBar />
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?" component={Users} />
        </div>
    );
}

export default App;
