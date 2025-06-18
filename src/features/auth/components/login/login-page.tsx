import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { LoginCredentials } from '../../types/auth';
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Text } from '../../../../common/components';
import styles from './login-page.module.css';
import {getClasses} from "../../../../utils/class-utils";

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
                <Text variant="headline-4" className={styles.signInTitle}>
                    Sign in to your account
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
                                    <EmailIcon />
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
                                    <LockIcon />
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
                </form>
            </Paper>
        </Box>
    );
} 