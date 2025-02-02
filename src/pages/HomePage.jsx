import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming you have this hook for authentication state
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import CodeEditor from '../components/CodeEditor';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/SideBar';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(18); // Sidebar width in rem
  const user = useAuth();

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleResize = (e) => {
    const newWidth = Math.min(18, Math.max(0, (e.clientX / window.innerWidth) * 30)); // Restrict width between 0rem and 18rem
    setSidebarWidth(newWidth);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
        <Link to="/" className="flex items-center space-x-2">
          <img src="public/Screenshot_2025-02-02_110454-removebg-preview.png" alt="Logo" className="w-40 h-10 rounded-full" />
        </Link>
        {/* Right-side navigation items */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 text-sm font-medium"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm font-medium"
            >
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md focus:outline-none bg-gray-300 dark:bg-gray-700"
          >
            {isDarkMode ? (
              <img src="/public/light-mode-svgrepo-com.svg" alt="Light Mode" className="w-6" />
            ) : (
              <img src="/public/dark-mode-night-moon-svgrepo-com.svg" alt="Dark Mode" className="w-6" />
            )}
          </button>
        </div>
      </nav>

      <main className="flex flex-grow">
        {/* Resizable Sidebar */}
        <div 
          className="bg-gray-800 text-white h-screen overflow-hidden relative"
          style={{ width: `${sidebarWidth}rem` }}
        >
          <Sidebar />
          <div 
            className="absolute top-0 right-0 h-full w-2 bg-gray-600 cursor-ew-resize" 
            onMouseDown={(e) => {
              e.preventDefault();
              window.addEventListener('mousemove', handleResize);
              window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', handleResize);
              }, { once: true });
            }}
          ></div>
        </div>

        {/* Code Editor Section */}
        <div className="p-4" style={{ width: `calc(100% - ${sidebarWidth}rem)` }}>
          <CodeEditor />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
