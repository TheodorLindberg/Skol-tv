<?php
$TO_HOME_DIR = "../../../";
require "../../../home-source/cards/cardData.php";
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="../../../home-source/layout/css/layoutEdit.css/layoutEdit.css">
    <link rel="stylesheet" href="../../../source/css/movableObjects/workArea.css">
    <link rel="stylesheet" href="../../../source/css/movableObjects/interact.css">
    <link rel="stylesheet" href="../../../source/css/popup.css">
    <link rel="stylesheet" href="../../../source/css/cardView.css">
    <title>Document</title>
</head>

<body>


    <ul class="menu-general menu">
        <img src="../../../source/home/layout/edit/logo.png" alt="" id="menu-general-logo">
        <div class="menu-general-dropdown_naming">
            <div class="menu-general-dropdown_naming-naming">
                <input type="text" placeholder="Enter name">
            </div>
            <div class="menu-general-dropdown_naming-dropdowns">
                <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown menu-dropdown">
                    <button class="menu-general-dropdown_naming-dropdowns-menu-dropbtn menu-dropbtn">Arkivs</button>
                    <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown-content menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>

                    </div>
                </div>
                <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown menu-dropdown">
                    <button class="menu-general-dropdown_naming-dropdowns-menu-dropbtn menu-dropbtn">Infoga</button>
                    <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown-content menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown menu-dropdown">
                    <button class="menu-general-dropdown_naming-dropdowns-menu-dropbtn menu-dropbtn">Redigera</button>
                    <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown-content menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown menu-dropdown">
                    <button class="menu-general-dropdown_naming-dropdowns-menu-dropbtn menu-dropbtn">Hjälp</button>
                    <div class="menu-general-dropdown_naming-dropdowns-menu-dropdown-content menu-dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="menu-general-right">
            <button class="menu-general-upload">Upload</button>
        </div>

    </ul>   

    <div class="menu-editing menu">
        <div class="ME-left generaltools">
            <div class="tooltip">B<span class="tooltiptext">Step back</span></div>
            <div class="tooltip">F<span class="tooltiptext">Step forward</span></div>
            <div class="tooltip">P<span class="tooltiptext">Printt</span></div>
            <div class="tooltip">F<span class="tooltiptext">Format</span></div>
        </div>
        <div class="ME-left zoom">

            <div class="tooltip">Zoom<span class="tooltiptext">Zoom</span></div>
        </div>
        <div class="ME-left shapes">
            <div class="tooltip">C<span class="tooltiptext">Cursor</span></div>
            <div class="tooltip" id="CreateShape">S<span class="tooltiptext">Shape</span></div>
            <div class="tooltip">I<span class="tooltiptext">Image</span></div>
        </div>
        <div class="ME-left generalsettings">
            <div class="tooltip">
                <input id="backgroundColorPicker" type="color" /><span class="tooltiptext">Background</span></div>
            <div class="tooltip">
                <select onchange="themeSelectEvent();" id="themeSelector" type="text" placeholder="General settings">
					<option value="default">Default</option>
					<option value="default">Default blue</option>
					<option value="default">Default grey</option>
					<option value="default">Default white</option>
					<option id="buttonelement" value="CreateTheme">Create theme</option>				</select>
                <span class="tooltiptext">Default settings</span></div>

        </div>
        <div class="ME-left settingsForColor" style="display:none">
            <div class="tooltip">
                <input id="ElementbackgroundColorPicker" type="color" /><span class="tooltiptext">Background</span></div>
            <div class="tooltip">
                <input id="borderWidth" type="text" /><span class="tooltiptext">Border Width</span></div>
            <div class="tooltip">
                <input id="borderColor" type="color" /><span class="tooltiptext">Border color</span></div>
            <div class="tooltip">
                <input id="borderRadius" type="text" /><span class="tooltiptext">Border radius</span></div>
            <div class="tooltip"><button id="add-layout" onclick="document.getElementById('import-layout-popup').style.display='block'">Lägg till en layout</button> <span class="tooltiptext">Add a layout to the object</span></div>
            
           
        </div>
    </div>
    
    <div id="card-information-popup-container">
    </div>

    <div class="popup" id="import-layout-popup">    
        <div class="popup-content popup-animate" >
            <div class="popup-topSection">
                <span onclick="document.getElementById('import-layout-popup').style.display='none'" class="popup-close" title="Close Modal">&times;</span>
            </div>
            <div class="popup-container">
                <h1>Importera en layout</h1>
                <div id="import-card-container">
                    
                <?php
                    $layout = new CardData();
                    $layout->printCardsForImport();
                ?>
                
                </div>
            </div>
        </div>
    </div>


    <!-- The Modal -->
    <div id="id01" class="modal">
        Här kommer du kunna skapa ditt egna tema
    </div>

    <div id="WorkArea">
    </div>
    <div id="resizingOBJ"></div>

</body>
<script type="text/javascript" src="../../../source/external/jquery-3.3.1.min.js"></script>
<script src="../../../source/js/movableObjects/movableObject.js"></script>
<script src="../../../source/js/movableObjects/movableObjectConfig.js"></script>
<script src="../../../source/js/movableObjects/movableObjectsContaniner.js"></script>
<script src="../../../source/js/movableObjects/editZone/editzone.js"></script>
<script src="../../../source/js/cardoperations/basicCardOperations.js"></script>
<script src="../../../source/js/cardoperations/cardOperationEventHandeler.js"></script>
<script src="../../../home-source/layout/js/editLayout/editLayout.js"></script>
<script>
    var layoutDataFile = "../../../home-source/layout/layoutData.php";
    var cardDataFile = "../../../home-source/cards/cardData.php";
    var root = "../../../";
</script>

</html>