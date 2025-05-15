<?php
session_start();
require_once('db_config.php');

if (isset($_POST['signin'])) {
    $username = $_POST['login_username'];
    $password = $_POST['login_password'];
    if (empty($username) || empty($password)) {
        header("Location: index.php?error=Please fill in all fields");
        exit();
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['full_name'] = $user['full_name'];
            
            header("Location: home.php");
            exit();
        } else {
            header("Location: index.php?error=Invalid username or password");
            exit();
        }
    } catch(PDOException $e) {
        header("Location: index.php?error=Database error. Please try again later.");
        exit();
    }
} else {
    header("Location: index.php");
    exit();
}
?>