<?php
session_start();
require  __DIR__.'/SimpleMySQLi.php';

class User 
{
    private $mysqli = "ses"; 

    function __construct($data){  
        try {
            $this->mysqli = new SimpleMySQLi("localhost", "root", "", "skoltv", "utf8mb4", "assoc");
          } catch(Exception $e) {
            error_log($e->getMessage());
            exit('Someting weird happened'); //Should be a message a typical user could understand
          }
    }
    public function SignupUser($first,$last, $email, $uid, $pwd){
        if (empty($first) || empty($last) || empty($email) || empty($uid) || empty($pwd)) {
			return "empty";
        } if (!preg_match("/^[a-zA-Z]*$/", $first) || !preg_match("/^[a-zA-Z]*$/", $last)) {
            return "invalid";
        } if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "email";
        }
        $arr = $this->mysqli->query("SELECT user_uid FROM users WHERE user_uid = ?", [$uid])->fetch("assoc"); 
        if(!$arr){
            $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
            $insert = $this->mysqli->query("INSERT INTO users (user_first, user_last, user_email, user_uid, user_pwd)
            VALUES (?, ?, ?, ?, ?)", [$first,$last, $email, $uid, $hashedPwd]);
            return "success";
        }
        return "uidalreadyexist";
        
    }
    public function LogutUser(){
        session_unset();
        return "success";
    }
    public function LoginUser($uid, $pwd){
        if (empty($uid) || empty($pwd)) {
			return "empty";
        }
        $row = $this->mysqli->query("SELECT * FROM users WHERE user_uid = ?", [$uid])->fetch("assoc"); 
        if(!$row){
            return "wrongauth";
        }
            $hashedPwdCheck = password_verify($pwd, $row['user_pwd']);
            if ($hashedPwdCheck == false) {
                return "wrongauth";
            }
            else
            {

                $_SESSION['u_id'] = $row['id'];
                $_SESSION['u_first'] = $row['user_first'];
                $_SESSION['u_last'] = $row['user_last'];
                $_SESSION['u_email'] = $row['user_email'];
                $_SESSION['u_uid'] = $row['user_uid'];
                return "success";
            }
    }
}
if(isset($_POST['dir'])){
    $user = new User("hello");
    $state ="";
    switch($_POST['dir']){
        case "login":
        $state= $user->LoginUser($_POST['uid'],$_POST['pwd']);
            break;
        case "logout":
        $state= $user->LogutUser();
            break;
        case "signup": 
        $state= $user->SignupUser($_POST['first'],$_POST['last'],$_POST['email'],$_POST['uid'],$_POST['pwd']);
            break;
    }
    if(isset($_POST['ajax'])){
        echo $state;
        exit();
    }
    if(empty($_POST['ajax'])){
        header("Location: http://localhost/newGlosbanken/");
        exit();
    }
    
}