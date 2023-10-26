// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUserRole } = useUser();


  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_HOST}/login`, { username, password })
      .then((response) => {
        if (response.data.success) {
            setUserRole(response.data.user)
          onLogin();
        } else {
          alert('Login failed');
        }
      })
      .catch((error) => {
        alert('Login failed');
      });
  };

  return (
    <div className="bg-pink-100 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
      >
        Login
      </button>
    </div>
  </div>
  );
}

export default Login;
