import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import {  LandingPage } from './components/Design';
import JobDashboard from './components/Dashboard';
import SignUpPage from './components/Signup';
import SignInPage from './components/SignIn';
import Loader from './components/BookLoader';
import Spinner from './components/Loader2';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<JobDashboard />} /> 
        <Route path="/abhay" element={<Spinner />} /> 

      </Routes>
    </>
  );
};

export default App;
