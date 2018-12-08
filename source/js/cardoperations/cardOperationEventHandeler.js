function handleCardClickEvent(event, listContainer, popupContainer) {
    var name = event.target.parentElement.parentElement.parentElement.getElementsByClassName("current-cards-name")[0].innerHTML;

    if (event.target.matches(".button-information")) {
        $.ajax({
            method: "POST",
            url: cardDataFile,
            data: {
                "dir": "printcardinformation",
                "ajax": true,
                "name": name
            },
            success: function(responseText) {
                console.log(responseText);
                showCardInformationPopup(name, popupContainer);
            },
            error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
        });

        console.log("Show information");
    } else if (event.target.matches(".button-edit")) {
        location.assign("edit/index.php?card=" + name);
    } else if (event.target.matches(".button-remove")) {
        event.target.parentElement.parentElement.parentElement.remove();
        $.ajax({
            method: "POST",
            url: cardDataFile,
            data: {
                "dir": "delete",
                "ajax": true,
                "name": name,
            },
            success: function(responseText) {
                console.log(responseText);
            },
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
            url: cardDataFile,
            data: {
                "dir": "vote",
                "power": 1,
                "name": name,
            },
            success: function(responseText) {
                $.ajax({
                    method: "POST",
                    url: cardDataFile,
                    data: {
                        "dir": "printcards",
                        "ajax": true,
                    },
                    success: function(responseText) {
                        console.log("tresponse");

                        document.getElementsByClassName("cards-cardlist")[0].innerHTML = responseText;

                    },
                    error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

                });
            },
            error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
        });
    } else {
        return;
    }
}