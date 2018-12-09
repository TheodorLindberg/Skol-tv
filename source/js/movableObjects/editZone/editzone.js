function updateEditZone() {
    var marginTop = 15;
    var marginBottom = 20;
    var marginLeft = 30;
    var marginRight = 30;
    document.getElementById("WorkArea").style.marginTop = 0;
    document.getElementById("WorkArea").style.marginBottom = 0;
    document.getElementById("WorkArea").style.marginLeft = 0;
    document.getElementById("WorkArea").style.marginRight = 0;
    //Get the view port hight and width
    var neededHeight = 106;
    var neededWidth = 0;
    var w = Math.max(document.documentElement.clientWidth - neededWidth, (window.innerWidth - neededWidth) || 0);
    var h = Math.max(document.documentElement.clientHeight - neededHeight, (window.innerHeight - neededHeight) || 0);
    var maxWidth = w;
    h -= marginBottom + marginTop;
    w -= marginLeft + marginRight;
    if (h / 9 < w / 16) {
        w = (h / 9) * 16;
        h = (w / 16) * 9;
    } else {
        h = (w / 16) * 9;
        w = (h / 9) * 16;
    }

    document.getElementById("WorkArea").style.marginTop = marginTop;
    document.getElementById("WorkArea").style.marginLeft = (maxWidth - w) / 2;



    document.getElementById("WorkArea").style.width = w + "px";
    document.getElementById("WorkArea").style.height = h + "px";



}
updateEditZone();

window.onclick = function(event) {
    if (event.target == CreateTheme) {
        CreateTheme.style.display = "none";
    }
}


var CreateTheme = document.getElementById('id01');
var CreateThemeSelector = document.getElementById("themeSelector");

CreateThemeSelector.onchange = function() {
    if (CreateThemeSelector.value == "CreateTheme") {
        CreateTheme.style.display = "block";
    }
}

var CreateShape = document.getElementById("CreateShape");

CreateShape.addEventListener("click", function(event) {
    document.getElementById("WorkArea").style.cursor = "crosshair";

});
var DragStartX = 0;
var DragStartY = 0;
var Dragging = false;

movableObjects.onObjectMarked = function(element) {
    document.getElementsByClassName("settingsForColor")[0].style.display = "block";
}
movableObjects.onObjectUnMarked = function(element) {
    document.getElementsByClassName("settingsForColor")[0].style.display = "none";
}

document.getElementById("ElementbackgroundColorPicker").addEventListener("change", function(event) {
    movableObjects.MarkedElement.element.element.style.backgroundColor = document.getElementById("ElementbackgroundColorPicker").value;
});
document.getElementById("borderWidth").addEventListener("change", function(event) {
    if (String(document.getElementById("borderWidth").value).search("px") != -1) {
        movableObjects.MarkedElement.element.element.style.borderWidth = document.getElementById("borderWidth").value;
    } else {
        var value = parseInt(document.getElementById("borderWidth").value, 10) + "px";
        movableObjects.MarkedElement.element.element.style.borderWidth = value;
    }
});
document.getElementById("borderRadius").addEventListener("change", function() {
    if (String(document.getElementById("borderRadius").value).search("px") != -1) {
        console.log(document.getElementById("borderRadius").value);
        movableObjects.MarkedElement.element.element.style.borderRadius = document.getElementById("borderRadius").value;
    } else {
        var value = parseInt(document.getElementById("borderRadius").value, 10) + "px";
        movableObjects.MarkedElement.element.element.style.borderRadius = value;

    }
});
document.getElementById("borderColor").addEventListener("change", function(event) {
    movableObjects.MarkedElement.element.element.style.borderColor = document.getElementById("borderColor").value;
});
document.getElementById("backgroundColorPicker").addEventListener("change", function(event) {
    document.getElementById("WorkArea").style.backgroundColor = document.getElementById("backgroundColorPicker").value;
});

document.getElementById("WorkArea").addEventListener("mousedown", function(event) {
    if (document.getElementById("WorkArea").style.cursor == "crosshair") {
        DragStartX = event.clientX;
        DragStartY = event.clientY;
        document.getElementById("resizingOBJ").style.display = "block";
        document.getElementById("resizingOBJ").style.left = DragStartX;
        document.getElementById("resizingOBJ").style.top = DragStartY;
        Dragging = true;
        console.log("hi");
    }
});

document.body.addEventListener("mousemove", function(event) {
    if (Dragging) {
        document.getElementById("resizingOBJ").style.width = event.clientX - DragStartX;
        document.getElementById("resizingOBJ").style.height = event.clientY - DragStartY;
    }
});

window.addEventListener("resize", function(event) {
    updateEditZone();
});

document.body.addEventListener("mouseup", function(event) {
    if (Dragging) {
        Dragging = false;
        document.getElementById("WorkArea").style.cursor = "auto";
        document.getElementById("resizingOBJ").style.display = "none";
        var element = document.getElementById("resizingOBJ");
        var left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10) - document.getElementById("WorkArea").getBoundingClientRect().left;
        var top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10) - document.getElementById("WorkArea").getBoundingClientRect().top;
        var right = parseInt(getComputedStyle(element, null).getPropertyValue('width'), 10) + left;
        var bottom = parseInt(getComputedStyle(element, null).getPropertyValue('height'), 10) + top;

        var Added = movableObjects.addElement("Shape", top, bottom, left, right);
        Added.style.backgroundColor = "grey";
    }
});

$("#add-layout").click(function(event) {
    $("#import-layout-popup").show();
});