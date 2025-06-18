import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { RegisterCredentials } from '../../types/auth';
import { Box, Paper, TextField, Button, InputAdornment } from '@mui/material';
import { Text, Icon } from '../../../../common/components';
import styles from './register-page.module.css';

export function RegisterPage() {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validationError, setValidationError] = useState<string | null>(null);
    const { register, error, clearError } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);
        clearError();

        if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
            setValidationError('All fields are required');
            return;
        }

        if (!validateEmail(credentials.email)) {
            setValidationError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(credentials.password)) {
            setValidationError('Password must be at least 6 characters');
            return;
        }

        if (credentials.password !== credentials.confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        try {
            await register(credentials);
            navigate('/', { replace: true });
        } catch (error) {
            // Error is handled by the auth context
        }
    };

    return (
        <Box className={styles.root}>
            <Paper elevation={6} className={styles.paper}>
                <Text variant="headline-4" className={styles.registerTitle}>
                    Create your account
                </Text>
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
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={credentials.confirmPassword}
                        onChange={e => setCredentials({ ...credentials, confirmPassword: e.target.value })}
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
                        Register
                    </Button>
                    <Text variant="body" className={styles.loginLink}>
                        <Link to="/login">Already have an account? Sign in</Link>
                    </Text>
                </form>
            </Paper>
        </Box>
    );
} 