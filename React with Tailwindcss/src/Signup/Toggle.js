function ToggleButton({ toggleForm, isSignup }) {
  return (
    <button 
      onClick={toggleForm}
      className="text-center py-3 px-8 rounded-full bg-white text-indigo-600 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {isSignup ? "Sign In" : "Sign Up"}
    </button>
  );
}

export default ToggleButton;