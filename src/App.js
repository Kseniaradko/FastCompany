import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onBookMark={handleToggleBookMark}
                />
            )}
        </div>
    );
}

export default App;
