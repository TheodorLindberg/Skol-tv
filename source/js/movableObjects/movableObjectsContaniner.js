function MovableObjectsContainer() {
    this.objects = new Array();
    this.MarkedElement = false;
    this.resizing = false;
    this.dragging = false;
    this.onObjectMarked = false;
    this.onObjectUnMarked = false;
    this.addElement = function(name, top, bottom, left, right) {
        if (this.MarkedElement != false) {
            this.MarkedElement.element.element.getElementsByClassName("HoverContent")[0].style.display = "none";
        }
        console.log(left);
        var addingelement = new movableObject([false, false], getDefaultConfig(), top, bottom, left, right);
        addingelement.updatePost();


        this.objects.push({ name: name, element: addingelement });
        this.MarkedElement = this.GetElementFromElement(addingelement.element);
        console.log(this.MarkedElement);
        this.MarkedElement.element.element.getElementsByClassName("HoverContent")[0].style.display = "block";
        this.onObjectMarked(this.MarkedElement);
        return addingelement.element;
    }
    this.GetElement = function(name) {
        this.objects.forEach(element => {
            if (element.name == name) {
                return element;
            }
        });
    }
    this.GetElementFromElement = function(elementin) {
        var found;
        this.objects.forEach(element => {
            if (element.element.element == elementin) {
                //Second element = objects and second is the element inside the element
                found = element;
                return;
            }
        });
        return found;
    }
    this.GetMarkedElement = function() {
        if (this.MarkedElement != false) {
            return this.MarkedElement;
        } else {
            return false;
        }
    }
    this.deleteElement = function(elementin) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].element.element == elementin) {
                this.objects[i].element.element.remove();
                this.objects.splice(i, 1);
            }
        }
    }
    this.setup = function() {
        document.getElementById("WorkArea").addEventListener("mousedown", function(event) {

            if (event.target == document.getElementById("WorkArea")) {
                if (movableObjects.MarkedElement != false) {

                    movableObjects.MarkedElement.element.element.getElementsByClassName("HoverContent")[0].style.display = "none";
                    if (movableObjects.onObjectUnMarked != false) {
                        movableObjects.onObjectUnMarked(element);
                    }
                }

                movableObjects.MarkedElement = false;
                return;
            }
            var InteractParent = GetParent(event.target, ".interact");

            if (movableObjects.MarkedElement != false) {

                if (InteractParent != movableObjects.MarkedElement.element.element) {
                    console.log(movableObjects.MarkedElement.element.element);
                    movableObjects.MarkedElement.element.element.getElementsByClassName("HoverContent")[0].style.display = "none";
                    movableObjects.MarkedElement = false;
                    if (movableObjects.onObjectUnMarked != false) {
                        movableObjects.onObjectUnMarked(element);
                    }
                }
            }
            movableObjects.MarkedElement = movableObjects.GetElementFromElement(InteractParent);
            movableObjects.MarkedElement.element.element.getElementsByClassName("HoverContent")[0].style.display = "block";
            if (movableObjects.onObjectMarked != false) {
                movableObjects.onObjectMarked(movableObjects.MarkedElement.element.element);
            }
            var Classes = event.target.getAttribute("class");
            if (Classes.search("interact") != -1) {
                console.log(Classes);
                var element = movableObjects.GetElementFromElement(InteractParent).element;
                element.obj.dragright = false;
                element.obj.dragleft = false;
                element.obj.dragbottom = false;
                element.obj.dragtop = false;
                if (Classes.search("Right") != -1) {
                    element.obj.dragright = true;
                    movableObjects.resizing = true;
                } else if (Classes.search("Left") != -1) {
                    element.obj.dragleft = true;
                    movableObjects.resizing = true;
                }
                if (Classes.search("Top") != -1) {
                    element.obj.dragtop = true;
                    movableObjects.resizing = true;
                } else if (Classes.search("Bottom") != -1) {
                    element.obj.dragbottom = true;
                    movableObjects.resizing = true;
                }


            } else {
                movableObjects.dragging = true;
                var element = movableObjects.GetElementFromElement(InteractParent).element;

                element.obj.lastX = event.clientX;
                element.obj.lastY = event.clientY;
                movableObjects.MarkedElement = movableObjects.GetElementFromElement(InteractParent);

            }
        });

        window.addEventListener("mousemove", function(event) {
            if (movableObjects.dragging) {
                movableObjects.MarkedElement.element.drag(event);
            } else if (movableObjects.resizing) {
                movableObjects.MarkedElement.element.resize(event);
            }
        });

        window.addEventListener("mouseup", function(event) {
            movableObjects.resizing = false;
            movableObjects.dragging = false;
            var divRect = document.getElementById('WorkArea').getBoundingClientRect();
            /* if (!(event.clientX >= divRect.left && event.clientX <= divRect.right &&
                     event.clientY >= divRect.top && event.clientY <= divRect.bottom)) {
                 if (objects.MarkedElement != false) {
                     objects.MarkedElement.element.element.getElementsByClassName("HoverContent")[0].style.display = "none";
                 }
                 objects.MarkedElement = false;
             }*/
        });

        window.addEventListener("keydown", function(event) {
            if (event.keyCode == 8) {
                this.console.log("backspace clicked");
                this.console.log(mousePos.y);
                if (movableObjects.MarkedElement != false && mousePos.y > 120) {
                    this.console.log("backspace removing");
                    movableObjects.deleteElement(movableObjects.MarkedElement.element.element);
                    movableObjects.onObjectUnMarked(movableObjects.MarkedElement.element.element);
                }

            }
        });
    }

}

window.addEventListener("mousemove", function(event) {
    mousePos = { "x": event.clientX, "y": event.clientY };
});

var mousePos;
var movableObjects = new MovableObjectsContainer();
movableObjects.setup();