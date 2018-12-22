<?php
session_start();
if (!isset($_SESSION['u_id'])) {
    header("Location: ../../");
}
$TO_HOME_DIR = "../../";
require $TO_HOME_DIR.'home-source/cards/cardData.php';

$card = new CardData();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../source/css/popup.css">
    <link rel="stylesheet" href="../../source/css/cards.css">

    <link rel="stylesheet" href="../../home-source/cards/css/cardsHome.css">
    <link rel="stylesheet" href="../../home-source/cards/css/cardsCreate.css">
    <link rel="stylesheet" href="../../home-source/cards/css/cardsCurrentCards.css">
    <title>Document</title>
</head>
<body>
<div>
    <?php include "../header.php";?>
</div>


<p style="text-align:center; color:blue; font-size:30px;">Utveckla</p>
<div class="cards cardsHome">
    <div class="card current-cards">

        <h1 class="cards-header">Nuvarande cards</h1>

        <div id="card-information-popup-container">
        </div>
        
        <div class="cards-cardlist"> 

        <?php $card->printCards();?>

        </div>


    </div>
    <div class="create-cards card">
        <div style= "margin-left:10%;">
            <button class="create-card-button" onclick="document.getElementById('create-card-popup').style.display='block'" style="width:auto;"> Skapa card</button>
        </div>

        <p class="create-card-req">För att skapa en card är det bra om du kan lite om html css och javscript.
            Om du kommer göra någon form av data besparing behöver du antingen
            använda ett eget sätt eller använda hemisdans sql database, då behöver du
            både kunna sql och php, samt få lite information om sidans database av mig(Theodor).
        </p>
        
        <div id="create-card-popup" class="popup">
            <div class="create-card-content popup-content popup-animate" >

                <div class="popup-topSection">
                    <span onclick="document.getElementById('create-card-popup').style.display='none'" class="popup-close" title="Close Modal">&times;</span>
                </div>

                <h1 style="text-align:center; margin-top: 5px;">Skapa en card</h1>

                <div class="create-card-mainContent popup-container">
                    
                    <div class="create-card-information">
                        <label for="card-name"><b>Layout namn</b></label>
                        <input id="card-name" type="text" placeholder="Namn" name="card-name" required>

                        <label for="card-description"><b>Layout beskrivning</b></label>
                        <textarea  id="card-description" type="text" placeholder="Beskrivning" name="card-description" placeholder="Beskrivning"> </textarea>

                        <label for="html"><b>Använd html och css?</b></label>
                        <input editor-index="0" editor-filetype="html" class="file-selector" id="card-html" type="checkbox" name="html">
                        <br>
                        <label for="javascript"><b>Använd javascript?</b></label>
                        <input editor-index="1" editor-filetype="js" class="file-selector" id="card-javascript" type="checkbox" name="javascript">
                        <br>
                        <label for="php"><b>Använd php</b></label>
                        <input editor-index="2" editor-filetype="php" class="file-selector" id="card-php" type="checkbox" name="php">
                        <br>
                        <label for="database"><b>Använd database</b></label>
                        <input  editor-index="3"  id="card-database" type="checkbox" name="database">
                    </div>
                    <div class="create-card-files-informations">
                        <ul class="create-card-files-informations-header">
                            <button editor-index="0" id="editor-html">Html Css</button>
                            <button  editor-index="1" id="editor-javascript">Javscript</button>
                            <button  editor-index="2" id="editor-php">Php</button>
                            <button editor-index="3"  id="editor-database">Mysqli</button>
                        </ul>
                        <textarea style="display:none; margin: 8px;" id="text-editor" cols="70"></textarea>
                        <button id="run-sql-code" style="display:none !important;">Run sql code</button>
                    </div>
                </div>

                <div class="popup-container popup-footer" style="background-color:#f1f1f1">
                    <button type="button" onclick="document.getElementById('create-card-popup').style.display='none'" class="popup-cancelbtn">Cancel</button>

                    <button id="save-button" class="card-button" type="button">Save</button>
                    <button id="save-and-edit" class="card-button" type="button">Save and edit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="own-cards card">

    </div>

</div>
</body>
<script src="../../source/js/editzone/movmentCollision/movmentCollisionController.js"></script>
<script src="../../source/external/jquery-3.3.1.min.js"></script>
<script src="../../home-source/cards/js/createCard.js"></script>
<script src="../../source/js/cardoperations/basicCardOperations.js"></script>
<script src="../../source/js/cardoperations/cardOperationEventHandeler.js"></script>
<script src="../../home-source/cards/js/currentCardsController.js"></script>
<script>


var cardDataFile = "../../home-source/cards/cardData.php";
// Get the modal


//document.getElementById('id01').style.display='block';
// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
    var popups = document.getElementsByClassName("popup");

    for (var i = 0; i < popups.length; i++) {
        if (event.target == popups[i]) {
            popups[i].style.display = "none";
        }
    }
}

window.onkeydown = function(event) {
    if (event.keyCode == 13 || event.keyCode == 27) {
        var popups = document.getElementsByClassName("popup");
        for (var i = 0; i < popups.length; i++) {
                popups[i].style.display = "none";
        }
    }
}
</script>
</html>

