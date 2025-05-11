import React, { useState, useEffect } from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import ToggleButton from './Toggle';

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSignup(!isSignup);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const isMobile = windowWidth < 768;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className={`w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl flex ${isMobile ? 'flex-col' : 'flex-row'} bg-white`}>
        <div className={`${isMobile ? 'order-2' : 'w-1/2'} ${isSignup && !isMobile ? 'order-2' : 'order-1'} transition-all duration-500 ease-in-out`}>
          <div className="p-8 md:p-12 min-h-[600px] flex flex-col justify-center">
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {!isSignup ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        </div>
        
        <div 
          className={`${isMobile ? 'order-1 py-16' : 'w-1/2'} ${isSignup && !isMobile ? 'order-1' : 'order-2'} 
            bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden transition-all duration-500 ease-in-out min-h-[600px]`}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/5 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>
            <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-pink-400 rounded-full opacity-20"></div>
          </div>
          
          <div className={`relative z-10 text-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isSignup ? "Already have an account?" : "New here?"}
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-md opacity-90">
              {isSignup 
                ? "Sign in to access your account and continue your journey with us" 
                : "Join us today and discover a world of possibilities with our platform"}
            </p>
            <ToggleButton toggleForm={toggleForm} isSignup={isSignup} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;