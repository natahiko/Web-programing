function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
}

function empty() {
    var name = document.getElementById("ername").value;
    var email = "";

    var x = document.getElementById("input_surname").value;
    if (x == "") {
        alert(name);
        return false;
    };
    var y = document.getElementById("input_email").value;
    if (y == "" || !validateEmail(y)) {
        alert(email);
        return false;
    };
}