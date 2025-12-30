import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.code === 'auth/weak-password'
          ? 'Password should be at least 6 characters'
          : err.code === 'auth/email-already-in-use'
          ? 'Email already registered'
          : 'Invalid email or password'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFDAB9] to-white dark:from-[#8B4513] dark:to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#FF8C00]">
          {isSignUp ? 'Join ErrandMe' : 'Welcome Back'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (6+ characters)"
            className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="bg-[#FF8C00] hover:bg-[#FFA500] text-white px-8 py-4 rounded-full text-lg font-bold w-full transition shadow-lg"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FF8C00] font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;