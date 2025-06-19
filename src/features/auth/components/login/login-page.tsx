import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { LoginCredentials } from '../../types/auth';
import { Box, Paper, TextField, Button, InputAdornment } from '@mui/material';
import { Text, Icon } from '../../../../common/components';
import styles from './login-page.module.css';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

export function LoginPage() {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [validationError, setValidationError] = useState<string | null>(null);
    const { login, error, clearError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);
        clearError();

        if (!credentials.email || !credentials.password) {
            setValidationError('All fields are required');
            return;
        }

        if (!validateEmail(credentials.email)) {
            setValidationError('Please enter a valid email address');
            return;
        }

        try {
            await login(credentials);
            navigate('/', { replace: true });
        } catch (error) {
            // Error is handled by the auth context
        }
    };

    return (
        <Box className={styles.root}>
            <Paper elevation={6} className={styles.paper}>
                <div className="flex-column">
                    <img src="/src/images/logo.png" alt="Notes Logo" className={styles.logo} />
                    <Text variant="headline-4" className={styles.signInTitle}>
                        Sign in to your account
                    </Text>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon name="envelope" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon name="lock" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {(validationError || error) && (
                        <Text variant="body" className={styles.error}>
                            {validationError || error}
                        </Text>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={styles.button}
                    >
                        Sign in
                    </Button>
                    <Text variant="body" className={styles.registerLink}>
                        <Link to="/register">Don't have an account? Register</Link>
                    </Text>
                    <GoogleLogin onSuccess={async (response) => {
                        try {
                            const idToken = response.credential;
                            if (!idToken) throw new Error('No credential returned from Google');
                            const res = await fetch('/api/auth/google', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ idToken })
                            });
                            const data = await res.json();
                            if (data.data.token) {
                                Cookies.set('token', data.data.token, { expires: 1 }); // 1 day expiry
                                setTimeout(() => {
                                    window.location.href = '/';
                                }, 500);
                            } else {
                                setValidationError(data.message || 'Google login failed');
                            }
                        } catch (err: any) {
                            setValidationError(err.message || 'Google login failed');
                        }
                    }} onError={() => {
                        setValidationError('Google login failed');
                    }} />
                </form>
            </Paper>
        </Box>
    );
} 