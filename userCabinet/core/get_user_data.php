<?php
require_once 'config.php';

$email= trim($_POST['email']);

if ($email ==''){
    echo 2;
    die;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM users WHERE email='".$email."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo "0";
}
$conn->close();
?>