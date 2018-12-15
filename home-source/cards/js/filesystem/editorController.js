var cardNameChange = document.getElementById("card-name");
var lastName = cardName;

var cardDescriptionChange = document.getElementById("card-description");
var lastDescription = cardDescription;

var StateChange = document.getElementById("card-state");
var lastState = state;

var StateInformationChange = document.getElementById("card-state-description");
var lastStateInformation = cardStateInformation;

cardNameChange.addEventListener("focusout", function(event) {
    var value = cardNameChange.value;
    if (value != lastName) {
        saveData(value, "name", lastName);
        lastName = value;
        var str = window.location.search
        str = replaceQueryParam('e', value, str)
        window.history.pushState('page2', 'Title', str);
        //window.location = window.location.pathname + str;
    }

});

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

cardDescriptionChange.addEventListener("focusout", function(event) {
    var value = cardDescriptionChange.value;
    if (value != lastDescription) {
        saveData(value, "description", lastName);
        lastDescription = value;
    }

});

StateInformationChange.addEventListener("focusout", function(event) {
    var value = StateInformationChange.value;
    if (value != cardStateInformation) {
        saveData(value, "stateinformation", lastName);
        cardStateInformation = value;
    }
});

StateChange.onclick = function(event) {
    lastState = !lastState;
    saveData(lastState, "state", lastName);
    if (lastState) {
        StateChange.innerHTML = "Mark unready"
        StateChange.style.backgroundColor = "green";
    } else {
        StateChange.innerHTML = "Mark ready"
        StateChange.style.backgroundColor = "red";
    }
    console.log(lastState);
}


function saveData(data, dataName, cardName) {
    console.log("Saving " + dataName + ": " + data);
    console.log(cardEditInformationPath);

    var request;
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");
    request.open('GET', cardEditInformationPath, false);
    request.send(); // there will be a 'pause' here until the response to come
    console.log(request);

    $.ajax({
        method: "POST",
        url: cardEditInformationPath,
        data: {
            "dir": "update" + dataName,
            "ajax": "true",
            "name": cardName,
            "value": data
        },
        success: function(responseText, s, t, l, p) {
            console.log(responseText);
        },
        error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

    });
}