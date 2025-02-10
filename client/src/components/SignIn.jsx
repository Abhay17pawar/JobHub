import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div>
      <SignIn
        path="/sign-in"
        routing="path"  
        signInFallbackRedirectUrl="/"  
        signUpUrl="/sign-up"  
      />
    </div>
  );
};

export default SignInPage;
