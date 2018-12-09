document.getElementsByClassName("popup-container")[0].onclick = function(event) {
    if (!handleCardClickEvent(event, document.getElementById("import-card-container"), document.getElementById("card-information-popup-container"), true)) {
        //handeCardClickEvent returned false indicating event was none of the general operations
        var name = event.target.parentElement.parentElement.parentElement.getElementsByClassName("current-cards-name")[0].innerHTML;


        if (event.target.matches(".button-import")) {
            $.ajax({
                method: "POST",
                url: cardDataFile,
                data: {
                    "dir": "getcardsavelocation",
                    "name": name,
                    "ajax": true,
                },
                success: function(responseText) {
                    console.log(movableObjects.GetMarkedElement().element.element);
                    var object = movableObjects.GetMarkedElement().element.element.getElementsByClassName("interact-element-content")[0];

                    if (responseText != "missing") {

                        object.innerHTML = '<iframe src="' + root + responseText + '" frameborder="0" class="card-iframe"></iframe>';
                    }


                },
                error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

            });
        }
        console.log("other");
    }
}