<?php
// Add these lines at the very top of the file
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
define('DB_SERVER', 'localhost'); // Your database host
define('DB_USERNAME', 'root');    // Your database username
define('DB_PASSWORD', '');        // Your database password
define('DB_NAME', 'golk_db');     // The database name we created

// Attempt to connect to MySQL database
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
