function showCardInformationPopup(cardName, element) {
    $.ajax({
        method: "POST",
        url: cardDataFile,
        data: {
            "dir": "printcardinformation",
            "ajax": true,
            "name": cardName
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
            console.log(responseText);
            element.innerHTML = before + responseText + after;
            element.firstChild.style.display = "block";
        },
        error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },
    });
}