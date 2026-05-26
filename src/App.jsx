import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProductSelect from './pages/ProductSelect';
import Upload from './pages/Upload';
import TryOn from './pages/TryOn';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Workspace Routes */}
              <Route 
                path="/select" 
                element={
                  <ProtectedRoute>
                    <ProductSelect />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tryon" 
                element={
                  <ProtectedRoute>
                    <TryOn />
                  </ProtectedRoute>
                } 
              />

              {/* Analytics Dashboard (Separate Route) */}
              <Route path="/admin" element={<Admin />} />

              {/* Fallback redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
