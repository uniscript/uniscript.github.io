var moOverlayPeriod = 1;


function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadCSS(url) {
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(element);
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + 0 + ")";
        op -= op * 0.1;
    }, 0);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + 0 + ")";
        op += op * 0.1;
    }, 0);
}

function openOverlay(load_url) {
    var overlay_settings = {
        'id'		: 'moOverlayBlock',
        'url'       : load_url
    };

    document.body.style.overflow = 'hidden';
    document.body.innerHTML += '<div id="moFade"></div>';
    unfade(document.getElementById("moFade"));

    document.body.innerHTML += '<div id="' + overlay_settings.id + '"></div>';
    document.getElementById(overlay_settings.id).innerHTML += '<a id="moOverlayClose" >X</a>';
    document.getElementById(overlay_settings.id).innerHTML += '<iframe src="' + overlay_settings.url + '" allowfullscreen="true"></iframe>';
    var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.getElementById(overlay_settings.id).style.height = window_height + 'px';
    unfade(document.getElementById(overlay_settings.id));

    document.getElementById("moFade").onclick = function() {
        closeOverlay();
    };
    document.getElementById("moOverlayClose").onclick = function() {
        closeOverlay();
    };

    window.onresize = function() {
        var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementById(overlay_settings.id).style.height = window_height + 'px';
    }
}

function closeOverlay() {
    var overlay_settings = {
        'id'	: 'moOverlayBlock'
    };
    var element = document.getElementById("moFade");
    fade(element);
    fade(document.getElementById(overlay_settings.id));

    element.parentNode.removeChild(element);
    document.body.style.overflow = 'visible';
}

function createCookie(name, value, hours) {
    var expires;

    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

(function () {

    var mo_cookie = 'mooverlayc';

    var cookie = readCookie(mo_cookie);
    if (cookie) {
        return false;
    }

    if (typeof moOverlayUrl !== 'undefined' ) {
        var load_url = moOverlayUrl + '';
    } else {
        throw new Error("There's no loading url!");
    }

    if (typeof moOverlayPeriod !== 'undefined' ) {
        var overlay_period = moOverlayPeriod;
    } else {
        var overlay_period = 12;
    }

    createCookie(mo_cookie, "1", overlay_period);

    window.addEventListener('load', function() {
       
        openOverlay(load_url);
    }, false );
})();
