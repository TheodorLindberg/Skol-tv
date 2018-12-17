function EditZoneResizeEvent(event) {
    var editZone = window.editZone;
    editZone.updateEditZone();
}

function EditZoneMouseDownEvent(event) {
    var editZone = window.editZone;
    var editZoneCanvas = editZone.editZoneCanvas;
    var insideEditCanvas = false;
    if (event.target.classList.contains("editzone-element") || editZoneCanvas == event.target) {
        insideEditCanvas = true;
    }

    if (card = getElement(event.target)) {
        if (editZone.activeCard) {
            editZone.activeCard.activate(false);
        }
        card.activate(true);
        editZone.activeCard = card;
    } else if (editZone.activeCard) {
        editZone.activeCard.activate(false);
    }

    switch (editZone.state) {
        case STATE_CREATING_ELEMENT:
            editZone.creationElementHandeler.onMouseDown(event, insideEditCanvas);
            break;
        default:
            editZone.elementList.forEach(element => {
                if (element.shouldUpdate()) {
                    element.onMouseDown(event);
                }
            });
    }
}

function EditZoneMouseMoveEvent(event) {
    var editZone = window.editZone;
    var editZoneCanvas = editZone.editZoneCanvas;
    var insideEditCanvas = false;

    if (event.target.classList.contains("editzone-element") || editZoneCanvas == event.target) {
        insideEditCanvas = true;
    }

    switch (editZone.state) {
        case STATE_CREATING_ELEMENT:
            editZone.creationElementHandeler.onMouseMove(event, insideEditCanvas);
            break;
        default:
            editZone.elementList.forEach(element => {
                if (element.shouldUpdate()) {
                    element.onMouseMove(event);
                }
            });
    }
}

function EditZoneMouseUpEvent(event) {
    var editZone = window.editZone;
    var editZoneCanvas = editZone.editZoneCanvas;
    var insideEditCanvas = false;

    if (event.target.classList.contains("editzone-element") || editZoneCanvas == event.target) {
        insideEditCanvas = true;
    }

    switch (editZone.state) {
        case STATE_CREATING_ELEMENT:
            editZone.creationElementHandeler.onMouseUp(event, insideEditCanvas, null);
            break;
        default:
            editZone.elementList.forEach(element => {
                if (element.shouldUpdate()) {
                    element.onMouseUp(event);
                }
            });
    }
}

function getElement(element) {
    while (!element.classList.contains("element-card")) {
        element = element.parentElement;
        if (element === document.body) {
            return false;
        }
    }
    return element.card;
}