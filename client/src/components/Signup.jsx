import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111' }}>
      <SignUp signInUrl="/sign-in" 
              style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#111' }}
/>
    </div>
  );
};

export default SignUpPage;
