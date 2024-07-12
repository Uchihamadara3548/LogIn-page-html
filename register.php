<?php
  // Include database connection file
  include 'database.php';

  // Check if form is submitted
  if (isset($_POST['submit'])) {
    // Get form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and execute SQL statement to insert user data
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";

    if (mysqli_query($conn, $sql)) {
      // Registration successful
      echo "Registration successful!";
    } else {
      // Error inserting data
      echo "Error: " . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
  }
?>