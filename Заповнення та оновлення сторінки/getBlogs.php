<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "emaillab";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT caption, text FROM blogs";
$result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($result)) {
        echo "<div class='card'> <div class='card-header bg-info'>".$row["caption"]."</div> <div class='card-body'>".$row["text"]."</div></div><br>";
    }

mysqli_close($conn);
?>