<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php?error=You must be logged in to view this page");
    exit();
}

$username = $_SESSION['username'];
$fullName = $_SESSION['full_name'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        body {
            background: #f5f5f5;
            color: #333;
        }
        
        header {
            background: linear-gradient(45deg, #8e2de2, #4a00e0);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-info span {
            margin-right: 20px;
        }
        
        .logout-btn {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .logout-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        main {
            max-width: 1200px;
            margin: 40px auto;
            padding: 20px;
        }
        
        .welcome-card {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            text-align: center;
            margin-bottom: 30px;
        }
        
        .welcome-card h1 {
            color: #4a00e0;
            margin-bottom: 15px;
        }
        
        .dashboard-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .card-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #8e2de2, #4a00e0);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            color: white;
            font-size: 24px;
        }
        
        .card h2 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .card p {
            color: #666;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .dashboard-cards {
                grid-template-columns: 1fr;
            }
            
            header {
                flex-direction: column;
                text-align: center;
            }
            
            .user-info {
                margin-top: 15px;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">Dashboard</div>
        <div class="user-info">
            <span>Welcome, <?php echo htmlspecialchars($fullName); ?></span>
            <a href="logout.php" class="logout-btn">Logout</a>
        </div>
    </header>
    
    <main>
        <div class="welcome-card">
            <h1>Welcome to Your Dashboard</h1>
            <p>You have successfully logged in to the system. This is a dummy homepage demonstrating a successful login.</p>
        </div>
        
        <div class="dashboard-cards">
            <div class="card">
                <div class="card-icon">📊</div>
                <h2>Analytics</h2>
                <p>View your performance metrics and insights to help grow your business.</p>
            </div>
            
            <div class="card">
                <div class="card-icon">📝</div>
                <h2>Tasks</h2>
                <p>Manage your daily tasks and projects to stay organized and productive.</p>
            </div>
            
            <div class="card">
                <div class="card-icon">📱</div>
                <h2>Apps</h2>
                <p>Access all your integrated applications from one convenient location.</p>
            </div>
        </div>
    </main>
</body>
</html>