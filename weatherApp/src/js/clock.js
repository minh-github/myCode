var hours = new Date().getHours();
var HOURS = new Date().getHours();
var session, toggleBtn = "";


function GetSession() {
    if (HOURS > 12) {
        session = "PM"
    } else {
        session = "AM"
    }
    document.getElementById("session").innerText = session
}
GetSession()

function GetMins() {
    var mins = new Date().getMinutes();
    mins = (mins < 10) ? "0" + mins : mins
    document.getElementById("mins").innerText = mins
    setTimeout(function () { GetMins() }, 1000)
};
GetMins();
function GetSecs() {
    var secs = new Date().getSeconds();
    secs = (secs < 10) ? "0" + secs : secs
    document.getElementById("secs").innerText = secs
    setTimeout(function () { GetSecs() }, 1000)
};
GetSecs();
function GetHours() {
    document.getElementById("hours").innerText = hours
    setTimeout(function () { GetHours() }, 1000)
};
GetHours();

function toggleHours() {
    if (hours > 12) {
        hours = hours - 12;
    } else {
        hours = HOURS
    }
};
