import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { AuroraHero } from './components/Design';
import JobDashboard from './components/Dashboard';
import SignUpPage from './components/Signup';
import SignInPage from './components/SignIn';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/landing-page" element={<AuroraHero />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<JobDashboard />} /> 
      </Routes>
    </>
  );
};

export default App;
