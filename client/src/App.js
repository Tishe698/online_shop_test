import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './header/header';
import Content from './content/content';
import Footer from './footer/footer';
import './css/index.css';
import Register from './registrations/Register'; // Страница регистрации
import Login from './registrations/Login'; // Страница входа

const Container = () => {
    return (
        <div className="Container">
            <Header />
            <Content />
            <Footer />
        </div>
    );
};

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Проверяем авторизацию

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Container /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
