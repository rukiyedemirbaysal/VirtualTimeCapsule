import React, { useState } from 'react';
import { login as apiLogin } from './api';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Login = ({ onRegisterClick }) => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    if (redirectToDashboard) {
        return <Navigate to='/dashboard' replace />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!credentials.username || !credentials.password) {
            setError('Username and password are required.');
            return;
        }

        try {
            setLoading(true);
            const response = await apiLogin(credentials);
            console.log('User logged in:', response);
            localStorage.setItem('jwt_token', response.jwt_token);

            if (response) {
                login();
                setRedirectToDashboard(true);
            } else {
                setError('Login failed. Please try again.');
            }

        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="row">
                <h3>Login</h3>

                        <form onSubmit={handleLogin}>
                            <label htmlFor="InputUsername" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="InputUsername"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={credentials.password}
                                    id="InputPassword"
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                        <button className="btn btn-secondary mx-3" onClick={onRegisterClick}>Register</button>
                        </form>
                    
                </div>

            </div>
        </div>
    );
};

export default Login;
