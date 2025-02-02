import React, { useRef, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

export default function PasswordResetPage() {
    const emailRef = useRef();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, emailRef.current.value);
            setMessage('Check your email for further instructions.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
            <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent z-10">
                <Link to="/" className="flex items-center">
                    <img
                        src="public\Screenshot_2025-02-02_110454-removebg-preview.png"
                        alt="Logo"
                        className="w-40 h-16"
                    />
                </Link>
                <Link to="/" className="text-white bg-indigo-600 rounded-lg px-6 py-3 transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:shadow-lg hover:rounded-xl">
                    Home
                </Link>
            </nav>

            <div className="absolute inset-0 flex flex-wrap justify-center pointer-events-none z-0">
                {Array.from({ length: 50 }).map((_, index) => (
                    <div key={index} className={`dot dot-${index}`} />
                ))}
            </div>

            <div className="flex max-w-4xl w-full shadow-2xl rounded-lg overflow-hidden z-10 bg-white/10 backdrop-blur-sm">
                <div className="hidden md:block w-1/2 bg-white">
                    <img
                        src="https://img.freepik.com/free-vector/flat-illustration-stock-trader-working-computer-with-graphs-man-investor-using-pc-analyzing-charts-diagrams-exchange-market-finances-cryptocurrency-investing_74855-20567.jpg?w=2000&t=st=1727629695~exp=1727630295~hmac=fe21d2c10f06284d06b0d5834b2a33b71528affef5583557f6e98507c4733751"
                        alt="password-reset"
                        className="w-auto h-100 object-cover mt-[97px]"
                    />
                </div>

                <div className="bg-white w-full md:w-1/2 p-8">
                    <h2 className="text-6xl font-bold text-center text-gray-900 mb-8 tracking-tight">Reset Password</h2>

                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <div>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            Send Password Reset Email
                        </button>
                    </form>

                    {error && <p className="text-red-500 text-center mt-6 font-medium">{error}</p>}
                    {message && <p className="text-green-500 text-center mt-6 font-medium">{message}</p>}

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Remember your password?{' '}
                            <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .dot {
                    width: 4px;
                    height: 4px;
                    background-color: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    position: absolute;
                    animation: glow 2s infinite alternate ease-in-out;
                    pointer-events: none;
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
                }

                @keyframes glow {
                    0% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                }

                ${Array.from({ length: 50 }).map((_, index) => `
                    .dot-${index} {
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        animation-delay: ${Math.random() * 2}s;
                    }
                `).join('')}
            `}</style>
        </div>
    );
}
