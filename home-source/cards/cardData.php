<?php
if(session_status() != 2)
{
    session_start();
}

$TO_HOME_DIR = "../../../";
require __DIR__.'/../../source/database/connections/SimpleMySQLi.php';

class CardData
{
    private $mysqli = "ses"; 

    function __construct(){  
        try {
            $this->mysqli = new SimpleMySQLi("localhost", "root", "", "skoltv", "utf8mb4", "assoc");
          } catch(Exception $e) {
            error_log($e->getMessage());
            exit('Someting weird happened'); //Should be a message a typical user could understand
          }
    }
    public function getCards()
    {
        $arr = $this->mysqli->query("SELECT * FROM cards ORDER BY upvote DESC")->fetchAll("assoc");
        if(!$arr) {return false;}

        return ($arr);
    }
    public function printCards()
    {
        /* Template
        <div class="current-cards" style="display:none !important;">
        <p class="current-cards-name">Nyheter</p>
        <div class="current-cards-content">
            <p class="current-cards-description">En card som visar nyheter, använder sig av databas table</p>
            <div>
                <p class="current-cards-change">Information</p>
                <p class="current-cards-change">Ändra</p>
                <p class="current-cards-change">Ta bort</p>
                <p class="current-cards-change">Förhandsgranska</p>
            </div>
        </div>
        </div>
        */
        $cards=  $this->getCards();
        foreach($cards as $card)
        {   
           echo('<div class="current-cards">
                    <p class="current-cards-name">'.$card['name'].'</p>
                    <div class="current-cards-content">
                        <p class="current-cards-description">'.$card['description'].'</p>
                        <div>
                            <p class="current-cards-change button-information">Information</p>
                            <p class="current-cards-change button-edit">Ändra</p>
                            <p class="current-cards-change button-remove">Ta bort</p>
                            <p class="current-cards-change button-preview">Förhandsgranska</p>
                            <p class="current-cards-change button-upvote">Upvote</p>
                        </div>
                    </div>
                </div>');
        }
    }
    public function printCardInHtmlFormat($name, $pathToRoot)
    {
        $folder = $this->mysqli->query("SELECT folder_path FROM cards WHERE name = ?", [$name])->fetch("col");
        $files = glob(rtrim($pathToRoot.$folder, "/").'/*');

        foreach($files as $file)
        {
            $filetype = substr($file, strrpos($file, ".") + 1); 
            if($filetype == "html")
            {
                require($file);
            }
        }
        
    }
    public function printCardJavascript($name , $pathToRoot)
    {
        $folder = $this->mysqli->query("SELECT folder_path FROM cards WHERE name = ?", [$name])->fetch("col");
        $files = glob(rtrim($pathToRoot.$folder, "/").'/*');
        //var_export($files);
        foreach($files as $file)
        {
            $filetype = substr($file, strrpos($file, ".") + 1); 
            if($filetype == "js")
            {
                require($file);
            }
        }
    }
    public function printCardConfig($name , $pathToRoot)
    {
        $folder = $this->mysqli->query("SELECT folder_path FROM cards WHERE name = ?", [$name])->fetch("col");
        $files = glob(rtrim($pathToRoot.$folder, "/").'/*');
        //var_export($files);
        foreach($files as $file)
        {
            $filetype = substr($file, strrpos($file, ".") + 1); 
            if($filetype == "config")
            {
                require($file);
            }
        }
    }
    public function printCardsForImport()
    {
        $cards=  $this->getCards();
        foreach($cards as $card)
        {   
           echo('<div class="current-cards">
                    <p class="current-cards-name">'.$card['name'].'</p>
                    <div class="current-cards-content">
                        <p class="current-cards-description">'.$card['description'].'</p>
                        <div>
                            <p class="current-cards-change button-import">Import</p>
                            <p class="current-cards-change button-preview">Förhandsgranska</p>
                            <p class="current-cards-change button-information">Information</p>
                            <p class="current-cards-change button-upvote">Upvote</p>
                        </div>
                    </div>
                </div>');
        }
    }
    public function createCard($name, $description, $uid, $filesValues, $fileTypes)
    {
        $arr = $this->mysqli->query("SELECT name FROM cards WHERE name = ?", [$name])->fetch("assoc");
        if(!$arr) // Nothing with the same name found 
        {
            $insert = $this->mysqli->query("INSERT INTO cards(name,description,creatorID, lastedit, created, upvote, folder_path) 
            VALUES(?, ?, ?, ?, ?, 0,?)", [$name, $description, $uid, date("Y-m-d H:i:s"), date("Y-m-d H:i:s"), "storage/cards/".$name]);
            
            //if(!$insert['Warnings'] != 0) {return $insert;}
            mkdir("../../storage/cards/".$name);
            if($fileTypes)
            {
                for($index = 0; $index < count($fileTypes); $index++)
                {
                    $this->assignFileToCard($name, "../../storage/cards/".$name,$filesValues[$index],$fileTypes[$index] );
                }
            }

            return true;
        }
        return false;
    }
    public function printCardInformation($name)
    {
        $card = $this->mysqli->query("SELECT description ,creatorID ,lastedit ,upvote ,created FROM cards WHERE name =?",[$name])->fetch("assoc");
        $creator = $this->mysqli->query("SELECT user_first, user_last, user_uid from users where id = ?",[$_SESSION['u_id']])->fetch("assoc");

        echo ('<h1>Namn: '.$name.'</h1>
        <p><strong>Description: </strong>'.$card['description'].'</p>
        <p><strong>Röster: </strong>'.$card['upvote'].'</p>
        <p><strong>Senast ändrar: </strong> '.$card['lastedit'].'</p>
        <p><strong>Skapades: </strong> '.$card['created'].'</p>
        <p><strong>Skaparens användarnamn: </strong>'.$creator['user_uid'].'</p>
        <p><strong>Skaparens namn: </strong>'.$creator['user_first'].' '.$creator['user_last'].'</p>
        <div style="margin-bottom: 30px;">
        </div>');
    }
    public function deleteCardWithId($id)
    {

        $path = $this->mysqli->query("SELECT folder_path FROM cards WHERE id = ?", [$id])->fetch("col");
        $this->mysqli->query("DELETE FROM cards WHERE id = ?", [$id]);
        $this->recursiveRemove("../../".$path);
        echo $path;

    }
    public function getCardSaveLocation($name)
    {
        $path = $this->mysqli->query("SELECT folder_path FROM cards WHERE name = ?", [$name])->fetch("col");
        if(is_dir("../../".$path))
        {
            echo $path;
        }
        else {
            echo "missing";
        }
    }
    public function deleteCardWithName($name)
    {
        $path = $this->mysqli->query("SELECT folder_path FROM cards WHERE name = ?", [$name])->fetch("col");
        $this->mysqli->query("DELETE FROM cards WHERE name = ?", [$name]);
        $this->recursiveRemove("../../".$path);
        echo $path;
        return true;
    }
    public function voteForCard($votingPower, $name)
    {
        $currentVote = $this->mysqli->query("SELECT upvote FROM cards WHERE name = ?", [$name])->fetch("col");
        $update = $this->mysqli->query("UPDATE cards SET upvote = ? WHERE name = ?", [$currentVote + $votingPower, $name]);
 
        return $update->affectedRows() == 1;
    }
    public function deleteAllCards()
    {
        $this->mysqli->query("DELETE FROM cards");
    
        $this->recursiveRemove("../../storage/cards/");
        mkdir("../../storage/cards/");
        return true;
    
    }
    public function updateFiles($pathToCardFolder, $name, $files)
    {
        foreach($files as $fileInfo)
        {   
            var_dump($fileInfo);
            $file = fopen($pathToCardFolder."/".$fileInfo['type'], "w") or die("Unable to open file!");
            fwrite($file, $fileInfo['value']);
            echo $pathToCardFolder."/".$fileInfo['type'];
            fclose($file);
        }
        return true;
    }
    private function recursiveRemove($dir) {
        $structure = glob(rtrim($dir, "/").'/*');
        if (is_array($structure)) {
            foreach($structure as $file) {
                if (is_dir($file)) $this->recursiveRemove($file);
                elseif (is_file($file)) unlink($file);
            }
        }
        rmdir($dir);
    }
    private function assignFileToCard($cardName, $pathToCardFolder, $fileValue, $fileType)
    {
        $file = fopen($pathToCardFolder."/".$cardName.".".$fileType, "w") or die("Unable to open file!");
        fwrite($file, $fileValue);
        fclose($file);
        return true;
    }
}

if(isset($_POST['dir'])){
    $card = new CardData();
    $state;
    switch($_POST['dir']){
        case "create":
            $state = $card->createCard($_POST['name'], $_POST['description'], $_SESSION['u_id'],[],[]);
            break;
        case "createwithfile":
            $state = $card->createCard($_POST['name'], $_POST['description'], $_SESSION['u_id'], $_POST['files'],$_POST['filetypes']);
            break;
        case "printcards":
            $state = $card->printCards();
            break;
        case "printcardsforimport":
            $state = $card->printCardsForImport();
            break;
        case "printcardinformation":
            $state = $card->printCardInformation($_POST['name']);
            break;
        case "vote":
            $state = $card->voteForCard($_POST['power'],$_POST['name']);
            break;
        case "delete":
            $state =$card->deleteCardWithName($_POST['name']);
            break;
        case "printforimport":
            $state =$card->printCardsForImport();
            break;
        case "getcardsavelocation":
            $state = $card->getCardSaveLocation($_POST['name']);
            break;
        case "updatefile":
            var_dump($_POST['files']);
            $state =$card->updateFiles($_POST['pathtocardsfolder'],$_POST['name'],$_POST['files']);
            break;
    }
    
    if(isset($_POST['ajax'])){
        exit();
    }
    if(empty($_POST['ajax'])){
        header("Location: http://localhost/Skol-tv/");
        exit();
    }
    
}

