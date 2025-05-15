<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Login & Signup</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f5f5f5;
            overflow: hidden;
        }
        
        .container {
            position: relative;
            width: 800px;
            height: 500px;
            background: #fff;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border-radius: 12px;
            display: flex;
        }
        
        .panel {
            width: 50%;
            height: 100%;
            transition: all 0.5s ease-in-out;
        }
        
        .left-panel {
            background-color: #fff;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .right-panel {
            background: #6a11cb;
            background: linear-gradient(to right, #6a11cb, #8736ff);
            color: #fff;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        
        h2 {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .input-group {
            margin-bottom: 20px;
        }
        
        input {
            width: 100%;
            padding: 12px 15px;
            background: #f0f2fa;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            margin-bottom: 10px;
            outline: none;
            transition: all 0.3s;
        }
        
        input:focus {
            background: #e8ebf7;
        }
        
        button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .signin-btn {
            background-color: #6a11cb;
            color: #fff;
        }
        
        .signin-btn:hover {
            background-color: #5a0cb5;
        }
        
        .signup-btn {
            background-color: transparent;
            color: #fff;
            border: 1px solid #fff;
        }
        
        .signup-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .alt-text {
            margin-top: 20px;
            font-size: 14px;
        }
        
        .link {
            color: #6a11cb;
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;
        }
        
        .white-link {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
        }
        
        .message {
            margin-top: 15px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-size: 14px;
        }
        
        .error {
            background-color: #ffdddd;
            color: #ff0000;
        }
        
        .success {
            background-color: #ddffdd;
            color: #4CAF50;
        }
        
        .welcome-text {
            margin-bottom: 20px;
        }
        
        .forgot-password {
            text-align: center;
            margin: 15px 0;
            font-size: 14px;
        }
        
        /* For the sliding effect */
        .container.signup-mode .left-panel {
            transform: translateX(100%);
        }
        
        .container.signup-mode .right-panel {
            transform: translateX(-100%);
        }
        
        #signin-form, #signup-form {
            width: 100%;
        }
        
        /* Hidden by default */
        #signup-form {
            display: none;
        }
        
        .container.signup-mode #signin-form {
            display: none;
        }
        
        .container.signup-mode #signup-form {
            display: block;
        }
        
        /* Dashboard styles */
        .dashboard {
            display: none;
        }
        
        .dashboard-header {
            background: #6a11cb;
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dashboard-logo {
            font-size: 22px;
            font-weight: bold;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-info a {
            margin-left: 15px;
            color: white;
            text-decoration: none;
            padding: 5px 10px;
            border: 1px solid white;
            border-radius: 4px;
        }
        
        .dashboard-content {
            padding: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .welcome-card {
            background: white;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            margin-bottom: 30px;
        }
        
        .welcome-card h1 {
            color: #6a11cb;
            margin-bottom: 15px;
        }
        
        .card-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px; 
        }
        
        .card {
            background: white;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            flex: 1;
            min-width: 250px;
        }
        
        .card-icon {
            width: 60px;
            height: 60px;
            background: #6a11cb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            color: white;
            font-size: 24px;
        }
        
        .card h2 {
            margin-bottom: 10px;
            color: #333;
        }
        
        .card p {
            color: #666;
            line-height: 1.6;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                width: 90%;
                flex-direction: column;
                height: auto;
            }
            
            .panel {
                width: 100%;
                height: auto;
            }
            
            .right-panel {
                padding: 30px;
            }
            
            .left-panel {
                padding: 30px;
            }
            
            .container.signup-mode .left-panel {
                transform: translateY(100%);
            }
            
            .container.signup-mode .right-panel {
                transform: translateY(-100%);
            }
            
            .card-container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container" id="container">
        <div class="panel left-panel">
            <form id="signin-form" action="login_process.php" method="POST">
                <h2>Sign in</h2>
                <div class="input-group">
                    <input type="text" name="login_username" placeholder="Username" required>
                    <input type="password" name="login_password" placeholder="Password" required>
                </div>
                <div class="forgot-password">
                    <a href="#" class="link">Forgot your password?</a>
                </div>
                <button type="submit" name="signin" class="signin-btn">SIGN IN</button>
                <p class="alt-text">Don't have an account? <a href="#" class="link" onclick="toggleForm()">Sign up</a></p>
                
                <?php if(isset($_GET['error'])): ?>
                <div class="message error">
                    <?php echo htmlspecialchars($_GET['error']); ?>
                </div>
                <?php endif; ?>
                
                <?php if(isset($_GET['success'])): ?>
                <div class="message success">
                    <?php echo htmlspecialchars($_GET['success']); ?>
                </div>
                <?php endif; ?>
            </form>
            
            <form id="signup-form" action="register_process.php" method="POST">
                <h2>Create Account</h2>
                <div class="input-group">
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="email" name="email" placeholder="Email Address" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                </div>
                <button type="submit" name="signup" class="signin-btn">SIGN UP</button>
                <p class="alt-text">Already have an account? <a href="#" class="link" onclick="toggleForm()">Sign in</a></p>
                
                <?php if(isset($_GET['error_signup'])): ?>
                <div class="message error">
                    <?php echo htmlspecialchars($_GET['error_signup']); ?>
                </div>
                <?php endif; ?>
            </form>
        </div>
        
        <div class="panel right-panel">
            <div id="right-panel-signin" class="content">
                <h2>Hello, Friend!</h2>
                <p class="welcome-text">Enter your personal details and start journey with us</p>
                <button class="signup-btn" onclick="toggleForm()">SIGN UP</button>
            </div>
            
            <div id="right-panel-signup" class="content" style="display: none;">
                <h2>Welcome Back!</h2>
                <p class="welcome-text">To keep connected with us please login with your personal info</p>
                <button class="signup-btn" onclick="toggleForm()">SIGN IN</button>
            </div>
        </div>
    </div>

    <script>
        function toggleForm() {
            const container = document.getElementById('container');
            const rightPanelSignin = document.getElementById('right-panel-signin');
            const rightPanelSignup = document.getElementById('right-panel-signup');
            
            container.classList.toggle('signup-mode');
            
            if (container.classList.contains('signup-mode')) {
                rightPanelSignin.style.display = 'none';
                rightPanelSignup.style.display = 'block';
            } else {
                rightPanelSignin.style.display = 'block';
                rightPanelSignup.style.display = 'none';
            }
        }
    </script>
</body>
</html>