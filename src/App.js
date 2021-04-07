import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './services/auth';
import { Header } from './components/header';
import { PrivateRoute } from './components/private-route';
import { LoginPage } from './pages/login';
import { DashboardPage } from './pages/dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <PrivateRoute path="admin/*">
            <DashboardPage />
          </PrivateRoute>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
