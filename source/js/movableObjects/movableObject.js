function movableObject(Dims, config, topIn, bottomIn, leftIn, rightIn) {
    this.startDims = { "x": rightIn - leftIn, "y": bottomIn - topIn };
    this.config = config;
    this.element = GetNewObj();
    this.obj = { top: topIn, bottom: bottomIn, left: leftIn, right: rightIn, dragleft: false, dragright: false, dragtop: false, dragbottom: false, lastX: 0, lastY: 0 };
    console.log(this.obj);
    this.dragging = false;
    this.resizing = false;

    $("#WorkArea").append(this.element);
    this.element = this.element[0];

    this.fixDistanceFromMovePoints = function() {
        var borderWidth = parseInt(getComputedStyle(this.element, null).getPropertyValue('border-left-width'), 10);
        var totalWidth = this.element.offsetWidth - borderWidth * 2;
        var totalHeight = this.element.offsetHeight - borderWidth * 2;
        var MovePointsDim = this.element.getElementsByClassName("interactMovePoint")[0].offsetWidth;
        var left = (totalWidth - MovePointsDim) / 2;
        var top = (totalHeight - MovePointsDim) / 2;
        this.element.getElementsByClassName("Top")[0].style.left = left + "px";
        this.element.getElementsByClassName("Bottom")[0].style.left = left + "px";
        this.element.getElementsByClassName("Left")[0].style.top = top + "px";
        this.element.getElementsByClassName("Right")[0].style.top = top + "px";
    }
    this.updatePost = function() {
        this.element.style.top = Math.min(this.obj.top, this.obj.bottom) + "px";
        this.element.style.left = Math.min(this.obj.left, this.obj.right) + "px";
        this.element.style.width = Math.max(this.obj.left - this.obj.right, this.obj.right - this.obj.left) + "px";
        this.element.style.height = Math.max(this.obj.top - this.obj.bottom, this.obj.bottom - this.obj.top) + "px";
        this.fixDistanceFromMovePoints();
    }
    this.drag = function(event) {
        var VelX = event.clientX - this.obj.lastX;
        var VelY = event.clientY - this.obj.lastY;
        this.obj.lastY = event.clientY;
        this.obj.lastX = event.clientX;
        this.obj.left += VelX;
        this.obj.right += VelX;
        this.obj.bottom += VelY;
        this.obj.top += VelY;
        keepWithin(this.obj, ConvertRectToLocal(document.getElementById("WorkArea").getBoundingClientRect()));
        this.element.style.top = Math.min(this.obj.top, this.obj.bottom) + "px";
        this.element.style.left = Math.min(this.obj.left, this.obj.right) + "px";
        this.element.style.width = Math.max(this.obj.left - this.obj.right, this.obj.right - this.obj.left) + "px";
        this.element.style.height = Math.max(this.obj.top - this.obj.bottom, this.obj.bottom - this.obj.top) + "px";
    }
    this.resize = function(event) {
        if (this.obj.dragright || this.obj.dragleft) {
            MoveAlongX(this.element, this.obj, this.obj.dragleft, this.obj.dragright);
        }
        if (this.obj.dragbottom || this.obj.dragtop) {
            MoveAlongY(this.element, this.obj, this.obj.dragtop, this.obj.dragbottom);
        }
        this.fixDistanceFromMovePoints();
    }
};

function GetParent(child, parentClassID) {
    var i = 0;
    var currentParent = child;
    while (!currentParent.matches(parentClassID)) {
        currentParent = currentParent.parentElement;
        i++;
    }
    console.log(i);
    return currentParent;
}

function GetNewObj() {
    var elem = $('<div class="interact">' +
        '<div class="interact-element-content"></div>' +
        '<div class="HoverContent">' +
        '<div class="TopLeft interactMovePoint"></div>' +
        '<div class="TopRight interactMovePoint"></div>' +
        '<div class="BottomLeft interactMovePoint"></div>' +
        '<div class="BottomRight interactMovePoint"></div>' +

        '<div class="Top interactMovePoint"></div>' +
        '<div class="Right interactMovePoint"></div>' +
        '<div class="Left interactMovePoint"></div>' +
        '<div class="Bottom interactMovePoint"></div>' +

        '</div></div>');
    return elem;
}

function keepWithin(object, bounds) {
    var width = Math.max(object.left - object.right, object.right - object.left);
    var leftSide = Math.min(object.right, object.left);
    if (leftSide < bounds.left) {
        if (object.right < object.left) {
            object.right = bounds.left;
            object.left = object.right + width;
        } else {
            object.left = bounds.left;
            object.right = object.left + width;
        }
    }
    var rightSide = Math.max(object.right, object.left);
    console.log(object);
    console.log(rightSide);
    console.log(bounds.right);
    if (rightSide > bounds.right) {
        if (object.right > object.left) {
            object.right = bounds.right;
            object.left = object.right - width;
        } else {
            object.left = bounds.right;
            object.right = object.left - width;
        }
    }
    var width = Math.max(object.top - object.bottom, object.bottom - object.top);
    var topSide = Math.min(object.bottom, object.top);
    if (topSide < bounds.top) {
        if (object.bottom < object.top) {
            object.bottom = bounds.top;
            object.top = object.bottom + width;
        } else {
            object.top = bounds.top;
            object.bottom = object.top + width;
        }
    }
    var bottomSide = Math.max(object.bottom, object.top);
    console.log(bottomSide);
    console.log(bounds.bottom);
    if (bottomSide > bounds.bottom) {
        if (object.bottom > object.top) {
            object.bottom = bounds.bottom;
            object.top = object.bottom - width;
        } else {
            object.top = bounds.bottom;
            object.bottom = object.top - width;
        }
    }
}

function ConvertRectToLocal(rect) {
    return { top: 0, bottom: (rect.bottom - rect.top), left: 0, right: (rect.right - rect.left) };
}

function MoveAlongX(element, information, Dleft, Dright) {
    var Width;
    var Left;
    var Xmove = event.clientX - element.parentElement.getBoundingClientRect().left;
    if (Dright) {
        if (information.right > information.left) {
            information.right = Xmove;
            Width = information.right - information.left;
        } else {
            information.right = Xmove;
            Width = information.left - information.right;
            Left = information.right;
        }
    } else if (Dleft) {
        if (information.left < information.right) {
            information.left = Xmove;
            Width = information.right - information.left;
            Left = information.left;
        } else {
            information.left = Xmove;
            Width = information.left - information.right;
        }
    }
    element.style.left = Left + "px";
    element.style.width = Width + "px";
}

function MoveAlongY(element, information, Dtop, Dbottom) {
    var height;
    var top;
    var Ymove = event.clientY - element.parentElement.getBoundingClientRect().top;
    if (Dbottom) {
        if (information.bottom > information.top) {

            information.bottom = Ymove;
            height = information.bottom - information.top;
        } else {

            information.bottom = Ymove;
            height = information.top - information.bottom;
            top = information.bottom;
        }
    } else if (Dtop) {
        if (information.top < information.bottom) {
            information.top = Ymove;
            height = information.bottom - information.top;
            top = information.top;

        } else {
            information.top = Ymove;
            height = information.top - information.bottom;
        }
    }
    element.style.top = top + "px";
    element.style.height = height + "px";
}