<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Path to your SQLite database file
$db = new SQLite3('/storage/emulated/0/Android/data/com.teejay.trebedit/files/TrebEdit user files/LogIn-pagehtml/user.db');

// Check if connection is successful
if (!$db) {
    die("Connection failed: " . $db->lastErrorMsg());
}

// Receive data from POST request
$username = $_POST['username'];
$password = $_POST['password'];

// Prepare statement to fetch user data
$stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
$stmt->bindValue(':username', $username, SQLITE3_TEXT);

// Execute statement and get the result
$result = $stmt->execute();
$user = $result->fetchArray(SQLITE3_ASSOC);

// Verify password and check if user exists
if ($user && password_verify($password, $user['password_hash'])) {
    // Start a session and set session variables if needed
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    // Redirect to the final page
    header('Location: Final_Page/final.html');
    exit();
} else {
    echo "Invalid username or password.";
}

// Close database connection
$db->close();
?>