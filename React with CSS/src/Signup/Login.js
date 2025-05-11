import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Sample credentials that will work without Firebase
  const SAMPLE_EMAIL = "Peter@example.com";
  const SAMPLE_PASSWORD = "Peter#123";

  const handleSubmit = async (event) => {
    event.preventDefault();
    
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
        window.alert('The email address is badly formatted.');
      } else if (errorCode === 'auth/user-not-found') {
        window.alert('No user found with this email address.');
      } else if (errorCode === 'auth/wrong-password') {
        window.alert('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/user-disabled') {
        window.alert('Your account has been disabled. Please contact support.');
      } else {
        window.alert('Login failed');
      }
    }
  };

  return (
    <div>
      <form name="login" onSubmit={handleSubmit} className='logform'>
        <br /><br />
        <h1 align="center">Login</h1>
        <div className='field'>
          <label>Email</label>
          <input
            className='in'
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address" 
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className='field'>
          <label>Password</label>
          <input
            className='in'
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password" 
            style={{ fontSize: '16px' }}
          />
        </div>
        <div>
          <button type="submit" className="submit btn" style={{ backgroundColor: '#000000', color: 'rgb(255, 255, 255)', alignSelf:'center' }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;