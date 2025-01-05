import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../apiConfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.SIGNUP}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.message) {
                localStorage.setItem('authToken', data.hashedPassword); // Save token on signup
                localStorage.setItem('userEmail', email); // Save email on signup
                navigate('/dashboard'); // Redirect to Dashboard page
            } else {
                alert(data.error || 'Signup failed!');
            }
        } catch (err) {
            console.error('Signup error:', err);
            alert('An error occurred during signup.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-gray-100 font-sans flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full sm:w-96">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-center mb-8">
                    Signup
                </h2>
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0088]"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0088]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300"
                        >
                            {showPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-white font-bold text-lg hover:opacity-90 transition"
                    >
                        Signup
                    </button>
                </form>
                <p className="text-center text-gray-300 mt-4">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="text-[#ff0088] hover:text-[#ff8800]">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
