import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { AuroraHero } from './components/Design';
import JobDashboard from './components/Dashboard';
import SignUpPage from './components/Signup';
import SignInPage from './components/SignIn';
import ProfileCardBtn from './components/ProfileCard';
import HamsterWheel from './components/HamsterWheel.jsx';

const App = () => {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton /> {/* Show when the user is signed out */}
        </SignedOut>

        <SignedIn>
          <UserButton /> {/* Show when the user is signed in */}
        </SignedIn>
      </header>

      <Routes>
        <Route path="/" element={<AuroraHero />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/test" element={<HamsterWheel />} />
        <Route path="/Jobs-Dashboard" element={<JobDashboard />} /> {/* Job Dashboard Route */}
      </Routes>
    </>
  );
};

export default App;
