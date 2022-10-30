import { useState, useEffect } from "react";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    //cancel request if the component unmounts
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          //cancel the request if we need to
          signal: controller.signal,
        });
        console.log(response.data);
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();

    //cleanup function will run as the component will unmount
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button
        onClick={() => {
          refresh();
        }}
      >Refresh</button>
    </article>
  );
};

export default Users;
