<?php
$host = 'localhost';  // or your server host
$dbname = 'tunedin';  // database name
$username = 'root';   // default username for XAMPP MySQL
$password = '';       // default password for XAMPP MySQL CO23306

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>