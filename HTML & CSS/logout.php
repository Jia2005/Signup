<?php
session_start();
$_SESSION = array();
session_destroy();
header("Location: index.php?success=You have been successfully logged out");
exit();
?>