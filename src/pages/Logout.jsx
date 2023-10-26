// src/Logout.js
import React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

function Logout({ onLogout }) {
  const handleLogout = () => {
    axios
      .post(`${import.meta.env.VITE_HOST}/logout`)
      .then((response) => {
        if (response.status === 200) {
          onLogout();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Logout;
