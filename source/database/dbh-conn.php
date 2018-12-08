<?php
require __DIR__."/connections/SimpleMySQLi.php";

try {
    $mysqli = new SimpleMySQLi("localhost", "root", "", "skoltv", "utf8mb4", "assoc");
  } catch(Exception $e) {
    error_log($e->getMessage());
    exit('Someting weird happened'); //Should be a message a typical user could understand
  }