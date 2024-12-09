import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css"; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data));
  }, []);

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          <h3>
          <Link to={`/user/${user.id}`} className="link-style">{user.name}
        </Link>
         </h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
