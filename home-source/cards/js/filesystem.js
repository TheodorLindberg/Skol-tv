function FileStructure(rootObject, rootName) {
    this.structure = new Array();
    this.root = root;
    this.rootName = rootName;
    var rootBody = createFolderElement(rootName);
    rootObject.appendChild(rootBody);
    this.structure = { 'id': 1, 'element': rootBody };
    this.getPathElement = function(path) {
        var folders = path.split("/");
        console.log(folders);
        var currentFolder = this.structure;
        for (var i = 0; i < folders.length - 1; i++) {
            if (!currentFolder[folders[i]]) {
                return false;
            }
            currentFolder = currentFolder[folders[i]];
        }

        return currentFolder;

    }
    this.addFolder = function(name, path) {
        var folder = this.getPathElement(path);
        var element = createFolderElement(name);

        console.log(name + "element");
        console.log(element);

        console.log(name + "folder");
        console.log(folder);

        var elementParent = folder['element'].getElementsByClassName("folder-content")[0];

        console.log(name + "elementparent");
        console.log(elementParent);
        elementParent.append(element);

        folder[name] = { "element": element, "id": 1 };
    }
    this.addFile = function(name, path) {
        var folder = this.getPathElement(path);
        var element = createFileElement(name);

        console.log(name + "element");
        console.log(element);

        console.log(name + "folder");
        console.log(folder);

        var elementParent = folder['element'].getElementsByClassName("folder-content")[0];

        console.log(name + "elementparent");
        console.log(elementParent);
        elementParent.append(element);

        folder[name] = { "element": element, "id": 2 };
    }
}

function createFolderElement(name) {
    var div = document.createElement("div");
    div.classList.add("folder");
    div.innerHTML =
        '<div class="folder-name">' +
        '<img src="../../../source/img/fileicons/folder.png" width="16" height="16" alt="">' +
        '<p>' + name + '</p>' +
        '</div>' +
        '<div class="folder-content"> </div>';
    return div;
}

function createFileElement(name) {
    var div = document.createElement("div");
    div.classList.add("file");
    div.innerHTML =
        '<img src="../../../source/img/fileicons/html.png" width="16" height="16" alt="">' +
        '<p>' + name + '</p>';
    return div;
}

fileStructure = new FileStructure(document.getElementById("root"), "This is the root folder");
fileStructure.addFolder("myFolder", "");
fileStructure.addFile("index.html", "myFolder/");
fileStructure.addFile("main.js", "myFolder/");
fileStructure.addFolder("folder2", "myFolder/");
fileStructure.addFile("index.html", "myFolder/folder2/");
fileStructure.addFile("test.js", "myFolder/folder2/");
fileStructure.addFile("style.css", "myFolder/folder2/");
console.log(fileStructure.structure);
/*FileStrucutre.Structure
    The Strucure object is the cards files laid out in the web browsers memory
    The strucutres is made out a assositive array where the key is the folder/file name
    The value is also a assositive array with [id] (1 folder, 2 file)
    [element] a refrence to the acual html dom element
    
*/