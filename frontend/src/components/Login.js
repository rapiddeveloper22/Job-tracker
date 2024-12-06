import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../apiConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.LOGIN}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.message === "Login successful") {
                localStorage.setItem('authToken', data.token); // Save token on login
                localStorage.setItem('userEmail', email); // Save email on login
                navigate('/dashboard'); // Redirect to Dashboard
            } else {
                alert(data.message || 'Login failed!');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('An error occurred during login.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')} className="link-button">
                    Signup
                </button>
            </p>
        </div>
    );
};

export default Login;
