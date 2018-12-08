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

$("#logout").click(function(event) {
    var uid = $("#uid").val();
    var pwd = $("#pwd").val();
    $.ajax({
        method: "POST",
        url: userFile,
        data: {
            "ajax": "true",
            "dir": "logout",
        },
        success: function(responseText) {
            if (responseText == "success") {
                location.reload();
            } else {
                alert("Error: " + responseText);
            }
        },

        error: function(jqXHR, status, error) {
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

    });
});