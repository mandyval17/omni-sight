import { AuthGuard } from '@/components/AuthGuard';
import { AuthProvider } from '@/hooks/auth/authContext';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AuthProvider>
        <IonRouterOutlet>
          {/* Auth routes (guest only) */}
          <Route exact path="/login">
            <AuthGuard guestOnly>
              <LoginPage />
            </AuthGuard>
          </Route>
          <Route exact path="/register">
            <AuthGuard guestOnly>
              <RegisterPage />
            </AuthGuard>
          </Route>

          {/* Figma 2186-665: Ratna AI dashboard */}
          <Route exact path="/dashboard">
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          </Route>

          {/* Protected routes */}
          <Route exact path="/home">
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          </Route>

          {/* Default redirect */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>
      </AuthProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
