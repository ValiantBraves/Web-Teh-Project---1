<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize user inputs
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Hash the password CO23306
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL query
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    try {
        // Execute query
        $stmt->execute([$username, $email, $hashedPassword]);

        // Start session and store user info
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['user_id'] = $pdo->lastInsertId();  // Get the ID of the newly inserted user
        echo "Sign up successful! <a href='index.html'>Go to Dashboard</a>";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>