import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Set up axios interceptor for token
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Add response interceptor for handling token expiration
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    const login = async (credentials: LoginCredentials) => {
        try {
            setError(null);
            const response = await axios.post<AuthResponse>('/api/auth/login', credentials);
            const { user, token } = response.data.data;
            
            // Store token in cookie
            Cookies.set('token', token, { expires: 1 }); // 1 day expiry
            
            setUser(user);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed');
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            setError(null);
            const response = await axios.post<AuthResponse>('/api/auth/register', {
                email: credentials.email,
                password: credentials.password
            });
            const { user, token } = response.data.data;
            
            // Store token in cookie
            Cookies.set('token', token, { expires: 1 }); // 1 day expiry
            
            setUser(user);
            navigate('/');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Registration failed');
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        navigate('/login');
    };

    const clearError = () => setError(null);

    // Check for existing token on mount
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            // Verify token by making a request
            axios.get('/auth/verify')
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 