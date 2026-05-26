import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative w-20 h-20">
          {/* Animated Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-950 border-t-purple-500 animate-spin"></div>
          {/* Internal Glowing Dot */}
          <div className="absolute inset-5 bg-purple-500/10 rounded-full blur-md"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-purple-400 tracking-wider animate-pulse">VERIFYING SESSION...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
