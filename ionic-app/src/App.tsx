import { AuthGuard } from '@/components/AuthGuard';
import { AuthProvider } from '@/hooks/auth/authContext';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { Navigate, Route, Routes } from 'react-router-dom';

const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      {/* Auth routes (guest only) */}
      <Route
        path="/login"
        element={
          <AuthGuard guestOnly>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="/register"
        element={
          <AuthGuard guestOnly>
            <RegisterPage />
          </AuthGuard>
        }
      />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </AuthProvider>
);

export default App;
