import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Initialize userRole state with the value from local storage or null if not found
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('userRole')) || null);

  // Update local storage whenever userRole changes
  useEffect(() => {
    if (userRole !== null) {
      localStorage.setItem('userRole', JSON.stringify(userRole));
    } else {
      // If userRole is null (e.g., after logout), remove it from local storage
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
