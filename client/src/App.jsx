import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClerkMiddleware from "./ClerkMiddleware";
import {  LandingPage } from './components/Design';
import JobDashboard from './components/Dashboard';
import SignUpPage from './components/Signup';
import SignInPage from './components/SignIn';
import PreviewGradient from './PaymentGateway';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/"  element={<ClerkMiddleware><JobDashboard/></ClerkMiddleware>}/>   
        <Route path="/payment" element={<PreviewGradient />}/>
      </Routes>
    </>
  );
};

export default App;
