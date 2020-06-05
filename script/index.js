$(document).ready(function () {

    $("#log-out").click(function (e) { 
        e.preventDefault();
        eraseCookie("email");
        window.location = "signin.html";
    });
});