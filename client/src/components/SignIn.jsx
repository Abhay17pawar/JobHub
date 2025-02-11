import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111' }}>
      <SignIn
        path="/sign-in"
        routing="path"
        signInFallbackRedirectUrl="/"
        signUpUrl="/sign-up"
        style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#111' }}
      />
    </div>
  );
};

export default SignInPage;
