import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp path="/sign-up" routing="Jobs-Dashboard" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
