import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((date) => setUsers(date));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const user={name,email}

    // post data to server

    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUser = [...users,data]
        setUsers(newUser)
        console.log("Success:", data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <h2>User count:{users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            ID:{user.id}, Name:{user.name}, Email:{user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
