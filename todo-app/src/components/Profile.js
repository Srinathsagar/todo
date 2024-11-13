import React, { useState } from "react";
import { fetchData } from "../services/api";

const Profile = ({ user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { name, email, password };
      const data = await fetchData(
        "/users/profile",
        "PUT",
        updatedData,
        localStorage.getItem("token")
      );

      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password (leave empty to keep current)"
        />
        <button type="submit">Update Profile</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default Profile;
