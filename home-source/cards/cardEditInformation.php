<?php
require __DIR__.'/../../source/database/connections/SimpleMySQLi.php';

class CardEditData
{
    private $mysqli = "ses"; 
    private $card;
    
    function __construct() 
    {   
        try {
            $this->mysqli = new SimpleMySQLi("localhost", "root", "", "skoltv", "utf8mb4", "assoc");
        } catch(Exception $e) {
            error_log($e->getMessage());
            exit('Someting weird happened'); //Should be a message a typical user could understand
        }
    }

    public function loadCard($name)
    { 
        $this->card = $this->mysqli->query("SELECT * FROM cards WHERE name =?",[$name])->fetch("assoc");
    }
    public function getName()
    {
        return $this->card['name'];
    }
    public function getDescription()
    {
        return $this->card['description'];
    }
    public function getStatus()
    {
        return $this->card['status'];
    }
    public function getStatusInformation()
    {
        return $this->card['status_info'];
    }
    public function getIncludePath()
    {
        return $this->card['folder_path'];
    }
    public function getUser()
    {
        $creator = $this->mysqli->query("SELECT user_first, user_last, user_uid from users where id = ?",[$this->card['creatorID']])->fetch("assoc");
        return $creator;
    }
    public function setName($newName)
    {
        $this->mysqli->query("UPDATE cards SET name=? where name=?", [$newName, $this->card['name']]);
    }
    public function setDescription($newDescription)
    {
        $this->mysqli->query("UPDATE cards SET description=? where name=?", [$newDescription, $this->card['name']]);
    }
    public function setStateInformation($newSateInformation)
    {
        $this->mysqli->query("UPDATE cards SET status_info=? where name=?", [$newSateInformation, $this->card['name']]);
    }
    public function setState($newState)
    {
        if($newState == "true")
        {
            $newState = 1;
        } else {
            
            $newState = 0;
        }
        echo $newState;
        $this->mysqli->query("UPDATE cards SET status=? where name=?", [$newState, $this->card['name']]);
    }
}


if(isset($_POST['dir'])){
    $card = new CardEditData();
    $card->loadCard($_POST['name']);
    switch($_POST['dir']){
        case "updatename":
            $card->setName($_POST['value']);
            break;
        case "updatedescription":
            $card->setDescription($_POST['value']);
            break;
        case "updatestateinformation":
            $card->setStateInformation($_POST['value']);
            break;
        case "updatestate":
            $card->setState($_POST['value']);
            break;        
    }
    exit();
}

