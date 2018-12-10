<?php
//Tar värdet get variablen e från url
$cardName =  $_GET['e'];

//Saker för att kunna vara inloggad
session_start();
if (!isset($_SESSION['u_id'])) {
    header("Location: ../../../");
}

$TO_HOME_DIR = "../../../";

//Lägger till databas anslutning
require "../../../home-source/cards/cardEditInformation.php";

$cardForEdit = new CardEditData();
$cardForEdit->loadCard($cardName);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../../home-source/cards/css/editor.css">
    <title>Document</title>
</head>
    <script>
        window.onload = function(){
            document.getElementById("card-name").value = "<?php echo $cardForEdit->getName(); ?>";
            document.getElementById("card-description").value = <?php echo json_encode($cardForEdit->getDescription());?>;

            var button = document.getElementById("card-state");
            if(<?php echo $cardForEdit->getStatus();?>)
            {
                button.innerHTML = "Mark unready"
                button.style.backgroundColor = "green";
            }
            else {
                button.innerHTML = "Mark ready"
                button.style.backgroundColor = "red";
            }
            document.getElementById("card-state-description").value = <?php echo json_encode($cardForEdit->getStatusInformation());?>;
    
        }
    </script>
<body>
    <?php include "../../header.php";  //lägger till headern?>
    <div id="card-information-edit">
        <div id="card-general-information-edit">
            
            <label for="card-name" class="card-information-edit-content">Name:</label>
            <input name="card-name" type="text" id="card-name" class="card-information-edit-content">
            
            <label for="card-description" class="card-information-edit-content">Description:</label>
            <textarea  id="card-description" cols="30" rows="5" class="card-information-edit-content"></textarea >
            <br>
            <br>
            <button id="card-state" class="card-information-edit-content">Mark ready</button>
            
            <label for="card-state-description" class="card-information-edit-content">Status information:</label>
            <textarea cols="30" rows="3" id ="card-state-description" class="card-information-edit-content"></textarea>
        </div>
        <div id="edit-file-layout">
        </div>
    </div>
    <p><?php echo $cardName?></p>
    <?php
    //Hämtar fil vägen till card:ets filer
   /*$cardPath = $mysqli->query("SELECT folder_path FROM cards where name=?",[$cardName])->fetch("col");
    echo $cardPath;

    //Hämtar alla filer från $cardPath foldern

    $files = glob(rtrim("../../../".$cardPath, "/").'/*');

    //Kollar att $files är en array av filer samt att den inehåller fler än en fil
    if(is_array($files) && count($files) > 0 )
    {
        
        echo '<div class="editor" >'."\n";
        //Går igenom varje fil
        foreach($files as $file)
        {
            //hämtar filtypen och namnet
            $filetype = substr($file, strrpos($file, ".") + 1); 
            $filename = substr($file, strrpos($file, "/") + 1); 
            echo '<div class="editor-items" file-name="'.$filename.'">'."\n";
    

            echo($filename);
            echo '<textarea>'."\n";
            //Includara file, vilket kommer göra så att den printas till textarea
            include($file);
            echo '</textarea>'."\n";
            echo '</div>'."\n";
            
        }
        echo '</div>'."\n";
    }  //Kollar om det finns ett directory 
    else if(!is_dir("../../../".$cardPath)) 
    {
        echo "No project folder for ".$cardName." found";
    }
    else  {
        echo "No file found in project folder ".$cardName." Folder";
    }*/
    ?>
    <button onclick='location.assign("../cards.php")'>Back</button>
    <button id="button-save">Save</button>
    <button id="button-save-exit">Save and exit</button>
</body>
<script>
    var cardName = "<?php echo $cardForEdit->getName()?>"
    var cardDescription = <?php echo json_encode($cardForEdit->getDescription());?>;
    var cardEditInformationPath = "../../../home-source/cards/cardEditInformation.php";
    var cardStateInformation = <?php echo json_encode($cardForEdit->getStatusInformation());?>;
    var state = <?php echo $cardForEdit->getStatus();?>;
</script>
<script src="../../../source/external/jquery-3.3.1.min.js"></script>
<script src="../../../home-source/cards/js/editorController.js"></script>
<script>

function save()
{
    $.ajax({
        method: "POST",
        url: cardEditInformationPath,
        data: {
            "dir": "update" + "name",
            "ajax": "true",
            "name": "Klocka",
            "newname": "hello"
        },
        success: function(responseText, s, t, l, p) {
            console.log(responseText);

        },
        error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

    });
}

$("#button-save").click(function(event){
    save();
});
$("#button-save-exit").click(function(event){
    save();
    location.assign("../cards.php");
});
</script>
</html>