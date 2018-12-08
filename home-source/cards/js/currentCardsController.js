document.getElementsByClassName("cards-cardlist")[0].addEventListener("click", function(event) {
    handleCardClickEvent(event, document.getElementsByClassName("cards-cardlist")[0], document.getElementById("card-information-popup-container"));
});