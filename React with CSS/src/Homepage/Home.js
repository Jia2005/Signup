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
    <div className="home-container">      
      <div className="welcome-card">
        <div className="success-icon">✅</div>
        <h1>Yayy! Login Successful</h1>
        <p className="welcome-message">Welcome back, <span className="username">{username}</span>!</p>
        <p className="success-text">You've successfully logged in to your account</p>
        
        <div className="stats-container">
          <div className="stat-box">
            <span className="stat-number">5</span>
            <span className="stat-label">New Messages</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">2</span>
            <span className="stat-label">Notifications</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">7</span>
            <span className="stat-label">Updates</span>
          </div>
        </div>
        
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <style jsx>{`
        .home-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #89d0ff 0%, #6f9dff 100%);
          font-family: 'Arial', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .welcome-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          animation: fadeIn 0.8s ease-out;
          position: relative;
          z-index: 10;
        }
        
        .success-icon {
          font-size: 60px;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }
        
        h1 {
          color: #333;
          margin-bottom: 15px;
          font-size: 28px;
        }
        
        .welcome-message {
          font-size: 18px;
          color: #666;
          margin-bottom: 25px;
        }
        
        .username {
          color: #4285f4;
          font-weight: bold;
          text-transform: capitalize;
        }
        
        .success-text {
          color: #43a047;
          font-size: 16px;
          margin-bottom: 30px;
        }
        
        .stats-container {
          display: flex;
          justify-content: space-around;
          margin: 30px 0;
        }
        
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #4285f4;
        }
        
        .stat-label {
          font-size: 14px;
          color: #777;
          margin-top: 5px;
        }
        
        .logout-button {
          background-color: #fa5959;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 30px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }
        
        .logout-button:hover {
          background-color: #e04848;
          box-shadow: 0 5px 15px rgba(250, 89, 89, 0.3);
          transform: translateY(-2px);
        }
        
        .confetti {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-image: 
            radial-gradient(circle, #ff77ff 8px, transparent 8px),
            radial-gradient(circle, #5effc9 10px, transparent 10px),
            radial-gradient(circle, #ffde59 6px, transparent 6px),
            radial-gradient(circle, #5cb3ff 12px, transparent 12px),
            radial-gradient(circle, #ff7777 6px, transparent 6px),
            radial-gradient(circle, #88ff88 9px, transparent 9px);
          background-size: 5% 5%, 7% 7%, 4% 4%, 6% 6%, 3% 3%, 8% 8%;
          animation: confettiRain 8s linear infinite;
        }
        
        @keyframes confettiRain {
          0% {
            background-position: 
              0% 0%, 20% 20%, 40% 40%, 60% 60%, 80% 80%, 100% 100%;
            opacity: 1;
          }
          100% {
            background-position: 
              20% 100%, 40% 20%, 60% 40%, 80% 60%, 100% 80%, 0% 100%;
            opacity: 0.5;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 600px) {
          .welcome-card {
            padding: 30px 20px;
          }
          
          h1 {
            font-size: 24px;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;