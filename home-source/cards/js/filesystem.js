function FileStructure(rootObject, rootName, defaultMargin) {
    this.structure = new Array();
    this.root = root;
    this.rootName = rootName;
    this.defaultMargin = defaultMargin;
    this.activeElement = null;

    var rootBody = createFolderElement(rootName, defaultMargin);
    rootBody.setAttribute("path", "");
    rootObject.appendChild(rootBody);
    this.structure = { 'id': 1, 'element': rootBody };


    $(rootObject).on("contextmenu", function(event) {
        event.preventDefault();
        console.log(event.target);
        var topElement = 0;

        if (event.target.classList.contains("file")) {
            topElement = event.target;
        } else if (event.target.parentElement.parentElement.classList.contains("file")) {
            topElement = event.target.parentElement.parentElement;
        } else if (event.target.parentElement.classList.contains("folder")) {
            topElement = event.target.parentElement;
        } else if (event.target.parentElement.parentElement.parentElement.classList.contains("folder")) {
            topElement = event.target.parentElement.parentElement.parentElement;
        }
        console.log(topElement);
        var path;
        path = topElement.getAttribute("path");
        console.log(path);
        var element = getPathElement(path, fileStructure.structure);
        console.log(element);
    });

    this.getPathElement = function(path) {
        var folders = path.split("/");
        console.log(folders);
        var currentFolder = this.structure;
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
    this.addFolder = function(name, path) {
        var pathToElement = this.getPathElement(path);
        var folder = pathToElement['folder'];
        var level = pathToElement['level'];
        var margin = this.defaultMargin + 8 * level;
        var element = createFolderElement(name, margin);

        element.setAttribute("path", path + "/" + name);

        var elementParent = folder['element'].getElementsByClassName("folder-content")[0];

        elementParent.append(element);
        folder[name] = { "element": element, "id": 1 };
    }
    this.addFile = function(name, path) {
        var pathToElement = this.getPathElement(path);
        var folder = pathToElement['folder'];
        var level = pathToElement['level'];
        var margin = this.defaultMargin + 8 * level;

        var element = createFileElement(name, margin);
        element.setAttribute("path", path + "/" + name);

        var elementParent = folder['element'].getElementsByClassName("folder-content")[0];

        elementParent.append(element);
        folder[name] = { "element": element, "id": 2 };
    }

}

function createFolderElement(name, margin, disableInput) {
    var div = document.createElement("div");
    div.classList.add("folder");
    div.innerHTML =
        '<div class="file-wrapper">' +
        '<div class="file-name-wrapper" style="margin-left: ' + margin + 'px">' +
        '<img src="../../../source/img/fileicons/folder.png" width="16" height="16" alt="">' +
        '<input value=' + name + ' class="name-input">' +
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
    div.classList.add("file");
    div.classList.add("file-wrapper");
    div.innerHTML =
        '<div class="file-name-wrapper" style="margin-left: ' + margin + 'px">' +
        '<img src="../../../source/img/fileicons/html.png" width="16" height="16" alt="" >' +
        '<input value=' + name + ' class="name-input">' +
        '</div>';

    if (!disableInput) {
        div.getElementsByClassName("name-input")[0].disabled = true;
    }
    return div;

}

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

fileStructure.addFolder("myFolder", "");
fileStructure.addFile("index.html", "/myFolder");
fileStructure.addFile("main.js", "/myFolder");
fileStructure.addFolder("folder2", "/myFolder");
fileStructure.addFile("index.html", "/myFolder/folder2");
fileStructure.addFile("test.js", "/myFolder/folder2");
fileStructure.addFile("style.css", "/myFolder/folder2");



console.log(fileStructure.structure);
/*FileStrucutre.Structure
    The Strucure object is the cards files laid out in the web browsers memory
    The strucutres is made out a assositive array where the key is the folder/file name
    The value is also a assositive array with [id] (1 folder, 2 file)
    [element] a refrence to the acual html dom element
    
*/