import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, hasFirebaseConfig } from '../services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Synchronize authentication state
  useEffect(() => {
    if (hasFirebaseConfig && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${firebaseUser.email}`,
            provider: 'firebase'
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // LocalStorage persistence for simulation mode
      const savedUser = localStorage.getItem('grwify_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = () => {
    setLoading(true);
    setError(null);

    if (hasFirebaseConfig && auth && googleProvider) {
      return signInWithPopup(auth, googleProvider)
        .then((result) => {
          const u = result.user;
          const profile = {
            uid: u.uid,
            displayName: u.displayName,
            email: u.email,
            photoURL: u.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.email}`,
            provider: 'firebase'
          };
          setUser(profile);
          return profile;
        })
        .catch((err) => {
          console.error("Firebase Login Error: ", err);
          setError(err.message);
          setLoading(false);
          throw err;
        });
    } else {
      // Interactive Google OAuth Simulator
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 620;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
          '',
          'Google Accounts Login',
          `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );

        if (!popup) {
          setError("Popup blocked. Please allow popups for Google Sign-In.");
          setLoading(false);
          reject(new Error("Popup blocked"));
          return;
        }

        // Dynamically inject Google Sign-In interface into popup
        const popupHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Sign in - Google Accounts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Roboto', sans-serif; }
            </style>
          </head>
          <body class="bg-slate-50 flex flex-col min-h-screen justify-between p-6">
            <div class="max-w-md w-full mx-auto mt-6 bg-white p-8 border border-slate-200 rounded-lg shadow-sm">
              <!-- Google Logo -->
              <div class="flex justify-center mb-6">
                <svg class="h-8" viewBox="0 0 24 24" width="120" height="30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              <h2 class="text-2xl font-normal text-center text-slate-800 mb-1">Sign in</h2>
              <p class="text-sm text-center text-slate-600 mb-8">to continue to <span class="font-medium text-purple-600">grwify</span></p>

              <!-- Account List Selection -->
              <div class="space-y-3 mb-6">
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Choose an account</p>
                
                <button onclick="selectAccount('Alex Carter', 'alex.carter@gmail.com', 'alex')" class="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=alex" class="w-10 h-10 rounded-full bg-purple-100 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-slate-800">Alex Carter</p>
                    <p class="text-xs text-slate-500">alex.carter@gmail.com</p>
                  </div>
                </button>

                <button onclick="selectAccount('Sophia Chen', 'sophia.chen@gmail.com', 'sophia')" class="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=sophia" class="w-10 h-10 rounded-full bg-purple-100 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-slate-800">Sophia Chen</p>
                    <p class="text-xs text-slate-500">sophia.chen@gmail.com</p>
                  </div>
                </button>

                <button onclick="selectAccount('Marcus Johnson', 'marcus.j@gmail.com', 'marcus')" class="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=marcus" class="w-10 h-10 rounded-full bg-purple-100 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-slate-800">Marcus Johnson</p>
                    <p class="text-xs text-slate-500">marcus.j@gmail.com</p>
                  </div>
                </button>
              </div>

              <!-- Custom Form Input Option -->
              <div class="border-t border-slate-200 pt-6">
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Or sign in with another account</p>
                <form id="customForm" onsubmit="handleCustomSubmit(event)">
                  <div class="mb-3">
                    <label class="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                    <input type="text" id="customName" required placeholder="e.g. Emily Davis" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
                  </div>
                  <div class="mb-4">
                    <label class="block text-xs font-medium text-slate-600 mb-1">Gmail Address</label>
                    <input type="email" id="customEmail" required placeholder="e.g. emily.davis@gmail.com" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
                  </div>
                  <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    Sign in and Proceed
                  </button>
                </form>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center text-xs text-slate-400 max-w-md w-full mx-auto mt-4">
              <span>English (United States)</span>
              <div class="space-x-3">
                <a href="#" class="hover:underline">Help</a>
                <a href="#" class="hover:underline">Privacy</a>
                <a href="#" class="hover:underline">Terms</a>
              </div>
            </div>

            <script>
              function selectAccount(name, email, seed) {
                const user = {
                  uid: 'mock-' + Math.random().toString(36).substr(2, 9),
                  displayName: name,
                  email: email,
                  photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + seed,
                  provider: 'mock-google'
                };
                window.opener.postMessage({ type: 'MOCK_GOOGLE_SIGN_IN_SUCCESS', user }, '*');
                window.close();
              }

              function handleCustomSubmit(e) {
                e.preventDefault();
                const name = document.getElementById('customName').value;
                const email = document.getElementById('customEmail').value;
                const seed = name.toLowerCase().replace(/[^a-z]/g, '') || 'avatar';
                selectAccount(name, email, seed);
              }
            </script>
          </body>
          </html>
        `;

        popup.document.write(popupHtml);
        popup.document.close();

        // Listen for communication from popup window
        const messageListener = (event) => {
          if (event.data && event.data.type === 'MOCK_GOOGLE_SIGN_IN_SUCCESS') {
            const u = event.data.user;
            setUser(u);
            localStorage.setItem('grwify_user', JSON.stringify(u));
            setLoading(false);
            window.removeEventListener('message', messageListener);
            resolve(u);
          }
        };

        window.addEventListener('message', messageListener);

        // Check if popup was closed without action
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            setLoading(false);
            // Wait slightly in case user logged in right before closing
            setTimeout(() => {
              window.removeEventListener('message', messageListener);
            }, 1000);
          }
        }, 500);
      });
    }
  };

  const logout = () => {
    setLoading(true);
    if (hasFirebaseConfig && auth) {
      return signOut(auth)
        .then(() => {
          setUser(null);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Firebase Signout Error: ", err);
          setLoading(false);
        });
    } else {
      setUser(null);
      localStorage.removeItem('grwify_user');
      setLoading(false);
      return Promise.resolve();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
