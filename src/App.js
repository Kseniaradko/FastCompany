import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/layots/login";
import Main from "./app/layots/main";
import NavBar from "./app/components/navbar";
import Users from "./app/layots/users";

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
