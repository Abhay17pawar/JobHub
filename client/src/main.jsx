import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import store from '../redux/Store.jsx'; 
import App from './App.jsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
    <BrowserRouter>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl="/"  
        signUpFallbackRedirectUrl="/"
        afterSignOutUrl="/landing-page"
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </Provider>
);
