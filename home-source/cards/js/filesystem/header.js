var editorHeader = document.getElementsByClassName("text-editor-header")[0];


var elemenets = document.getElementsByClassName("text-editor-header-item");

elemenets.forEach(element => {
    elemenet.addEventListener()
});

var state = { "element": null, "state": 0 };

editorHeader.addEventListener("dragenter", function(event) {
    var target = event.target;

    if (event.target.classList.contains("text-editor-header-item")) {
        console.log(event.target);
        target.classList.add("text-editor-header-hover");
    }
    event.preventDefault;

});

editorHeader.addEventListener("dragleave", function(event) {
    var target = event.target;

    if (event.target.classList.contains("text-editor-header-item")) {
        target.classList.remove("text-editor-header-hover");
        console.log(target);

    } else {

        console.log(target);
    }

    event.preventDefault;
});