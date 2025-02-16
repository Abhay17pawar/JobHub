import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ClerkMiddleware = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div className="bg-slate-950">

  </div>; 

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ClerkMiddleware;
