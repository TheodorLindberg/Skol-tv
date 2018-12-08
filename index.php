<?php
session_start();
if(isset($_SESSION['u_id'])){
    header("Location: home/home.php");
} 

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./source/css/mainPage.css">
</head>

<body>
    <ul class="navbar" role="navigation">
        <li class="nav nav-skoltv">
            <h1>Skol TV</h1>
        </li>
        <li class="divider">
        </li>
        <li>
            <input class="nav nav-uname nav-login" id="uid" type="text" placeholder="username">
        </li>
        <li>
            <input class="nav nav-pwd nav-login" id="pwd" type="password" placeholder="password">
        </li>
        <li>
            <button class="nav nav-confirm nav-login" id="asdfasdfgdfg-log"> Login</button>
        </li>
    </ul>
    <p id="error-message">Error</p>


    <div id="main-content">
        <h1 id="maintext">Kontrolera TV</h1>
        <p id="maintext-fotter"> Theodor, Kalle 8B, 8A</p>

    </div>

</body>
<script src="./source/external/jquery-3.3.1.min.js"></script>
<script>
    var errorDisplay = document.getElementById("error-message");
    errorDisplay.addEventListener('webkitAnimationEnd', function(event) {
        errorDisplay.style.display = 'none';
    }, false);

    function displayError(error) {
        errorDisplay.innerHTML = error;
        errorDisplay.style.display = "block";
        errorDisplay.classList.remove("fadeout");
        errorDisplay.classList.add("fadeout");
    }
    $("#asdfasdfgdfg-log").click(function(event) {
        var uid = $("#uid").val();
        var pwd = $("#pwd").val();
        $.ajax({
            method: "POST",
            url: "./source/database/connections/user.php",
            data: {
                "ajax": "true",
                "dir": "login",
                "uid": uid,
                "pwd": pwd
            },
            success: function(responseText) {
                if (responseText == "success") {
                    location.reload();
                    displayError("success");
                } else {

                    displayError("Error: " + responseText);
                }
            },
            error: function(jqXHR, status, error) {
                if (jqXHR.status === 0) {
                    alert('Not connected.\nPlease verify your network connection.');
                } else if (jqXHR.status == 404) {
                    alert('The requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error.\n' + jqXHR.responseText);
                }
            }

        });
    });
</script>

</html>