<?php
session_start();
if(!isset($_SESSION['u_id'])){
    header("Location: ../");
} 
$RootFolderPath = "../";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../home-source/home/home.css">
    <title>Document</title>
</head>
<body>
<div>
    <?php include "header.php"; ?>
</div>

<h1>Homepage</h1>

</body>
<script src="../home-source/home/home.js"></script>
</html>

