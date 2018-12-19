function NormalElement(editZone, location) {
    this.editZone = editZone;

    this.element = null;
    this.controller = null;

    var tempElement = createDefaultElement();
    $(editZone.editZoneCanvas).append(tempElement);
    this.element = tempElement[0];

    this.controller = new MovableObj(this.element, this, getDefaultObjConfig(), location);
    this.controller.init();
    this.element.card = this;

    this.delete = function() {
        this.controller.cleanUp();
    }
    this.setPosition = function(x, y) {

    }
    this.getGlobalBounds = function() {
        return this.controller.getGlobalBounds();
    }
    this.getElement = function() {
        return this.element;
    }
    this.scale = function(x, y) {

    }
    this.activate = function(show) {
        this.controller.activate(show);
    }
    this.shouldUpdate = function() {
        return this.controller.shouldUpdate();
    }

    this.onMouseDown = function(event) {

        this.controller.onMouseDown(event);
    }
    this.onMouseMove = function(event) {
        this.controller.onMouseMove(event);

    }
    this.onMouseUp = function(event) {
        this.controller.onMouseUp(event);
    }
}

function createDefaultElement() {
    var elem = $('<div class="interact element-card">' +
        '<div class="interact-element-content"></div>' +
        '</div>');
    return elem;
}