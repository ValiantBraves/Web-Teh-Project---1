<?php
session_start(); // Start the session CO23306

// Destroy all session variables to log out the user
session_unset(); 

// Destroy the session
session_destroy();

// Redirect to the login page after logging out
header("Location: login.html");
exit();
?>
