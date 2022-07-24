import React, { useState } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const userBookMark = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(userBookMark);
    };

    return (
        <div>
            <SearchStatus length={users.length} />

            <Users
                users={users}
                onDelete={handleDelete}
                onBookMark={handleToggleBookMark}
            />
        </div>
    );
}

export default App;
