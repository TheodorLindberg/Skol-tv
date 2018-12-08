var card_description = document.getElementById("card-description");
var card_name = document.getElementById("card-name");

var Checkhtml = document.getElementById("card-html");
var Checkjavascript = document.getElementById("card-javascript");
var Checkphp = document.getElementById("card-php");
var Checkdatabase = document.getElementById("card-database");

var html = document.getElementById("editor-html");
var javascript = document.getElementById("editor-javascript");
var php = document.getElementById("editor-php");
var database = document.getElementById("editor-database");

var textEditor = document.getElementById("text-editor");

var runSql = document.getElementById("run-sql-code");



var values = [4];
values[0] = "";
values[1] = "";
values[2] = "";
values[3] = "";

var markedFile = -1;

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
runSql.addEventListener("click", function(event) {
    alert("not implemented");
    if (confirm("Vill du verkligen köra koden? Koden kan förstöre hela hemsidan, Kommandot kommer sparas inuti servern")) {

        var value = textEditor.value;
        var password = prompt("Skriv in ditt lösenord:", "password");
        $.ajax({
            method: "POST",
            url: "../../program-files/db/runsqlquery.php",
            data: {
                "taskPassword": "t45rhsfdd49s",
                "queryCode": value,
                "password": password
            },
            success: function(responseText) {
                alert(responseText);
            },
            error: function(jqXHR, status, error) { handleError(jqXHR, status, error); },

        });
    }
});

$("#save-button").click(function(event) {
    var filesChecked = document.getElementsByClassName("file-selector");
    var filevalues = [];
    var filetypes = [];

    if (markedFile != -1) {
        values[markedFile] = textEditor.value;
    }

    for (var i = 0; i < filesChecked.length; i++) {
        if (filesChecked[i].checked) {
            console.log(i);
            filevalues.push(values[filesChecked[i].getAttribute("editor-index")]);
            filetypes.push(filesChecked[i].getAttribute("editor-filetype"));
        }
    }

    console.log(filevalues);
    console.log(filetypes);

    $.ajax({
        method: "POST",
        url: cardDataFile,
        data: {
            "dir": "createwithfile",
            "ajax": true,
            "name": card_name.value,
            "description": card_description.value,
            "files": filevalues,
            "filetypes": filetypes
        },
        success: function(responseText) {
            alert(responseText);
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
});

function showElement(element, show) {
    if (show) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
document.getElementsByClassName("create-card-information")[0].addEventListener('click', function(event) {

    if (event.target == Checkhtml) {
        showElement(html, event.target.checked);
    } else if (event.target == Checkjavascript) {
        showElement(javascript, event.target.checked);
    } else if (event.target == Checkphp) {
        showElement(php, event.target.checked);
    } else if (event.target == Checkdatabase) {
        showElement(database, event.target.checked);
    }
    var index = event.target.getAttribute("editor-index");
    if (index == markedFile) {
        values[index] = textEditor.value;
        textEditor.style.display = "none";
    }

});

document.getElementsByClassName("create-card-files-informations-header")[0].addEventListener("click", function(event) {

    var index = event.target.getAttribute("editor-index");

    textEditor.style.display = "block";

    if (index != null) {
        if (markedFile != -1) {
            textEditor.style.display = "block";
            values[markedFile] = textEditor.value;
        }
        console.log(markedFile);
        switch (Number(markedFile)) {
            case 0:
                console.log(0);
                html.style.borderColor = "grey";
                break;
            case 1:
                console.log(1);
                javascript.style.borderColor = "grey";
                break;
            case 2:
                console.log(2);
                php.style.borderColor = "grey";
                break;
            case 3:
                console.log(3);
                database.style.borderColor = "grey";
                break;
        }
        if (index == 3) //SQL editor
        {
            runSql.style.display = "block";
        } else {
            runSql.style.display = "none";
        }

        event.target.style.borderColor = "red";

        markedFile = index;
        textEditor.value = values[index];
    }

});