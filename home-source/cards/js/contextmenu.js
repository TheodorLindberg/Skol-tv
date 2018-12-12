var contextMenue = document.getElementById("file-editor-contexmenu").style;


document.addEventListener('click', function(e) {
    contextMenue.opacity = "0";
    setTimeout(function() {
        contextMenue.visibility = "hidden";
    }, 501);
}, false);


function menu(x, y) {
    contextMenue.top = y + "px";
    contextMenue.left = x + "px";
    contextMenue.visibility = "visible";
    contextMenue.opacity = "1";
}
console.log($("#file-editor-contexmenue"));
$("#file-editor-contexmenu").click(function(event) {

    var checkWith = event.target;
    if (!checkWith.matches("a")) {
        checkWith = checkWith.parentElement;
    }
    console.log(checkWith);
    if (checkWith.matches(".new-file")) {
        fileStructure.HandleCreateFile();
    } else if (checkWith.matches(".new-folder-file")) {
        fileStructure.HandleCreateFolder();
    } else if (checkWith.matches(".delete-file")) {
        fileStructure.HandleDeletefile();
    } else if (checkWith.matches(".open-file")) {
        alert("open");
    } else if (checkWith.matches(".open-window-file")) {
        alert("open in new window");
    } else if (checkWith.matches(".rename-file")) {
        fileStructure.HandleopenRenameFile();
    } else if (checkWith.matches(".copy-file")) {
        alert("copy");
    } else if (checkWith.matches(".paste-file")) {
        alert("past");
    } else if (checkWith.matches(".clone-file")) {
        alert("clone");
    } else if (checkWith.matches(".copy-path-file")) {
        alert("path");
    }
});