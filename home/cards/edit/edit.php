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
    <div id="card-information-edit" style="background-color:grey;">
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
        <div id="edit-file-layout" >
            <p>Projects file structure</p>
            <div class="folder" id="root">

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
<script src="../../../home-source/cards/js/editorController.js"></script>
<script src="../../../home-source/cards/js/filesystem.js"></script>
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