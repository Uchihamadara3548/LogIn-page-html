<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Path to your SQLite database file
$db = new SQLite3('user.db');

// Check if connection is successful
if (!$db) {
    die("Connection failed: " . $db->lastErrorMsg());
}

// Receive data from POST request
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Hash password (use bcrypt or another strong hashing algorithm)
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Prepare statement to insert data
$stmt = $db->prepare('INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password)');
$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->bindValue(':password', $password_hash, SQLITE3_TEXT);

// Execute statement
$result = $stmt->execute();

// Check if insertion was successful
if ($result) {
    // Redirect to login form after successful registration
    header('Location: login.html');
    exit();
} else {
    echo "Registration failed: " . $db->lastErrorMsg();
}

// Close database connection
$db->close();
?>