function MovableObjConfig(ratio, resize, drag) {
    this.ratio = ratio;
    this.resize = resize;
    this.drag = drag;
}
var MOVABLEOBJ_STATE_UNINITIALIZED = -1;
var MOVABLEOBJ_STATE_DISPLAY = 1;
var MOVABLEOBJ_STATE_ACTIVE = 2;

function getDefaultObjConfig() { return new MovableObjConfig({ "w": 16, "h": 9 }, true, true) }

function MovableObj(HTMLelement, obj, config, location) {
    this.element = HTMLelement;
    this.obj = obj;
    this.config = config;
    this.location = location; //{"left", "right", "top", "bottom"}
    this.dragPoints = { "left": false, "right": false, "top": false, "bottom": false };
    this.lastX = 0;
    this.lastY = 0;

    this.state = MOVABLEOBJ_STATE_UNINITIALIZED;

    this.resizing = false;
    this.dragging = false;

    this.init = function() {
        this.state = MOVABLEOBJ_STATE_DISPLAY;
        this.element.movableObj = this;
        this.element.addEventListener("mousedown", MovableObjMouseDown, false);

        $(this.element).append(getElementWidthMovePoint());
        this.activate(false);
        this.updateElement();
    }
    this.fixMovePoints = function() {
        var innerWidth = parseInt(this.element.style.width);
        var innerHeight = parseInt(this.element.style.height);

        var outerWidth = this.element.offsetWidth;

        var borderWidth = (outerWidth - innerWidth) / 2;

        var markerLeft = -(borderWidth / 2); //Since it is realative to the actuall object not border or anything else
        var markerTop = -(borderWidth / 2);
        var markerWidth = innerWidth + borderWidth; //Actully ( innerWidth + (half border width * 2) ) but just writing borderWidth will be faster
        var markerHeight = innerHeight + borderWidth;

        var markerOutlineBorderWidth = parseInt(getComputedStyle(this.element.getElementsByClassName("HoverContent")[0], null).getPropertyValue('border-left-width'), 10);

        var markerOutlineLeft = markerLeft - markerOutlineBorderWidth / 2;
        var markerOutlineTop = markerTop - markerOutlineBorderWidth / 2;

        var markerOutlineWidth = markerWidth - markerOutlineBorderWidth;
        var markerOutlineHeight = markerHeight - markerOutlineBorderWidth;

        var movePointsOutlineElement = this.element.getElementsByClassName("HoverContent")[0];

        movePointsOutlineElement.style.left = markerOutlineLeft + "px";
        movePointsOutlineElement.style.top = markerOutlineTop + "px";

        movePointsOutlineElement.style.width = markerOutlineWidth + "px";
        movePointsOutlineElement.style.height = markerOutlineHeight + "px";

        var markerOutlineButtonWidth = 10;

        var left = (markerOutlineWidth - markerOutlineButtonWidth) / 2;
        var top = (markerOutlineHeight - markerOutlineButtonWidth) / 2;

        this.element.getElementsByClassName("Top")[0].style.left = left + "px";
        this.element.getElementsByClassName("Bottom")[0].style.left = left + "px";
        this.element.getElementsByClassName("Left")[0].style.top = top + "px";
        this.element.getElementsByClassName("Right")[0].style.top = top + "px";
    }
    this.cleanUp = function() {
        this.element.remove();
    }
    this.activate = function(show) {
        var display = (show ? "block" : "none");
        this.state = (show ? MOVABLEOBJ_STATE_ACTIVE : MOVABLEOBJ_STATE_DISPLAY);
        this.element.getElementsByClassName("HoverContent")[0].style.display = display;
    }
    this.getGlobalBounds = function() {
        var top = parseInt(this.location.top); //- parseInt(getComputedStyle(this.element, null).getPropertyValue('border-top-width'), 10);
        var left = parseInt(this.location.top); //- parseInt(getComputedStyle(this.element, null).getPropertyValue('border-left-width'), 10);

        var bottom = top + this.element.offsetHeight;
        var right = left + this.element.offsetWidth;

        return { "top": top, "left": left, "bottom": bottom, "right": right };
    }
    this.shouldUpdate = function() {
        return this.state == MOVABLEOBJ_STATE_ACTIVE;
    }
    this.delete = function() {
        this.element.remove();
    }
    this.updateElement = function() {
        this.element.style.top = Math.min(this.location.top, this.location.bottom) + "px";
        this.element.style.left = Math.min(this.location.left, this.location.right) + "px";
        this.element.style.width = Math.max(this.location.left - this.location.right, this.location.right - this.location.left) + "px";
        this.element.style.height = Math.max(this.location.top - this.location.bottom, this.location.bottom - this.location.top) + "px";
        this.fixMovePoints();
    }
    this.onMouseDown = function(event) {
        //This event is handeld internally
    }
    this.onMouseMove = function(event) {
        MovableObjMouseMove(event, this);
    }
    this.onMouseUp = function(event) {
        MovableObjMouseUp(event, this);
    }
}

