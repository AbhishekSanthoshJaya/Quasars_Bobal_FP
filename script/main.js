$(document).ready(function () {

    var navToggle = document.getElementById("nav-toggle")
    navToggle.addEventListener("click", function(){
        var imgSrc = navToggle.src;
        if (imgSrc.indexOf('hamburger.svg')!=-1) {
            navToggle.src  = 'assets/icons/close.svg';
            document.getElementById("overlay-div").classList.remove("close")
            document.getElementById("overlay-div").classList.add("open")
            document.getElementById("nav-div").classList.remove("close")
            document.getElementById("nav-div").classList.add("open")

        }
        else {
            navToggle.src  = 'assets/icons/hamburger.svg';
            document.getElementById("overlay-div").classList.remove("open")
            document.getElementById("overlay-div").classList.add("close")
            document.getElementById("nav-div").classList.remove("open")
            document.getElementById("nav-div").classList.add("close")
        }
    });

    addProfileInfo();
    
});

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";               

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function redirectLogin(){
    if(!checkLoginCookie()){
        window.location = 'signin.html';
    }
}

function addProfileInfo(){
    if(checkLoginCookie()){
        let cookie = document.cookie;
        let email = readCookie("email");
        $("#nav-profile").attr("href","/profile.html").text(email);
    }
    else{
        $("#nav-profile").attr("href","/signin.html").text("log in");
    }
}

function checkLoginCookie(){
    let cookie = document.cookie;
    let email = readCookie("email");
    if(email == null){
       return false;
    }
    else{
        return true;
    }
}

