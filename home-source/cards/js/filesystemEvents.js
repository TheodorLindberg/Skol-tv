function filesystemEventsinit(rootDir, fileSystem) {
    fileSystemEventsObj = fileSystem;

    rootDir.addEventListener("dragstart", function(event) {
        //this.classList.add("filesystem-held");
        sourcePath = getNearestPath(event.target);
    });
    rootDir.addEventListener("dragend", function(event) {
        console.log("File/folder moving to location: " + folderdrag);
        fileStructure.HandleMove(sourcePath, folderdrag);
        markedFolder.classList.remove("filesystem-hovered");
        //this.classList.remove("filesystem-held");

    });

    rootDir.addEventListener("dragover", function(event) {
        event.preventDefault();
    });
    rootDir.addEventListener("dragenter", function(event) {
        var folder = getParentFolder(event.target);
        event.preventDefault();
        if (folder.getAttribute("data-draggable") == "target") {

            folderdrag = folder.getAttribute("path");
            folder.classList.add("filesystem-hovered");
            markedFolder = folder;
        }
    });
    rootDir.addEventListener("dragleave", function(event) {
        var folder = getParentFolder(event.target);

        event.preventDefault();
        if (folder.getAttribute("data-draggable") == "target") {
            if (folderdrag != folder.getAttribute("path")) {
                folder.classList.remove("filesystem-hovered");
            }
        }

    });
    rootDir.addEventListener("drop", function(event) {}, false);
}


function getParentFolder(element) {
    while (!element.classList.contains("folder")) {
        element = element.parentElement;
    }
    return element;
}

function getNearestPath(element) {
    while (!element.hasAttribute("path")) {
        element = element.parentElement;
    }
    return element.getAttribute("path");
}

var fileSystemEventsObj;
var folderdrag = null;
var markedFolder = null;
var sourcePath = null;