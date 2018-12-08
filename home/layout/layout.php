<?php
session_start();
if (!isset($_SESSION['u_id'])) {
    header("Location: ../../");
}
$TO_HOME_DIR = "../../";

require "../../home-source/layout/layoutData.php";
$layout = new LayoutData;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layoutport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../source/css/cards.css">
    <link rel="stylesheet" href="../../source/css/popup.css">
    <link rel="stylesheet" href="../../home-source/layout/css/currentLayouts.css">
    <title>Document</title>
</head>
<body>
    <?php include "../header.php";?>
    
<div class="cards" >
    <div class="layout-list card">
        
        <div id="information-popup-container">    
        </div>

        <h1>Layouts</h1>
        <h2>Nuvarande layout</h2>
        <div class="current-layout-container" id="active-layout-container"> 
            <?php $layout->printActiveLayout()?>
        </div>
        <h2>Layouts</h2>
        <div class="layouts-container" id="layouts-container"> 
            <?php $layout->printLayouts()?>
        </div>
    </div>

    <div class="card">
        <h1>Skapa Layout</h1>
        <button id="create-new-view-button" onclick="document.getElementById('create-layout-popup').style.display='block'">Skapa en layout</button>
        <div class="popup" id="create-layout-popup">    
         <div class="popup-content popup-animate" >
            <div class="popup-topSection">
                <span onclick="document.getElementById('create-layout-popup').style.display='none'" class="popup-close" title="Close Modal">&times;</span>
            </div>
            <div class="popup-container">
                <h1>Skapa en layouten</h1>

                <label for="create-layout-name">Namn på layouten</label>
                <br>
                <input type="text" name="create-layout-name" id="create-layout-name">
                <br>
                <br>
                <label for="create-layout-description">Beskrivning av layouten</label>
                <br>
                <textarea type="text" name="create-layout-description" id="create-layout-description" cols="30" rows="10"></textarea>
            </div>
            <div class="popup-footer">
                <button id="create-layout-button">Skapa</button>
                <button id="create-layout-exit-button">Skapa och börja redigera</button>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <h1>Förhandsvisning av nuvarande Layout</h1>
    </div>

</div>
</body>
<script src="../../source/js/layoutoperations/layoutOptionsEventHandeler.js"></script>
<script src="../../home-source/layout/js/layoutHome.js"></script>
<script>
    
    var layoutDataFile = "../../home-source/layout/layoutData.php";
</script>

</html>