import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shirt, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';

const Login = () => {
  const { user, loginWithGoogle, error: authError, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  // Redirect to selection page if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/select';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Login failed in screen:", err);
      setError(err.message || 'Google Authentication failed. Please try again.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-16 relative">
      {/* Glow bubble */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full glass-premium p-8 rounded-3xl border border-slate-900 shadow-2xl relative z-10 space-y-8">
        {/* Logo Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <span className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Shirt className="h-6 w-6 text-white" />
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">Access fitting room</h2>
          <p className="text-sm text-slate-400">
            Sign in with your Google account to select styles, upload photos, and start your virtual try-on.
          </p>
        </div>

        {/* Feedback Messages */}
        {(error || authError) && (
          <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-left">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Authentication issue</p>
              <p className="mt-0.5 leading-relaxed">{error || authError}</p>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 px-5 border border-slate-800 rounded-2xl bg-slate-900/60 hover:bg-slate-900 font-semibold text-slate-200 hover:text-white transition-all duration-300 hover:border-slate-700 active:scale-98 shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              <span>Connecting Google Accounts...</span>
            </>
          ) : (
            <>
              {/* Google G Logo SVG */}
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Terms Footer */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>We do not store passwords. Authentication is powered by Google Identity services.</p>
          <div className="flex justify-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
              <Sparkles className="h-3 w-3 text-purple-400" />
              Secure Gmail Sign-In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