function MovableObjMouseDown(event) {
    var movableObj = getMovableObj(event.target);
    var dragPoints = movableObj.dragPoints;

    var Classes = event.target.getAttribute("class");
    if (Classes.search("interact") != -1) {
        dragPoints = { "left": false, "right": false, "top": false, "bottom": false };
        if (Classes.search("Left") != -1) {
            dragPoints.left = true;
            movableObj.resizing = true;
        }
        if (Classes.search("Right") != -1) {
            dragPoints.right = true;
            movableObj.resizing = true;
        }
        if (Classes.search("Top") != -1) {
            dragPoints.top = true;
            movableObj.resizing = true;
        }
        if (Classes.search("Bottom") != -1) {
            dragPoints.bottom = true;
            movableObj.resizing = true;
        }

        movableObj.lastX = event.clientX;
        movableObj.lastY = event.clientY;
        movableObj.dragPoints = dragPoints;
    } else if (Classes.search("HoverContent") != -1) {
        movableObj.dragging = true;
        movableObj.lastX = event.clientX;
        movableObj.lastY = event.clientY;
    }


}

function MovableObjMouseUp(event, movableObj) {
    movableObj.dragging = false;
    movableObj.resizing = false;
}

function MovableObjMouseMove(event, movableObj) {
    if (movableObj.dragging) {
        var velX = event.clientX - movableObj.lastX;
        var velY = event.clientY - movableObj.lastY;
        movableObj.lastY = event.clientY;
        movableObj.lastX = event.clientX;

        movableObj.location.left += velX;
        movableObj.location.right += velX;
        movableObj.location.bottom += velY;
        movableObj.location.top += velY;

        movableObj.updateElement();
    } else if (movableObj.resizing == true) {
        var dragPoints = movableObj.dragPoints;
        var location = movableObj.location;

        var mousePos = removeAllPadding({ x: event.clientX, y: event.clientY }, movableObj.element.parentElement, movableObj.element);
        if (dragPoints.right || dragPoints.left) {
            MoveAlongX(location, dragPoints.left, dragPoints.right, mousePos.x);
        }
        if (dragPoints.bottom || dragPoints.top) {
            MoveAlongY(location, dragPoints.top, dragPoints.bottom, mousePos.y);

        }
        movableObj.location = location;
        movableObj.updateElement();
    }
}

function MoveAlongX(location, Dleft, Dright, mouse) {
    var Width;
    var Left;

    if (Dright) {
        if (location.right > location.left) {
            location.right = mouse;
            Width = location.right - location.left;
        } else {
            location.right = mouse;
            Width = location.left - location.right;
            Left = location.right;
        }
    } else if (Dleft) {
        if (location.left < location.right) {
            location.left = mouse;
            Width = location.right - location.left;
            Left = location.left;
        } else {
            location.left = mouse;
            Width = location.left - location.right;
        }
    }
    return location;
}

function MoveAlongY(location, Dtop, Dbottom, mouse) {
    var height;
    var top;
    if (Dbottom) {
        if (location.bottom > location.top) {

            location.bottom = mouse;
            height = location.bottom - location.top;
        } else {

            location.bottom = mouse;
            height = location.top - location.bottom;
            top = location.bottom;
        }
    } else if (Dtop) {
        if (location.top < location.bottom) {
            location.top = mouse;
            height = location.bottom - location.top;
            top = location.top;

        } else {
            location.top = mouse;
            height = location.top - location.bottom;
        }
    }
    return location;
}

function removeAllPadding({ x, y }, editZoneElement, element) {
    var bounds = editZoneElement.getBoundingClientRect();
    var borderWidth = parseInt(getComputedStyle(element, null).getPropertyValue('border-left-width'), 10);
    return { x: x - bounds.left - borderWidth, y: y - bounds.top - borderWidth };

}

function getMovableObj(element) {
    while (!element.movableObj) {
        element = element.parentElement;
    }
    return element.movableObj;
}

function getElementWidthMovePoint() {
    var elem = $(
        '<div class="HoverContent">' +

        '<div class="TopLeft interactMovePoint"></div>' +
        '<div class="TopRight interactMovePoint"></div>' +
        '<div class="BottomLeft interactMovePoint"></div>' +
        '<div class="BottomRight interactMovePoint"></div>' +

        '<div class="Top interactMovePoint"></div>' +
        '<div class="Right interactMovePoint"></div>' +
        '<div class="Left interactMovePoint"></div>' +
        '<div class="Bottom interactMovePoint"></div>' +

        '</div>');
    return elem;
}