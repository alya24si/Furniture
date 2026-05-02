import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Loading from './components/Loading';

// Lazy load pages
const Home = React.lazy(() => import('./pages/main/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Dashboard = React.lazy(() => import('./pages/main/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Home Route */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />

          {/* Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard Route */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
