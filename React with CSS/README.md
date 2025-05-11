# 🔐 React Authentication System

Hey fellow devs! 👋 What's up? Excited to share this awesome React with CSS authentication system! ✨✨

I've built this slick login/signup form with some cool animations that'll make your users go "wow!" It's super easy to integrate into your projects and looks pretty sweet too! 😎

**Login Page**

![image](https://github.com/user-attachments/assets/9cad6a9a-54bb-4bd9-9994-1a19ee2aeea5)

**Sign Up Page**

![image](https://github.com/user-attachments/assets/f2982f09-266a-4d67-bc16-ada49aac5827)



## ✨ Features

- 🔄 Toggle between login and signup forms with a smooth animation
- 📱 Responsive design that looks great on all devices
- 🔥 Firebase authentication integration
- 🛠️ Demo mode with sample credentials (no Firebase required!)

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Git (for cloning the repo)

### Installation

1. Clone the repo:
```bash
git clone https://github.com/Jia2005/Signup.git
cd Signup/react-with-css
```

2. Install the dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser and go to `http://localhost:3000` - that's it! 🎉

## 🔑 How It Works

This auth system has two main forms:
- **Login Form**: For existing users to sign in
- **Signup Form**: For new users to create an account

You can toggle between these forms by clicking the "Sign Up" or "Login" button on the right side of the screen.

### 🏠 Sample Homepage

After successful login or signup, you'll be redirected to a sample homepage for testing purposes. This is just a placeholder that shows the authentication worked! 🎯 When incorporating this authentication system into your own project, you can simply replace this redirection with your actual application routes. The sample homepage is there just to make testing easier! 👍

### 🧪 Demo Mode

Don't want to set up Firebase? No problem! You can use these sample credentials:

**Login:**
- Email: `Peter@gmail.com`
- Password: `Peter#123`

**Signup:**
- Name: `James`
- Email: `James@gmail.com`
- Password: `James123`

These credentials are hardcoded in the Login.js and Signup.js files - you can modify them as needed for your own testing!

## 🔥 Firebase Setup

To use this with your own Firebase project:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication with Email/Password sign-in method
3. Create a Firestore database
4. Get your Firebase config from Project Settings
5. Replace the placeholder config in `firebase.js` with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "your_actual_api_key",
  authDomain: "your_actual_auth_domain",
  projectId: "your_actual_project_id",
  storageBucket: "your_actual_storage_bucket",
  messagingSenderId: "your_actual_messaging_sender_id",
  appId: "your_actual_app_id"
};
```

## 🐛 Troubleshooting

**Firebase errors?**
- Make sure your Firebase config is correct
- Check that you've enabled Email/Password authentication in Firebase console
- Verify your Firebase rules allow read/write to your database

**Still having issues?** Open an issue in this repo!

---
Build with creativity, authenticate with style! ✨💻
