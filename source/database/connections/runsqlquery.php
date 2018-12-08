<?php

require './dbh-conn.php';

session_start();

if(!isset($_SESSION['u_id']))
{
    echo "Security alert, not authorized";
    exit();
}
else
{
    $sqlCode = $_POST['queryCode'];

    $code = $_POST['taskPassword'];

    if(!(isset($code) && $code == "t45rhsfdd49s"))
    {
        echo "Not authorized";
        exit();
    }

    if(!isset($_POST['password']))
    {
        echo "Password authorized needed to perform task";
        exit();
    }

    if(!isset($sqlCode))
    {
        echo "No code enterd";
    }
    try {
        $mysqli = new SimpleMySQLi("localhost", "root", "", "skoltv", "utf8mb4", "assoc");
      } catch(Exception $e) {
        error_log($e->getMessage());
        exit('Someting weird happened, database connection failed'); //Should be a message a typical user could understand
      }
      
      $row = $mysqli->query("SELECT * FROM users WHERE id = ?", [$_SESSION['u_id']])->fetch("assoc"); 
      if(!$row){
          echo "login error database";
          exit();
      }
      $hashedPwdCheck = password_verify($_POST['password'], $row['user_pwd']);
    
      if ($hashedPwdCheck == false) {
          echo "wrongauth";
          exit();
      }
      else
      {

        echo "Task authorized by ".$row['user_uid']."\n";


        echo "Operation result\n";
        $insert = $mysqli->query('INSERT INTO users (user_first, user_last, user_email, user_uid, user_pwd) VALUES ("ds", "ds", "ds", "ds", "ds")');

          echo "Info";
          var_dump($insert->info());
          echo "\n";
        exit();
      
      
    }


}







