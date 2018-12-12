function FileStructure(rootObject, rootName, defaultMargin) {
    this.structure = new Array();
    this.root = root;
    this.rootName = rootName;
    this.defaultMargin = defaultMargin;
    this.addMargin = 10;
    this.activeElement = null;

    var rootBody = createFolderElement(rootName, defaultMargin);
    rootBody.setAttribute("path", "");
    rootBody.setAttribute("data-draggable", "target");
    rootObject.appendChild(rootBody);
    this.structure = { 'id': 1, 'element': rootBody, "parent": null };


    $(rootObject).on("contextmenu", function(event) {
        event.preventDefault();
        var topElement = getParentFolder(event.target);
        var path = topElement.getAttribute("path");
        var element = getPathElement(path, fileStructure.structure)['folder'];

        this.activeElement = element;
        activeFileElement = element;
        console.log(this.activeElement);
        var posX = event.clientX;
        var posY = event.clientY;
        menu(posX, posY);
        event.preventDefault();
    });

    this.getPathElement = function(path) {
        var folders = path.split("/");
        var currentFolder = this.structure;
        var parent = this.structure;

        var level = 1;
        for (var i = 1; i < folders.length; i++) {
            if (!currentFolder[folders[i]]) {
                return false;
            }
            currentFolder = currentFolder[folders[i]];

            if ((i + 1) == folders.length) {
                parent = currentFolder;
            }
            level++;
        }

        return { "folder": currentFolder, "level": level, "parent": parent };

    }
    this.getFolderName = function(path) {
        var folders = path.split("/");
        return folders.pop();
    }
    this.addFolder = function(name, path, focus) {
        var pathToElement = this.getPathElement(path);
        var folder = pathToElement['folder'];
        var level = pathToElement['level'];
        var margin = this.defaultMargin + this.addMargin * level;
        var element = createFolderElement(name, margin);

        element.setAttribute("path", path + "/" + name);

        var elementParent = folder['element'].getElementsByClassName("folder-content")[0];

        elementParent.append(element);
        folder[name] = { "element": element, "id": 1 };
        if (focus) {
            this.selectInput(element);
        }

        console.log("PARENT");
        console.log(pathToElement['parent']);
        console.log(folder[name]);
    }
    this.addFile = function(name, path, focus) {
        var pathToElement = this.getPathElement(path);
        var folder = pathToElement['folder'];
        var level = pathToElement['level'];
        var margin = this.defaultMargin + this.addMargin * level;

        var element = createFileElement(name, margin);
        element.setAttribute("path", path + "/" + name);

        var elementParent = folder['element'].getElementsByClassName("folder-content")[0];

        elementParent.append(element);
        folder[name] = { "element": element, "id": 2 };

        if (focus) {
            this.selectInput(element);
        }
    }
    this.deleteFile = function(Structelement, command) {
        if (!command) {
            if (Structelement['id'] == 1) {
                if (!confirm("Deleting folder will delete all the files and folders under it!")) {
                    return;
                }
            }
        }
        Structelement['element'].remove();
        delete Structelement['element'];
    }
    this.selectInput = function(element) {
        var input = element.getElementsByClassName("name-input")[0];
        input.disabled = false;
        input.focus();
        input.select();
    }
    this.HandleCreateFile = function() {
        var path = activeFileElement['element'].getAttribute("path");

        if (activeFileElement['id'] == 2) {
            var folders = path.split("/");
            folders.pop();
            var path = folders.join("/");
            if (!confirm("File will be added to the folder: " + path)) {
                return;
            }
        }
        console.log(path);
        this.addFile("unamed", path, true);
    }
    this.HandleCreateFolder = function() {
        var path = activeFileElement['element'].getAttribute("path");
        if (activeFileElement['id'] == 2) {
            var folders = path.split("/");
            folders.pop();
            var path = folders.join("/");
            if (!confirm("File will be added to the folder: " + path)) {
                return;
            }
        }
        console.log(path);
        this.addFolder("unamed", path, true);
    }
    this.HandleDeletefile = function() {
        var element = activeFileElement;
        this.deleteFile(element);
    }
    this.HandleopenRenameFile = function() {
        console.log(activeFileElement);
        this.selectInput(activeFileElement['element']);
    }
    this.HandleMove = function(sourcePath, destinationPath) {
        console.log(sourcePath);
        console.log(destinationPath);
        if (sourcePath == destinationPath) {
            alert("file did not move, same location");
        }
        var source = this.getPathElement(sourcePath);
        var sourceFolder = source['folder'];
        var destinationFolder = this.getPathElement(destinationPath)['folder'];

        $(sourceFolder['element']).detach().appendTo(destinationFolder['element']);

        var folderName = this.getFolderName(sourcePath);
        destinationFolder[folderName] = sourceFolder;
        this.updateFolderMarginAndPath(sourceFolder, sourcePath, destinationPath + "/" + folderName);
        assosativeDelete(sourcePath, this.structure);
    }
    this.updateFolderMarginAndPath = function(startElement, pathToReplace, newPathToInsert) {
        for (var key in startElement) {
            if (key == "id") {
                continue;
            } else if (key == "element") {
                var element = startElement[key];
                var path = element.getAttribute("path");
                var newpaths = path.split(pathToReplace);
                newpaths[0] = newPathToInsert;

                var realpath = newpaths.join("");
                element.setAttribute("path", realpath);


                var margin = this.defaultMargin + this.addMargin * (realpath.split("/").length - 1);
                if (element.classList.contains("file-wrapper")) {
                    element.getElementsByClassName("file-name-wrapper")[0].style.marginLeft = margin + "px";

                } else {
                    element.getElementsByClassName("file-wrapper")[0].getElementsByClassName("file-name-wrapper")[0].style.marginLeft = margin + "px";

                }
            } else {
                this.updateFolderMarginAndPath(startElement[key], pathToReplace, newPathToInsert);
            }
        }
    }
}

