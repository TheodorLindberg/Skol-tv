//This is a function that handels most of the users input to the editZone
function EditZoneController(editZone) {
    this.editZone = editZone;

    this.activateCreateElement = function(creationHandeler) {
        if (!creationHandeler) {
            creationHandeler = new DefaultCreationHandeler(this.editZone, document.getElementById("resizingOBJ"));
        }

        this.editZone.state = STATE_CREATING_ELEMENT;
        this.editZone.creationElementHandeler = creationHandeler;
        console.log("Activate shape creation with creation handeler: " + creationHandeler.getCreationHandelerType());

        this.editZone.editZoneCanvas.style.cursor = "crosshair";
    }
}