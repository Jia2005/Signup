import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const loginGoogleButtonRef = useRef(null);
  const signupGoogleButtonRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const GOOGLE_CLIENT_ID = "your_google_client_id";  // enter your google client id here
  const USERS_KEY = 'app_users';
  const GOOGLE_USERS_KEY = 'app_google_users';

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        initializeGoogleSignIn();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeGoogleSignIn();
      };
    };

    loadGoogleScript();
    
    return () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, [isLogin]);

  const initializeGoogleSignIn = () => {
    if (!window.google) return;
    
    window.google.accounts.id.cancel();
    
    const buttonRef = isLogin ? loginGoogleButtonRef : signupGoogleButtonRef;
    const handleResponse = isLogin ? handleGoogleLoginResponse : handleGoogleSignupResponse;
    
    if (buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleResponse,
        context: isLogin ? 'signin' : 'signup',
        ux_mode: 'popup'
      });

      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: isLogin ? 'signin_with' : 'signup_with',
          shape: 'rectangular',
          width: buttonRef.current.offsetWidth
        }
      );
    }
  };

  const getUsers = () => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const getGoogleUsers = () => {
    const googleUsersJson = localStorage.getItem(GOOGLE_USERS_KEY);
    return googleUsersJson ? JSON.parse(googleUsersJson) : [];
  };

  const saveUser = (user, isGoogleUser = false) => {
    if (isGoogleUser) {
      const googleUsers = getGoogleUsers();
      googleUsers.push(user);
      localStorage.setItem(GOOGLE_USERS_KEY, JSON.stringify(googleUsers));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      const users = getUsers();
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  const findGoogleUser = (email) => {
    const googleUsers = getGoogleUsers();
    return googleUsers.find(user => user.email === email);
  };

  const findUser = (email) => {
    const users = getUsers();
    return users.find(user => user.email === email);
  };

  const handleGoogleSignupResponse = async (response) => {
    if (response.credential) {
      try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        const { email, name } = payload;
        
        if (findGoogleUser(email)) {
          setError("This Google account is already registered. Please sign in instead.");
          return;
        }
        
        if (findUser(email)) {
          setError("An account with this email already exists. Please use a different method to sign in.");
          return;
        }
        
        saveUser({ email, name }, true);
        navigate('/documents');
      } catch (error) {
        setError("Failed to create account with Google. Please try again.");
      }
    }
  };

  const handleGoogleLoginResponse = async (response) => {
    if (response.credential) {
      try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        const { email } = payload;
        
        const googleUser = findGoogleUser(email);
        if (!googleUser) {
          setError("No account found with this Google account. Please sign up first.");
          return;
        }
        
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/documents');
      } catch (error) {
        setError("Failed to sign in with Google. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const { email, password } = formData;
        
        if (!email || !password) {
          throw new Error("Please fill in all fields");
        }
        
        if (!validateEmail(email)) {
          throw new Error("Please enter a valid email address");
        }
        
        const user = findUser(email);
        if (!user) {
          throw new Error("No account found with this email. Please sign up first.");
        }
        
        if (user.password !== password) {
          throw new Error("Incorrect password. Please try again.");
        }
        
        if (findGoogleUser(email)) {
          throw new Error("This account was created with Google. Please use 'Continue with Google' to sign in.");
        }
        
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/documents');
      } else {
        const { name, email, password, confirmPassword } = formData;
        
        if (!name || !email || !password || !confirmPassword) {
          throw new Error("Please fill in all fields");
        }
        
        if (!validateEmail(email)) {
          throw new Error("Please enter a valid email address with @ symbol");
        }
        
        if (!validatePassword(password)) {
          throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and one special character");
        }
        
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        if (findUser(email) || findGoogleUser(email)) {
          throw new Error("An account with this email already exists");
        }
        
        saveUser({ name, email, password });
        navigate('/documents');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setError('');
      setIsSliding(false);
    }, 500);
  };

  const renderForm = (isLoginForm) => (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-3 text-gray-800">
        {isLoginForm ? 'Welcome Back' : 'Create Account'}
      </h1>
      <p className="text-gray-500 mb-6">
        {isLoginForm ? 'Please enter your details to sign in' : 'Sign up to get started'}
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full">
        {!isLoginForm && (
          <div className="w-full mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-5 py-3 rounded-lg bg-gray-50 
                        focus:outline-none focus:ring-2 focus:ring-violet-600 
                        placeholder-gray-400 text-gray-600 border border-gray-200"
            />
          </div>
        )}
        
        <div className="w-full mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-lg bg-gray-50 
                      focus:outline-none focus:ring-2 focus:ring-violet-600 
                      placeholder-gray-400 text-gray-600 border border-gray-200"
          />
        </div>
        
        <div className="w-full mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={isLoginForm ? "Password" : "Create Password"}
            className="w-full px-5 py-3 rounded-lg bg-gray-50 
                      focus:outline-none focus:ring-2 focus:ring-violet-600 
                      placeholder-gray-400 text-gray-600 border border-gray-200"
          />
        </div>
        
        {!isLoginForm && (
          <div className="w-full mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-5 py-3 rounded-lg bg-gray-50 
                        focus:outline-none focus:ring-2 focus:ring-violet-600 
                        placeholder-gray-400 text-gray-600 border border-gray-200"
            />
          </div>
        )}
        
        {isLoginForm && (
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-violet-600 hover:text-violet-700">Forgot password?</a>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-violet-600 text-white py-3 rounded-lg text-base font-medium
                   hover:bg-violet-700 transition-all duration-300 mb-4"
        >
          {isLoading ? (isLoginForm ? 'Signing in...' : 'Creating Account...') : (isLoginForm ? 'Sign in' : 'Sign Up')}
        </button>
        
        <div className="relative flex items-center justify-center w-full mb-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="bg-white px-4 text-sm text-gray-500">or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        {isLoginForm ? (
          <div ref={loginGoogleButtonRef} className="w-full h-12 mb-6" />
        ) : (
          <div ref={signupGoogleButtonRef} className="w-full h-12 mb-6" />
        )}
      </form>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 to-indigo-200 flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-xl md:min-h-[600px] relative">
        <div className="relative md:w-1/2">
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col z-10">
            {renderForm(true)}
            <p className="text-center text-gray-600 text-sm mt-4">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={toggleAuthMode}
                className="text-violet-600 hover:text-violet-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
        
        <div className="relative md:w-1/2">
          <div className="absolute inset-0 p-8 md:p-12 z-10 max-h-full overflow-auto">
            <div className="flex flex-col h-full mb-8">
              {renderForm(false)}
              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
          
          <div 
            className={`absolute inset-0 bg-violet-600 p-12 text-white flex flex-col justify-center z-20
                      transition-transform duration-1000 ease-in-out
                      ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {isLogin ? (
              <>
                <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                <p className="text-white/80 mb-8 text-lg">
                We're glad to see you again! Log in with your personal info to continue your journey.                  
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="px-8 py-3 border-2 border-white rounded-lg text-base font-medium
                           hover:bg-white hover:text-violet-600 transition-all duration-300 self-start"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6">New Here?</h2>
                <p className="text-white/80 mb-8 text-lg">
                  Join us to discover amazing opportunities and explore new possibilities!
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="px-8 py-3 border-2 border-white rounded-lg text-base font-medium
                           hover:bg-white hover:text-violet-600 transition-all duration-300 self-start"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="md:hidden flex justify-center mt-4">
          <button 
            onClick={toggleAuthMode}
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;