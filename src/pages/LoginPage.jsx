import React from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router-dom

export default function LoginPage() {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError('Login Failure');
        }
    };

    const loginWithGitHub = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (err) {
            setError('Login Failure');
        }
    };

    const loginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            setError('Invalid username or password');
        }
    };








    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">

            <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent z-10">
                <Link to="/" className="flex items-center">
                    <img
                        src="public\Screenshot_2025-02-02_110454-removebg-preview.png" // Replace with your logo URL
                        alt="Logo"
                        className="h-20" // Adjust logo height as needed
                    />
                </Link>
              
            </nav>

            <div className="absolute inset-0 flex flex-wrap justify-center pointer-events-none z-0">
                {Array.from({ length: 50 }).map((_, index) => (
                    <div key={index} className={`dot dot-${index}`} />
                ))}
            </div>
            <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden z-10">

                <div className=" hidden md:block w-1/2 bg-white ">
                    <img
                        src="public\7534046_3682888.jpg"
                        alt="login"
                        className="w-auto h-100 object-cover mt-[97px]"
                    />

                </div>


                <div className="bg-white w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 tracking-wider">Login</h2>

                    <form onSubmit={loginWithEmail} className="space-y-4 mt-6">
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
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 hover:shadow-lg hover:rounded-2xl"
                        >
                            Login with Email
                        </button>
                    </form>

                    <div className="flex items-center w-full mt-[30px]">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-400">Or login with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={loginWithGoogle}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 mt-[30px] hover:shadow-lg hover:rounded-2xl"
                        >
                            <img src="public\google.svg" alt="google" height={27} width={27} />

                            Continue with Google
                        </button>

                        <button
                            onClick={loginWithGitHub}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 hover:shadow-lg hover:rounded-2xl"
                        >
                            <img src="public\github.svg" alt="google" height={27} width={27} />

                            Continue with GitHub
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <div className="text-center mt-4">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/sign-up" className="text-indigo-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                        <p>
                            Forgot your password?{' '}
                            <Link to="/password-reset" className="text-indigo-600 hover:underline">
                                Reset Password
                            </Link>
                        </p>
                    </div>
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