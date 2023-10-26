import { useState,useEffect } from 'react';
import Receipt from '@/pages/Receipt';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Service from '@/pages/Service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { useUser } from '@/context/UserContext';
export default function App() {
  const { userRole } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load isLoggedIn state from localStorage on component mount
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Save isLoggedIn state to localStorage on successful login
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove isLoggedIn state from localStorage on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
  };

  const  WelcomeMessage = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let welcomeMessage = '';
  
    if (currentHour >= 5 && currentHour < 12) {
      welcomeMessage = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      welcomeMessage = 'Good afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
      welcomeMessage = 'Good evening';
    } else {
      welcomeMessage = 'Good night';
    }
      return welcomeMessage
  }

  return (
    <>
       {isLoggedIn ? (
      <>
            <div className='container mx-auto mt-7 shadow-xl p-8 rounded-md'>
              <div className='flex justify-between mb-8'>
                <h2 className="text-xl">{WelcomeMessage()}, {userRole.username}</h2>
                <Logout onLogout={handleLogout} />
              </div>
              <Tabs defaultValue='receipt'>
                <TabsList>
                  <TabsTrigger value='services'>Services</TabsTrigger>
                  <TabsTrigger value='receipt'>Receipt</TabsTrigger>
                </TabsList>
                <TabsContent value='receipt'>
                  <Receipt />
                </TabsContent>
                <TabsContent value='services'>
                  <Service />
                </TabsContent>
              </Tabs>
            </div>
      </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <ToastContainer position='top-right' />
    </>
  );
}
