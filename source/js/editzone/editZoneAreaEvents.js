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
        editZone.moveToTopHierarchy(card.getElement());
        editZone.activeCard = card;
        console.log(card.getGlobalBounds());
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

function EditZoneKeyPressEvent(event) {

    var editZone = window.editZone;
    switch (event.keyCode) {
        case 8:
            if (editZone.activeFocusOnCard) {
                editZone.activeCard.delete();
                for (var i = 0; i < editZone.elementList.length; i++) {
                    if (editZone.elementList[i] == editZone.activeCard) {
                        editZone.elementList.splice(i, 1);
                    }
                }
            }
            break;

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