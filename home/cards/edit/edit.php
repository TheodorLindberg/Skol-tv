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
    <link rel="stylesheet" href="../../../home-source/cards/css/filesystem/editor.css">
    <link rel="stylesheet" href="../../../home-source/cards/css/filesystem/contextmenu.css">
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
    <div class="editor-body">
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
        <div class="contextmenu" id="file-editor-contexmenu"> 
            <a class="new-file">
                <p> Add file </p><span>Ctrl + n</span>
            </a>
            <a class="new-folder-file">
                <p> Add folder </p><span>Ctrl + Shift + n</span>
            </a>
            <a class="delete-file">
                <p> Delete file </p><span>del , backspace</span>
            </a>
            <a class="open-file">
                <p> Open file </p><span>Ctrl + o</span>
            </a>
            <a class="open-window-file">
                <p> Open in new page </p><span>Ctrl + Shift + o</span>
            </a>
            <a class="rename-file">
                <p> Rename file </p><span>Ctrl + r</span>
            </a>
            <div class="contextmenue-divider">
            </div>
            <a class="copy-file">
                <p> Copy file </p><span>Ctrl + c</span>
            </a>
            <a class="paste-file">
                <p> Paste file </p><span>Ctrl + v</span>
            </a>
            <a class="clone-file">
                <p> Clone file </p><span>Ctrl + x</span>
            </a>
            <a class="copy-path-file">
                <p> Copy path </p><span>Ctrl + g</span>
            </a>
        </div>
        <div id="edit-file-layout" >
            <p>Projects file structure</p>
            <div class="folder" id="root">
            </div>
        </div>
    </div>
    <div class="text-editor">
        <div class="text-editor-header">
            <div class="text-editor-header-item" disabled="true">
                <p>Filename:</p>
                <span onclick="alert('close');">&times;</span>
            </div>
            <div class="text-editor-header-item">
                <p>long file name this is long:</p>
                <span onclick="alert('close');">&times;</span>
            </div>
        </div>
        <div class="text-editor-editzone">
            <textarea name="" class="text-editor-textarea"id="" cols="30" rows="10"></textarea>
        </div>
    </div>
    </div>
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
<script src="../../../home-source/cards/js/filesystem/editorController.js"></script>
<script src="../../../home-source/cards/js/filesystem/filesystemEvents.js"></script>
<script src="../../../home-source/cards/js/filesystem/filesystem.js"></script>
<script src="../../../home-source/cards/js/filesystem/contextmenu.js"></script>
<script src="../../../home-source/cards/js/filesystem/header.js"></script>
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