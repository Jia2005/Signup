import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../firebase';

function Home() {
  const [username, setUsername] = useState("Friend");
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) {
      const name = user.email.split('@')[0];
      setUsername(name);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const demo = urlParams.get('demo');
      if (demo) {
        setUsername(demo);
      }
    }
    
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    // Trigger animations after a small delay
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const handleLogout = () => {
    try {
      auth.signOut();
    } catch (error) {
      console.log("Logout failed or using sample login");
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">      
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-lg">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className={`h-20 w-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden tick-container ${animate ? 'animate-tick-rotation' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login Successful!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome back, <span className="font-bold text-indigo-600 capitalize">{username}</span>!
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className={`bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl shadow-sm text-center transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            <p className="text-2xl font-bold text-indigo-600">5</p>
            <p className="text-gray-600 text-sm">Messages</p>
          </div>
          <div className={`bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl shadow-sm text-center transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-gray-600 text-sm">Notifications</p>
          </div>
          <div className={`bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm text-center transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <p className="text-2xl font-bold text-purple-600">7</p>
            <p className="text-gray-600 text-sm">Updates</p>
          </div>
        </div>
        
        <div className={`bg-indigo-50 p-6 rounded-xl mb-8 transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="font-medium text-gray-800 mb-2">Today's Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-gray-600 text-sm">You completed 3 tasks</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <p className="text-gray-600 text-sm">New feature available</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <p className="text-gray-600 text-sm">Team meeting at 3:00 PM</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className={`w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '500ms' }}
        >
          Logout
        </button>
      </div>
      
      <style jsx>{`
        @keyframes tick-rotation {
          0% { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(360deg); }
        }
        .animate-confetti-1 { animation: confetti-fall-1 5s linear infinite; }
        .animate-confetti-2 { animation: confetti-fall-2 7s linear infinite; animation-delay: 0.2s; }
        .animate-confetti-3 { animation: confetti-fall-1 4s linear infinite; animation-delay: 0.4s; }
        .animate-confetti-4 { animation: confetti-fall-2 6s linear infinite; animation-delay: 0.6s; }
        .animate-confetti-5 { animation: confetti-fall-1 8s linear infinite; animation-delay: 0.8s; }
        .animate-confetti-6 { animation: confetti-fall-2 5s linear infinite; animation-delay: 1s; }
        .animate-confetti-7 { animation: confetti-fall-1 7s linear infinite; animation-delay: 1.2s; }
        
        .tick-container {
          transform-style: preserve-3d;
          transform: perspective(400px);
        }
        
        .animate-tick-rotation {
          animation: tick-rotation 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Home;