<?php
if(!isset($TO_HOME_DIR))
{
    $TO_HOME_DIR = "../../";
}
if(session_status() != 2)
{
    session_start();
}
require $TO_HOME_DIR.'source/database/connections/SimpleMySQLi.php';
class LayoutData
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
    public function getLayouts()
    {
        $arr = $this->mysqli->query("SELECT * FROM layouts ORDER BY upvote DESC")->fetchAll("assoc");
        if(!$arr) {return false;}

        return ($arr);
    }
    public function printActiveLayout()
    {
        $layoutid = $this->mysqli->query("SELECT active_layout FROM information")->fetchAll("col");
        
        if($layoutid[0] == -1)
        {
            echo "Ingen nuvarande layout, var god aktivera en";
        }
        else
        {
            $layout = $this->mysqli->query("SELECT * FROM layouts WHERE id=?",[$layoutid[0]])->fetch("assoc");
            if($layout)
            {
                echo('<div class="current-layouts">
                        <p class="current-layouts-name">'.$layout['name'].'</p>
                        <div class="current-layouts-content">
                            <p class="current-layouts-description">'.$layout['description'].'</p>
                            <div>
                                <p class="current-layouts-change button-information">Information</p>
                                <p class="current-layouts-change button-edit">Ändra</p>
                                <p class="current-layouts-change button-remove">Ta bort</p>
                                <p class="current-layouts-change button-prelayout">Förhandsgranska</p>
                                <p class="current-layouts-change button-deactivate">Avaktivera</p>
                                <p class="current-layouts-change button-upvote">Upvote</p>
                            </div>
                        </div>
                    </div>');
            }
            else {
                echo "Ingen nuvarande layout, var god aktivera en";
            }
        }
    }
    public function setActiveLayout($name)
    {
        $layoutid = $this->mysqli->query("SELECT id FROM layouts WHERE name = ?", [$name])->fetch("col");
        $insert = $this->mysqli->query("UPDATE information SET active_layout=?", [$layoutid]);
        $this->printActiveLayout();
    }
    public function DeactiveLayout()
    {
        $insert = $this->mysqli->query("UPDATE information SET active_layout=-1",[]);
        $this->printActiveLayout();
    }
    public function printLayouts()
    {
        /* Template
        <div class="current-layouts" style="display:none !important;">
        <p class="current-layouts-name">Nyheter</p>
        <div class="current-layouts-content">
            <p class="current-layouts-description">En layout som visar nyheter, använder sig av databas table</p>
            <div>
                <p class="current-layouts-change">Information</p>
                <p class="current-layouts-change">Ändra</p>
                <p class="current-layouts-change">Ta bort</p>
                <p class="current-layouts-change">Förhandsgranska</p>
            </div>
        </div>
        </div>
        */
        $layouts=  $this->getLayouts();
        if($layouts)
        {
            foreach($layouts as $layout)
            {   
            echo('<div class="current-layouts">
                        <p class="current-layouts-name">'.$layout['name'].'</p>
                        <div class="current-layouts-content">
                            <p class="current-layouts-description">'.$layout['description'].'</p>
                            <div>
                                <p class="current-layouts-change button-information">Information</p>
                                <p class="current-layouts-change button-edit">Ändra</p>
                                <p class="current-layouts-change button-remove">Ta bort</p>
                                <p class="current-layouts-change button-prelayout">Förhandsgranska</p>
                                <p class="current-layouts-change button-make-default">Aktivera</p>
                                <p class="current-layouts-change button-upvote">Upvote</p>
                            </div>
                        </div>
                    </div>');
            }
        }
        else{
            echo "Det finns inga layouts i databasen";
        }
    }
    public function printLayoutsForImport()
    {
        /* Template
        <div class="current-layouts" style="display:none !important;">
        <p class="current-layouts-name">Nyheter</p>
        <div class="current-layouts-content">
            <p class="current-layouts-description">En layout som visar nyheter, använder sig av databas table</p>
            <div>
                <p class="current-layouts-change">Information</p>
                <p class="current-layouts-change">Ändra</p>
                <p class="current-layouts-change">Ta bort</p>
                <p class="current-layouts-change">Förhandsgranska</p>
            </div>
        </div>
        </div>
        */
        $layouts=  $this->getLayouts();
        if($layouts)
        {
            foreach($layouts as $layout)
            {   
            echo('<div class="current-layouts">
                        <p class="current-layouts-name">'.$layout['name'].'</p>
                        <div class="current-layouts-content">
                            <p class="current-layouts-description">'.$layout['description'].'</p>
                            <div>
                            <p class="current-layouts-change button-import">Lägg till</p>
                                <p class="current-layouts-change button-information">Information</p>
                                <p class="current-layouts-change button-prelayout">Förhandsgranska</p>
                                <p class="current-layouts-change button-upvote">Upvote</p>
                            </div>
                        </div>
                    </div>');
            }
        }
        else{
            echo "Det finns inga layouts i databasen";
        }
    }
    public function createLayout($name, $description, $uid)
    {
        $arr = $this->mysqli->query("SELECT name FROM layouts WHERE name = ?", [$name])->fetch("assoc");
        
        if(!$arr) // Nothing with the same name found 
        {
            $insert = $this->mysqli->query("INSERT INTO layouts(name,description,creator_id, edit_date, created_date) 
            VALUES(?, ?, ?, ?, ?)", [$name, $description, $uid, date("Y-m-d H:i:s"), date("Y-m-d H:i:s")]);
            
            //if(!$insert['Warnings'] != 0) {return $insert;}
            mkdir("../../../source/layouts/".$name);

           /* if($fileTypes)
            {
                for($index = 0; $index < count($fileTypes); $index++)
                {
                 $this->assignFileToLayout($name, "../../../source/layouts/".$name,$filesValues[$index],$fileTypes[$index] );
                }
            }*/

            return true;
        }
        return false;
    }
    public function printLayoutInformation($name)
    {
        $layout = $this->mysqli->query("SELECT description ,creator_id , created_date, edit_date,upvote FROM layouts WHERE name =?",[$name])->fetch("assoc");
        $creator = $this->mysqli->query("SELECT user_first, user_last, user_uid from users where id = ?",[$_SESSION['u_id']])->fetch("assoc");

        echo ('<h1>Namn: '.$name.'</h1>
        <p><strong>Description: </strong>'.$layout['description'].'</p>
        <p><strong>Röster: </strong>'.$layout['upvote'].'</p>
        <p><strong>Senast ändrar: </strong> '.$layout['edit_date'].'</p>
        <p><strong>Skapades: </strong> '.$layout['created_date'].'</p>
        <p><strong>Skaparens användarnamn: </strong>'.$creator['user_uid'].'</p>
        <p><strong>Skaparens namn: </strong>'.$creator['user_first'].' '.$creator['user_last'].'</p>
        <div style="margin-bottom: 30px;">
        </div>');
    }
    public function deleteLayoutWithId($id)
    {
        $this->mysqli->query("DELETE FROM layouts WHERE id = ?", [$id]);
    }
    public function deleteLayoutWithName($name)
    {
        $this->mysqli->query();
        $this->mysqli->query("DELETE FROM layouts WHERE name = ?", [$name]);
        return true;
    }
    public function voteForLayout($votingPower, $name)
    {
        $currentVote = $this->mysqli->query("SELECT upvote FROM layouts WHERE name = ?", [$name])->fetch("col");
        $update = $this->mysqli->query("UPDATE layouts SET upvote = ? WHERE name = ?", [$currentVote + $votingPower, $name]);
 
        return $update->affectedRows() == 1;
    }
    public function deleteAllLayouts()
    {
        $this->mysqli->query("DELETE FROM layouts");
    
        $this->recursiveRemove("../../../source/layouts/");
        mkdir("../../../source/layouts/");
        return true;
    }
    public function updateFiles($pathToLayoutFolder, $name, $files)
    {
        foreach($files as $fileInfo)
        {   
            $file = fopen($pathToLayoutFolder."/".$fileInfo['type'], "w") or die("Unable to open file!");
            fwrite($file, $fileInfo['value']);
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
    private function assignFileToLayout($layoutName, $pathToLayoutFolder, $fileValue, $fileType)
    {
        $file = fopen($pathToLayoutFolder."/".$layoutName.".".$fileType, "w") or die("Unable to open file!");
        fwrite($file, $fileValue);
        fclose($file);
        return true;
    }
}

if(isset($_POST['dir'])){
    $layout = new LayoutData();
    $state;
    switch($_POST['dir']){
        case "create":
            $state = $layout->createLayout($_POST['name'], $_POST['description'], $_SESSION['u_id']);
            break;

        case "printlayouts":
            $state = $layout->printLayouts();
            break;
        case "printcurrentlayout":
            $state = $layout->printActiveLayout();
            break;
        case "printlayoutinformation":
            $state = $layout->printLayoutInformation($_POST['name']);
            break;
        case "vote":
            $state = $layout->voteForLayout($_POST['power'],$_POST['name']);
            break;
        case "activate":
            $state = $layout->setActiveLayout($_POST['name']);
            break;
        case "deactivate":
            $state = $layout->DeactiveLayout();
            break;
        case "delete":
            $state =$layout->deleteLayoutWithName($_POST['name']);
            break;
        case "updatefile":
            $state =$layout->updateFiles($_POST['pathtolayoutsfolder'],$_POST['name'],$_POST['files']);
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
