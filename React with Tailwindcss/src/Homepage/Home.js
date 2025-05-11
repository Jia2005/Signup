import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../firebase';

function Home() {
  const [username, setUsername] = useState("Friend");
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  
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
    
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
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
      {showConfetti && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          <div className="animate-confetti-1 absolute top-0 left-1/4 w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="animate-confetti-2 absolute top-0 left-1/3 w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="animate-confetti-3 absolute top-0 left-1/2 w-5 h-5 bg-blue-500 rounded-full"></div>
          <div className="animate-confetti-4 absolute top-0 left-2/3 w-4 h-4 bg-green-500 rounded-full"></div>
          <div className="animate-confetti-5 absolute top-0 left-3/4 w-3 h-3 bg-pink-500 rounded-full"></div>
          <div className="animate-confetti-6 absolute top-0 left-1/5 w-5 h-5 bg-purple-500 rounded-full"></div>
          <div className="animate-confetti-7 absolute top-0 left-4/5 w-4 h-4 bg-indigo-500 rounded-full"></div>
        </div>
      )}
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-lg">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
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
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">5</p>
            <p className="text-gray-600 text-sm">Messages</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-gray-600 text-sm">Notifications</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-purple-600">7</p>
            <p className="text-gray-600 text-sm">Updates</p>
          </div>
        </div>
        
        <div className="bg-indigo-50 p-6 rounded-xl mb-8">
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
          className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>
      
      <style jsx>{`
        @keyframes confetti-fall-1 {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
        }
        @keyframes confetti-fall-2 {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(-180deg); opacity: 0.3; }
        }
        .animate-confetti-1 { animation: confetti-fall-1 5s linear infinite; }
        .animate-confetti-2 { animation: confetti-fall-2 7s linear infinite; animation-delay: 0.2s; }
        .animate-confetti-3 { animation: confetti-fall-1 4s linear infinite; animation-delay: 0.4s; }
        .animate-confetti-4 { animation: confetti-fall-2 6s linear infinite; animation-delay: 0.6s; }
        .animate-confetti-5 { animation: confetti-fall-1 8s linear infinite; animation-delay: 0.8s; }
        .animate-confetti-6 { animation: confetti-fall-2 5s linear infinite; animation-delay: 1s; }
        .animate-confetti-7 { animation: confetti-fall-1 7s linear infinite; animation-delay: 1.2s; }
      `}</style>
    </div>
  );
}

export default Home;