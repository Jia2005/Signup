<?php
session_start();
require_once('db_config.php');

if (isset($_POST['signup'])) {
    $fullName = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];
    
    if (empty($fullName) || empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        header("Location: index.php?error_signup=Please fill in all fields");
        exit();
    }
    
    if ($password !== $confirmPassword) {
        header("Location: index.php?error_signup=Passwords do not match");
        exit();
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.php?error_signup=Invalid email format");
        exit();
    }
    
    try {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        if ($stmt->fetchColumn() > 0) {
            header("Location: index.php?error_signup=Username already exists");
            exit();
        }
        
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        if ($stmt->fetchColumn() > 0) {
            header("Location: index.php?error_signup=Email already exists");
            exit();
        }
        
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (full_name, username, email, password) VALUES (:full_name, :username, :email, :password)");
        $stmt->execute([
            'full_name' => $fullName,
            'username' => $username,
            'email' => $email,
            'password' => $hashedPassword
        ]);
        header("Location: index.php?success=Registration successful! Please login.");
        exit();
        
    } catch(PDOException $e) {
        header("Location: index.php?error_signup=Database error. Please try again later.");
        exit();
    }
} else {
    header("Location: index.php");
    exit();
}
?>