function assosativeDelete(path, element) {
    //Idk how to do this since there is no pointers, rip javascript. 

    var folders = path.split("/");

    switch (folders.length - 1) {
        case 1:
            delete element[folders[1]];
            break;
        case 2:
            delete element[folders[1]][folders[2]];
            break;

        case 3:
            delete element[folders[1]][folders[2]][folders[3]];
            break;
        case 4:
            delete element[folders[1]][folders[2]][folders[3]][folders[4]];
            break;
        case 5:
            delete element[folders[1]][folders[2]][folders[3]][folders[4]][folders[5]];
            break;
        case 6:
            delete element[folders[1]][folders[2]][folders[3]][folders[4]][folders[5]][folders[6]];
            break;
        default:
            alert("SOMETHING WENT WRONG DELETING FILESYSTEM INTERNAL FILE STRUCTURE MEMORY, CURRENTLY FOLDER DEPTH TO 6 SUPPORTED");
            break;
    }
}

function createFolderElement(name, margin, disableInput) {
    var div = document.createElement("div");
    div.classList.add("folder");
    div.setAttribute("data-draggable", "target");
    div.setAttribute("data-type", "folder");
    div.innerHTML =
        '<div class="file-wrapper folder-type" data-type="folder">' +
        '<div class="file-name-wrapper" data-type="folder" style="margin-left: ' + margin + 'px">' +
        '<img src="../../../source/img/fileicons/folder.png" width="16" height="16" alt="">' +
        '<input draggable="true" value=' + name + ' class="name-input">' +
        '</div>' +
        '</div>' +
        '<div class="folder-content"> </div>';
    if (!disableInput) {
        div.getElementsByClassName("name-input")[0].disabled = true;
    }
    return div;
}

function createFileElement(name, margin, disableInput) {
    var div = document.createElement("div");
    div.classList.add("file-type");
    div.classList.add("file-wrapper");
    div.setAttribute("data-type", "file");
    div.innerHTML =
        '<div data-type="file" class="file-name-wrapper" style="margin-left: ' + margin + 'px">' +
        '<img src="../../../source/img/fileicons/html.png" width="16" height="16" alt="" >' +
        '<input draggable="true" value=' + name + ' class="name-input">' +
        '</div>';

    if (!disableInput) {
        div.getElementsByClassName("name-input")[0].disabled = true;
    }
    return div;

}
var activeFileElement = null;

function getPathElement(path, structure) {
    var folders = path.split("/");
    console.log(folders);
    var currentFolder = structure;
    var level = 1;
    for (var i = 1; i < folders.length; i++) {
        if (!currentFolder[folders[i]]) {
            return false;
        }
        currentFolder = currentFolder[folders[i]];
        level++;
    }

    return { "folder": currentFolder, "level": level };
}

fileStructure = new FileStructure(document.getElementById("root"), "This is the root folder", 8);

filesystemEventsinit(document.getElementById("root"), fileStructure);
fileStructure.addFolder("myFolder", "");
fileStructure.addFile("index.html", "/myFolder");
fileStructure.addFile("main.js", "/myFolder");

fileStructure.addFolder("folder2", "/myFolder");
fileStructure.addFile("index.html", "/myFolder/folder2");
fileStructure.addFile("test.js", "/myFolder/folder2");
fileStructure.addFile("style.css", "/myFolder/folder2");

fileStructure.addFolder("testingfolder", "/myFolder");
fileStructure.addFile("test.php", "/myFolder/testingfolder");
fileStructure.addFile("stylesheet.css", "/myFolder/testingfolder");














class hello {
    static dragover() {

    }
}








/*FileStrucutre.Structure
    The Strucure object is the cards files laid out in the web browsers memory
    The strucutres is made out a assositive array where the key is the folder/file name
    The value is also a assositive array with [id] (1 folder, 2 file)
    [element] a refrence to the acual html dom element
    
*/