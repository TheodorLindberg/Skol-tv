function MovmentCollisionConfig(fixtoedges, fixtoobj, snaptoobj) {
    this.fixtoedges = fixtoedges; //If it should fix to the editzone canvas borders
    this.fixtoobj = fixtoobj; //IF it should allow overlapping elements
    this.snaptoobj = snaptoobj; //distance to element snapping
}

function GetDefaultMovmentCollisionConfig() { return new MovmentCollisionConfig(true, true, 10); }

function DefaultMovmentCollisionController(editZone, element) {

    this.editZone = editZone;
    this.element = element;
    this.config = GetDefaultMovmentCollisionConfig();

    this.updateConfig = function(config) {
        this.config = config;
    }

    this.handleMovment = function(clip, leftMove, rightMove, topMove, bottomMove) {
        var elementBounds = this.element.getGlobalBounds();
        var editZoneBounds = this.editZone.getLocalBounds();

        //console.log(elementBounds);

        var insideEditZone = containsRect(elementBounds, editZoneBounds);
        if (!insideEditZone) {
            if (clip) { //Instead of moving the element we just change the size and clips it to the editzone borders
                if (leftMove) {
                    elementBounds.left = editZoneBounds.left;
                }
                if (rightMove) {
                    elementBounds.right = editZoneBounds.right;
                }
                if (topMove) {
                    elementBounds.top = editZoneBounds.top;
                }
                if (bottomMove) {
                    elementBounds.bottom = editZoneBounds.bottom;
                }
            } else { //This means we will have to move the obj
                var xMove = 0;
                var yMove = 0;
                /*        if (leftMove) {
                    xMove = elementBounds.left - editZoneBounds.left;
                }
                if (rightMove) {
                    xMove = -(elementBounds.right - editZoneBounds.right);
                }
                if (topMove) {
                    yMove = elementBounds.top - editZoneBounds.top;
                }
                if (bottomMove) {
                    yMove = -(elementBounds.bottom - editZoneBounds.bottom);
                } */
                if (elementBounds.left < editZoneBounds.left) {
                    xMove = editZoneBounds.left - elementBounds.left;
                } else if (elementBounds.right > editZoneBounds.right) {
                    xMove = editZoneBounds.right - elementBounds.right;
                }
                if (elementBounds.top < editZoneBounds.top) {
                    yMove = editZoneBounds.top - elementBounds.top;
                } else if (elementBounds.bottom > editZoneBounds.bottom) {
                    yMove = editZoneBounds.bottom - elementBounds.bottom;
                }
                elementBounds = translateRect(elementBounds, xMove, yMove);
            }
        }
        for (var i = 0; i < this.editZone.elementList.length; i++) {
            if (this.editZone.elementList[i] == this.element) {
                continue;
            }

            var otherBounds = this.editZone.elementList[i].getGlobalBounds();
            console.log("BOUNDS");
            console.log({ otherBounds, elementBounds });
            if (overlapRect(elementBounds, otherBounds)) {
                console.log("OVERLAPPING");


                var xMove = 0;
                var yMove = 0;

                if (elementBounds.left < otherBounds.right && elementBounds.right > otherBounds.right) {
                    xMove = otherBounds.right - elementBounds.left;
                }
                if (elementBounds.right > otherBounds.left && elementBounds.left < otherBounds.left) {
                    xMove = otherBounds.left - elementBounds.right;
                }

                if (elementBounds.top < otherBounds.bottom && elementBounds.bottom > otherBounds.bottom) {
                    yMove = otherBounds.bottom - elementBounds.top;
                }
                if (elementBounds.bottom > otherBounds.top && elementBounds.top < otherBounds.top) {
                    yMove = otherBounds.top - elementBounds.bottom;
                }
                console.log({ xMove, yMove });
                elementBounds = translateRect(elementBounds, xMove, yMove);
            }

        }

        return elementBounds;
    }
}

function translateRect(rect, x, y) {
    return { left: rect.left + x, right: rect.right + x, top: rect.top + y, bottom: rect.bottom + y };
}

/*
var elementBounds = element.getGlobalBounds();
        var editZoneBounds = this.editZone.getLocalBounds();

        var notOutside = isInside(elementBounds, editZoneBounds);
        console.log(editZoneBounds);
        console.log(notOutside);
*/
function overlapRect(rect, rect2) {


    return rect.top < rect2.bottom && rect.bottom > rect2.top &&
        rect.left < rect2.right && rect.right > rect2.left;
}

function containsRect(obj, other) {
    if (obj.left > other.left && obj.right < other.right && obj.top > other.top && obj.bottom < other.bottom) {
        return true;
    }
    return false;
}