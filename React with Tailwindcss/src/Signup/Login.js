import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Sample credentials that will work without Firebase
  const SAMPLE_EMAIL = "Peter@gmail.com";
  const SAMPLE_PASSWORD = "Peter#123";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Check if using the sample credentials
    if (email === SAMPLE_EMAIL && password === SAMPLE_PASSWORD) {
      // Sample login successful
      console.log("Sample login successful!");
      // Extract username from email to pass to home page
      const username = email.split('@')[0];
      navigate(`/home?demo=${username}`);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        setError('Invalid email format');
      } else if (errorCode === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (errorCode === 'auth/user-disabled') {
        setError('This account has been disabled');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-900">Welcome Back</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="block text-gray-700 text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">Forgot password?</a>
          </div>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-lg"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Demo Account: Peter@gmail.com / Peter#123</p>
      </div>
    </div>
  );
}

export default Login;