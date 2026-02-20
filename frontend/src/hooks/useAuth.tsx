'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session token
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                // Ensure token isn't expired
                if (decoded.exp * 1000 > Date.now()) {
                    // In a real app we might fetch full user profile here
                    setUser({
                        id: decoded.user_id,
                        username: 'User', // Requires backend to encode these in JWT or a /me endpoint
                        email: '',
                        first_name: '',
                        last_name: ''
                    });
                } else {
                    localStorage.removeItem('access_token');
                }
            } catch (e) {
                localStorage.removeItem('access_token');
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        const decoded: any = jwtDecode(token);
        setUser({
            id: decoded.user_id,
            username: 'User',
            email: '',
            first_name: '',
            last_name: ''
        });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
