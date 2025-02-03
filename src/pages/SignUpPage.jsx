import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
            <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent z-10">
                <Link to="/" className="flex items-center">
                    <img
                        src="public/Screenshot_2025-02-02_110454-removebg-preview.png"
                        alt="Logo"
                        className="h-20"
                    />
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
                        src="public\7534046_3682888.jpg"
                        alt="Sign Up"
                        className="w-auto h-100 object-cover mt-[97px]"
                    />
                </div>

                <div className="bg-white w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight">Create an Account</h2>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </form>

                    {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}

                    <p className="text-center mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
  .dot {
    width: 8px;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    position: absolute;
    animation: moveAndGlow 3s infinite alternate ease-in-out;
    pointer-events: none;
    box-shadow: 
      0 0 15px rgba(255, 255, 255, 0.9), 
      0 0 30px rgba(255, 255, 255, 0.9), 
      0 0 45px rgba(255, 255, 255, 0.9);
  }

  @keyframes moveAndGlow {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5);
      opacity: 0.3;
    }
  }

  ${Array.from({ length: 50 }).map((_, index) => `
    .dot-${index} {
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
      animation-duration: ${Math.random() * 3 + 2}s;
    }
  `).join('')}
`}</style>
        </div>
    );
}
