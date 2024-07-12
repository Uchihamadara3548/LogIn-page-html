<?php
  // Database connection details
  $servername = "localhost";
  $username = "your_username";
  $password = "your_password";
  $dbname = "mydatabase";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Check if form is submitted
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Prepare SQL statement
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      // Login successful
      // Redirect to welcome page or perform other actions
      header("Location: Final_Page/final.html");
    } else {
      // Login failed
      echo "Invalid username or password";
    }
  }

  $conn->close();
?>