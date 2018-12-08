var activeLayoutContainer = document.getElementById("active-layout-container");
var layoutsContainer = document.getElementById("layouts-container");

var informationPopup = document.getElementById("information-popup-container");



activeLayoutContainer.onclick = function(event) {
    handleCardClickEvent(event, layoutsContainer, activeLayoutContainer, informationPopup, layoutDataFile)
}

layoutsContainer.onclick = function(event) {
    handleCardClickEvent(event, layoutsContainer, activeLayoutContainer, informationPopup, layoutDataFile)
}

$("#create-layout-button").click(function(event) {
    save();
});
$("#create-layout-exit-button").click(function(event) {
    save();
});

function save() {
    $.ajax({
        method: "POST",
        url: layoutDataFile,
        data: {
            "dir": "create",
            "ajax": true,
            "name": $("#create-layout-name").val(),
            "description": $("#create-layout-description").val(),
        },
        success: function(responseText) {
            console.log(responseText);
            $.ajax({
                method: "POST",
                url: layoutDataFile,
                data: {
                    "dir": "printlayouts",
                    "ajax": true,
                },
                success: function(responseText) {
                    console.log("Response " + responseText);
                    layoutsContainer.innerHTML = responseText;
                    document.getElementById("create-layout-popup").style.display = "none";
                },
                error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

            });
        },
        error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
    });

}

function handleError(jqXHR, status, error) {
    if (jqXHR.status === 0) {
        alert('Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        alert('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        alert('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        alert('Time out error.');
    } else if (exception === 'abort') {
        alert('Ajax request aborted.');
    } else {
        alert('Uncaught Error.\n' + jqXHR.responseText);
    }
}