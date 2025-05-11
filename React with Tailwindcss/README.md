# 🚀 Sliding Login/Signup Form with React & Tailwind CSS

Hey guys! 👋 Made this sliding login/signup thingy with React and Tailwind CSS! 

Might save you from those 3am "why-won't-this-auth-work" crying sessions 😂 

Added **Google API integration too** - figured we could all use one less authentication headache. Your future sleep-deprived self might save some coffee money! ☕💤

**Login Page**

![image](https://github.com/user-attachments/assets/1e1a68b1-03cf-49d8-af49-b6cb9c6ca78d)

**Sign Up Page**

![image](https://github.com/user-attachments/assets/4de8db88-5454-4c23-8b37-0ea55dcba5a9)

## ✨ Features

* 🔄 Smooth sliding toggle between login and signup forms
* 🌐 Google API authentication integration
* 🧪 Demo mode with pre-configured test accounts
* 📱 Fully responsive design that works on all device sizes
* 🔐 Form validation with helpful error messages
* ✨ Clean UI with Tailwind CSS styling

## 🛠️ Installation

Getting this up and running is super simple:

1. Clone the repo:
```bash
git clone https://github.com/yourusername/sliding-auth-form.git
cd sliding-auth-form
```

2. Install dependencies:
```bash
npm install
# or if you're a yarn person
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and visit `http://localhost:3000` - You're all set! 🎉

## 🔑 How It Works

The component includes two main forms that slide in and out of view:

* **Login Form**: For returning users to access their accounts
* **Signup Form**: For new users to create accounts

After successful authentication, users are redirected to the homepage. The component uses local storage to persist user data between sessions, making it easy to integrate without a backend.

### 🏠 Demo Homepage

The project includes a simple homepage that users are directed to after successful login/signup. This page is just a placeholder to demonstrate successful authentication. You can easily replace this with your actual application routes.

### 🧪 Demo Mode

Want to test without creating a new account? Use these pre-configured demo credentials:

**Login:**
* Email: `Peter@gmail.com`
* Password: `Peter#123`

**Alternative:**
* Email: `James@gmail.com`
* Password: `James#123`

These demo accounts are hardcoded in the application for easy testing.

## 🌐 Google Authentication Setup

To enable Google authentication:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen if prompted
6. Select "Web application" as the application type
7. Add your domain to authorized origins (use `http://localhost:3000` for local development)
8. Click "Create" and copy your Client ID
9. Replace the placeholder in the code:
```javascript
const GOOGLE_CLIENT_ID = "your_google_client_id"; // Replace with your actual Client ID
```

⚠️ **Important:** Google authentication is required for the "Continue with Google" functionality. 

The component won't work properly without setting up a valid Google Client ID.

## 🐛 Troubleshooting

**Common issues:**

* **Google authentication not working?**
  - Make sure you've set up your Google Client ID correctly
  - Check that your authorized domains include your development URL

* **Form validation errors?**
  - Passwords require at least one uppercase letter, one lowercase letter, and one special character
  - Email addresses must be properly formatted

* **Still having problems?** Feel free to open an issue in the repo!

---

Feel free to use, modify, and enhance! Happy coding! 💻✨
