var EditZoneCanvas = document.getElementById("WorkArea");

var editZone = new EditZone(EditZoneCanvas, { "w": 16, "h": 9 }, GetDefaultMarginConfig());
editZone.init();
var editZoneController = new EditZoneController(editZone);


document.getElementById("CreateShape").addEventListener("click", function(event) {
    editZoneController.activateCreateElement();
}, false);