import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, setDoc } from './../firebase';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
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
    console.log("Form submitted with:", { name, email, password, confirmPassword });
    console.log("Navigate function available:", !!navigate);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      window.alert("Passwords do not match.");
      return;
    }

    const result = await signUpUser(email, password);
    console.log("Signup result:", result);

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
              age: '',
              phone: '',
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
            console.log("Demo user - redirecting with window.location");
            window.location.href = `/home?demo=${username}`;
            return;
          }

          console.log("Regular user - signing in and navigating with React Router");
          try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
          } catch (signinError) {
            console.error("Error signing in after signup:", signinError);
            window.location.href = '/home';
          }
        } catch (error) {
          console.error("Error with user data or navigation:", error);
          setError("Error: " + error.message);
          window.alert("Error: " + error.message);
        }
      } else {
        setError('User creation failed. Please try again.');
        window.alert('User creation failed. Please try again.');
      }
    } else {
      console.error("Signup failed:", result);
      
      switch (result.errorCode) {
        case 'auth/email-already-in-use':
          setError('The email address is already in use. Please use a different email.');
          window.alert('The email address is already in use. Please use a different email.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address. Please check and try again.');
          window.alert('Invalid email address. Please check and try again.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please use a stronger password.');
          window.alert('The password is too weak. Please use a stronger password.');
          break;
        default:
          setError('Sign-up failed: ' + result.errorMessage);
          window.alert('Sign-up failed: ' + result.errorMessage);
      }
    }
  };

  return (
    <div>
      <form name="sign-up" onSubmit={handleSubmit} className='signform'>
        <br /><br />
        <h1 align="center">Create your Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='field'>
          <label>Name</label>
          <input
            className='in'
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name" 
            style={{ fontSize: '16px' }}
            required
          />
        </div>
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
            required
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
            required
          />
        </div>
        <div className='field'>
          <label>Confirm Password</label>
          <input
            className='in'
            type="password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password" 
            style={{ fontSize: '16px' }}
            required
          />
        </div>
        <div>
          <button type="submit" className="submit btn" style={{ backgroundColor: '#000000', color: 'rgb(255, 255, 255)' }}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;