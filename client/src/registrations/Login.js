import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Используем Link из react-router-dom
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Grid,
    Box,
    Container,
    LockOutlinedIcon,
} from './ui';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token); // Сохранение токена
                window.dispatchEvent(new Event('storage')); // Уведомляем об изменении
                console.log('Токен сохранён:', data.token);
                navigate('/home', { replace: true }); // Перенаправление на главную
            } else {
                setError(data.error || 'Ошибка входа');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setError('Произошла ошибка на сервере.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    sx={{
                        margin: 1,
                        backgroundColor: 'secondary.main',
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                {error && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ marginTop: 1, textAlign: 'center' }}
                    >
                        {error}
                    </Typography>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        width: '100%',
                        marginTop: 1,
                    }}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email"
                        name="username"
                        autoComplete="username"
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Войти
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/register" variant="body2">
                                Нет аккаунта ?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
