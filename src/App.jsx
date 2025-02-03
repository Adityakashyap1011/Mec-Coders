import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useAuth } from './hooks/useAuth';
import CodeEditor from './components/CodeEditor';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PasswordResetPage from './pages/PasswordResetPage';
import HomePage from './pages/HomePage';
import JoinRoomPage from './pages/JoinRoomPage';  // Added JoinRoomPage

function App() {
  const user = useAuth();
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  return (
    <Router>
      <Box minH="80vh" bg="#0f0a19" color="gray.100" px={6} py={8}>
        <Routes>
          {!user ? (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />
            </>
          ) : (
            // <>
            //   {!hasJoinedRoom ? (
            //     <Route path="*" element={<Navigate to="/join-room" />} />
            //   ) : (
            //     <Route path="/" element={<HomePage />} />
            //   )}
            //   <Route path="/join-room" element={<JoinRoomPage onJoin={() => setHasJoinedRoom(true)} />} />
            //   <Route path="/profile" element={<ProfilePage />} />
            //   <Route path="*" element={<Navigate to="/" />} />
            // </>
             <>
             
               <Route path="/" element={<HomePage />} />
             <Route path="/join-room" element={<JoinRoomPage onJoin={() => setHasJoinedRoom(true)} />} />
             <Route path="/profile" element={<ProfilePage />} />
             <Route path="*" element={<Navigate to="/" />} />
           </>
          )}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
