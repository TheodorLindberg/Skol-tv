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
require "../../../source/database/dbh-conn.php";

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
<body>

    <?php include "../../header.php";  //lägger till headern?>
    <p><?php echo $cardName?></p>
    <?php
    //Hämtar fil vägen till card:ets filer
    $cardPath = $mysqli->query("SELECT folder_path FROM cards where name=?",[$cardName])->fetch("col");
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
    }
    ?>
    <button onclick='location.assign("../cards.php")'>Back</button>
    <button id="button-save">Save</button>
    <button id="button-save-exit">Save and exit</button>
</body>
<script >

function save()
{
    var files = [];

    var editors = document.getElementsByClassName("editor-items");
    console.log(editors);
    for (var i = 0; i < editors.length; i++) {
        var editor = editors[i].getElementsByTagName("textarea")[0];
        console.log(editor);
        var name = editors[i].getAttribute("file-name");
        console.log(name);
        files.push({"value": editor.value, "type":name});
    }

    console.log(files);

    $.ajax({
        method: "POST",
        url: "../../../home-source/cards/cardData.php",
        data: {
            "dir": "updatefile",
            "ajax": true,
            "name": "<?php echo $filename?>",
            "files": files,
            "pathtocardsfolder": "<?php echo "../../".$cardPath?>"
        },
        success: function(responseText) {
        console.log(responseText);
        alert("Saved");
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