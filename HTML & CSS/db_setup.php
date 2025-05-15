<?php
$host = "localhost";
$dbname = "login_system";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname`");
    $pdo->exec("USE `$dbname`");
    
    $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
        `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `full_name` VARCHAR(100) NOT NULL,
        `username` VARCHAR(50) NOT NULL UNIQUE,
        `email` VARCHAR(100) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
    $stmt->execute(['username' => 'demo']);
    if ($stmt->fetchColumn() == 0) {
        $demoPassword = password_hash('demo123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (full_name, username, email, password) VALUES (:full_name, :username, :email, :password)");
        $stmt->execute([
            'full_name' => 'Demo User',
            'username' => 'demo',
            'email' => 'demo@example.com',
            'password' => $demoPassword
        ]);
        echo "Demo user created successfully!<br>";
    } else {
        echo "Demo user already exists!<br>";
    }
    
    echo "Database setup complete!";
    
} catch(PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>