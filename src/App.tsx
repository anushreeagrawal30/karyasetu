import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Landing } from './pages/Landing';
import { AuthForm } from './components/Auth/AuthForm';
import { CitizenDashboard } from './components/Citizen/CitizenDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4b39ef]"></div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Authentication Routes */}
          <Route 
            path="/auth/citizen" 
            element={
              user ? (
                <Navigate to="/citizen" replace />
              ) : (
                <AuthForm type="citizen" />
              )
            } 
          />
          <Route 
            path="/auth/government" 
            element={
              user ? (
                <Navigate to="/admin" replace />
              ) : (
                <AuthForm type="government" />
              )
            } 
          />

          {/* Citizen Routes */}
          <Route
            path="/citizen"
            element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'field_officer']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;