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
    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('authToken'));

    React.useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('authToken'));
        };

        // Прослушиваем событие добавления токена
        window.addEventListener('storage', handleStorageChange);
        // Дополнительно проверяем состояние после рендера
        setIsAuthenticated(!!localStorage.getItem('authToken'));

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/home"
                    element={isAuthenticated ? <Container /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
};
export default App;
