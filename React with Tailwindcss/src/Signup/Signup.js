import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, setDoc } from './../firebase';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sample credentials for testing without Firebase
  const SAMPLE_NAME = "James";
  const SAMPLE_EMAIL = "James@gmail.com";
  const SAMPLE_PASSWORD = "James123";

  const signUpUser = async (email, password) => {
    console.log("Attempting signup with:", { name, email, password });
    
    // Check if using sample credentials
    if (email === SAMPLE_EMAIL && password === SAMPLE_PASSWORD) {
      console.log("Using sample credentials - mock success");
      return {
        success: true,
        user: {
          uid: 'sample-user-id',
          name: name,
          email: email
        }
      };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Firebase signup successful:", user);
      return { success: true, user };
    } catch (error) {
      console.error("Firebase signup error:", error);
      return { success: false, errorCode: error.code, errorMessage: error.message };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const result = await signUpUser(email, password);
    
    if (result.success) {
      const { user } = result;
      if (user) {
        try {
          if (email.includes("@gmail.com") || name === SAMPLE_NAME) {
            console.log("Demo user - skipping Firestore");
          } else {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
              name,
              email,
              createdAt: new Date().toISOString(),
              profilePic: ''
            });
            console.log("User document created successfully");
          }
          
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          
          if (email.includes("@gmail.com") || name === SAMPLE_NAME) {
            const username = email.split('@')[0];
            navigate(`/home?demo=${username}`);
            return;
          }
          
          try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
          } catch (signinError) {
            console.error("Error signing in after signup:", signinError);
            navigate('/home');
          }
        } catch (error) {
          console.error("Error with user data or navigation:", error);
          setError("Account created but had trouble signing you in. Please try logging in.");
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } else {
      console.error("Signup failed:", result);
      switch (result.errorCode) {
        case 'auth/email-already-in-use':
          setError('This email is already in use');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format');
          break;
        case 'auth/weak-password':
          setError('Password is too weak - use at least 6 characters');
          break;
        default:
          setError('Registration failed: ' + result.errorMessage);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Create Account</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-email">
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="signup-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-password">
            Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-lg"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;