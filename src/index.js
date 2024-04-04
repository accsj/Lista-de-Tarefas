import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth/Auth';
import HomePage from './pages/Home/Home';
import App from './App';
import RegisterPage from './pages/Register/Register';
import RecoveryPage from './pages/Recovery/Recovery';
import { ToastContainer } from 'react-toastify';
import useCheckAuthentication from './api/Authenticator';
import PassRecoveryPage from './pages/PassRecovery/PassRecovery';



const AppRouter = () => {

    const isAutenticado = useCheckAuthentication();
    console.log('Estado de autenticação:', isAutenticado);
    
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path='login' element={isAutenticado ? <Navigate to='/'/> : <AuthPage/>} />
                <Route path='register' element={isAutenticado ? <Navigate to='/'/> : <RegisterPage />} />
                <Route path='recovery' element={isAutenticado ? <Navigate to='/'/> : <RecoveryPage/>} />
                <Route path='passrecovery/:token' element={isAutenticado ? <Navigate to=''/> : <PassRecoveryPage/>} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppRouter />
);

