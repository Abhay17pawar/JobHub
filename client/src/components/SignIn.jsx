import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div>
      <h2>Sign In</h2>
      <SignIn
        path="/sign-in"
        routing="path"  // `routing="path"` is the correct value for routing prop
        signInFallbackRedirectUrl="/Jobs-Dashboard"  // Redirect to /Jobs-Dashboard after sign-in
        signUpUrl="/sign-up"  // Link to sign-up page
      />
    </div>
  );
};

export default SignInPage;
