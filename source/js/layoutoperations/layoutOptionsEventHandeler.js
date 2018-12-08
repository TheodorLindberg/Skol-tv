function showLayoutInformationPopup(layoutName, element, url) {
    $.ajax({
        method: "POST",
        url: url,
        data: {
            "dir": "printlayoutinformation",
            "ajax": true,
            "name": layoutName
        },
        success: function(responseText) {
            var before = '<div class="popup">' +
                '<div id="information-popup-content" class="popup-content popup-animate" >' +
                '   <div class="popup-topSection">' +
                '<span onclick="this.parentElement.parentElement.parentElement.style.display=' + "'" + 'none' + "'" + ';" class="popup-close" title="Close Modal">&times;</span>' +
                '</div>' +
                '<div class="popup-container" style="text-align:center">';

            var after = ' </div>' +

                '<div class="popup-container" style="background-color:lightgrey;">' +
                '<button type="button" onclick="this.parentElement.parentElement.parentElement.style.display=' + "'" + 'none' + "'" + ';" class="popup-cancelbtn">Cancel</button>' +
                '</div></div></div></div>';
            element.innerHTML = before + responseText + after;
            element.firstChild.style.display = "block";
        },
        error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
    });
}

function handleCardClickEvent(event, listContainer, activateContainer, popupContainer, layoutDataUrl) {
    var name = event.target.parentElement.parentElement.parentElement.getElementsByClassName("current-layouts-name")[0].innerHTML;

    if (event.target.matches(".button-information")) {
        showLayoutInformationPopup(name, popupContainer);
        console.log("Show information");
    } else if (event.target.matches(".button-edit")) {
        //location.assign("edit/edit.php?e=" + name);
        alert("Not implemented");
    } else if (event.target.matches(".button-remove")) {
        event.target.parentElement.parentElement.parentElement.remove();
        $.ajax({
            method: "POST",
            url: layoutDataUrl,
            data: {
                "dir": "delete",
                "ajax": true,
                "name": name,
            },
            success: function(responseText) {},
            error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
        });


        console.log("Show remove");
    } else if (event.target.matches(".button-preview")) {
        console.log("Show preview");

        var request;
        if (window.XMLHttpRequest)
            request = new XMLHttpRequest();
        else
            request = new ActiveXObject("Microsoft.XMLHTTP");
        request.open('GET', "../../source/cards/" + name, false);
        request.send(); // there will be a 'pause' here until the response to come.
        // the object request will be actually modified
        if (request.status === 404) {
            alert("The page you are trying to reach is not available.");
        } else {
            location.assign("../../source/cards/" + name);
        }

    } else if (event.target.matches(".button-upvote")) {
        $.ajax({
            method: "POST",
            url: layoutDataUrl,
            data: {
                "dir": "vote",
                "power": 1,
                "ajax": true,
                "name": name,
            },
            success: function(responseText) {
                $.ajax({
                    method: "POST",
                    url: layoutDataUrl,
                    data: {
                        "dir": "printlayouts",
                        "ajax": true,
                    },
                    success: function(responseText) {
                        listContainer.innerHTML = responseText;

                    },
                    error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

                });
            },
            error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
        });
    } else if (event.target.matches(".button-make-default")) {
        if (confirm("Vill du verkligen aktivera layouten?, Den kommer visas på alla tv ifall om layouten stöder visningsmaterialet")) {
            $.ajax({
                method: "POST",
                url: layoutDataUrl,
                data: {
                    "dir": "activate",
                    "ajax": true,
                    "name": name,
                },
                success: function(responseText) {
                    console.log(responseText);
                    activateContainer.innerHTML = responseText;
                },
                error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
            });
        }
    } else if (event.target.matches(".button-deactivate")) {
        if (confirm("Vill du verkligen avaktivera layouten? Tv:en kommer bara visa en default layout(skolmaten och en error symbol)")) {
            $.ajax({
                method: "POST",
                url: layoutDataUrl,
                data: {
                    "dir": "deactivate",
                    "ajax": true
                },
                success: function(responseText) {
                    console.log(responseText);
                    activateContainer.innerHTML = responseText;
                },
                error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
            });
        }
    }
}