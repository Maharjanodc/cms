import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.username === username)) {
      alert("Username already exists!");
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
