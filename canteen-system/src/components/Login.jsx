import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedInUser(user);
      alert("Login successful!");
      navigate(user.role === "admin" ? "/admin" : "/menu");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button className="secondary" onClick={() => navigate("/signup")}>Go to Signup</button>
    </div>
  );
}

export default Login;
