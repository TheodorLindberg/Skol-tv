function DefaultCreationHandeler(editZone, displayElement) {
    //This needs to be set to true
    this.editZone = editZone;
    this.displayElement = displayElement;

    this.IsCreationHandeler = true;

    this.getCreationHandelerType = function() {
            return "Default creation handeler";
        }
        //Local variables for functions
    this.dragStartX = null;
    this.dragStartY = null;
    this.startedDragging = false;

    //Function to handle events
    //Event, the event
    //isInside, true if event have happend inside the editCanvas
    this.onMouseDown = function(event, isInside) {
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;

        this.displayElement.style.display = "block";
        this.displayElement.style.cursor = "crossair";

        this.displayElement.style.left = this.dragStartX;
        this.displayElement.style.top = this.dragStartY;

        this.displayElement.style.width = 0;
        this.displayElement.style.height = 0;

        this.startedDragging = true;
    }
    this.onMouseMove = function(event, isInside) {
        if (!this.startedDragging) return;
        if (!isInside) return;
        var width = event.clientX - this.dragStartX;
        var height = event.clientY - this.dragStartY;

        var left = this.dragStartX;
        var top = this.dragStartY;

        if (width < 0) {
            left -= Math.abs(width);
            width = Math.abs(width);
        }
        if (height < 0) {
            top -= Math.abs(height);
            height = Math.abs(height);
        }
        this.displayElement.style.left = left;
        this.displayElement.style.top = top;

        this.displayElement.style.width = width;
        this.displayElement.style.height = height;

    }
    this.onMouseUp = function(event, isInside) {
        if (!this.startedDragging) alert("wierd, element did not start creating");

        this.editZone.editZoneCanvas.style.cursor = "auto";

        this.displayElement.style.display = "none";
        var editZoneBounds = this.editZone.editZoneCanvas.getBoundingClientRect();
        var paddingLeft = editZoneBounds.left;
        var paddingTop = editZoneBounds.top;
        var location = {
            "left": parseInt(this.displayElement.style.left) - paddingLeft,
            "right": parseInt(this.displayElement.style.left) + parseInt(this.displayElement.style.width) - paddingLeft,
            "top": parseInt(this.displayElement.style.top) - paddingTop,
            "bottom": parseInt(this.displayElement.style.top) + parseInt(this.displayElement.style.height) - paddingTop
        };
        var newElement = new NormalElement(this.editZone, location);

        this.editZone.elementList.push(newElement);

        this.editZone.state = STATE_READY;
    }
}