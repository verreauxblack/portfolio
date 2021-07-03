const url_string = window.location.href;
const url = new URL(url_string);
const userEvent = url.searchParams.get("eventName");
const userDate = url.searchParams.get("date");
const userTime = url.searchParams.get("time");

const nextYear = new Date();

var EventName = "New Year"
var countingDate = `${nextYear.getFullYear() + 1}-01-01`;
var countingTime = "00:00:00";

if (userEvent !== null && userDate !== null) {
    EventName = userEvent
    countingDate = userDate;
}

if (userTime !== null)
    countingTime = userTime;

console.log(userTime);


const daysLeft = document.getElementById("days")
const hoursLeft = document.getElementById("hours")
const MinutesLeft = document.getElementById("Minutes")
const SecondsLeft = document.getElementById("Seconds")

// modal variable for getting date from user

//for open the modal
const openEls = document.querySelectorAll("[data-open]")
const isvisible = "is-visible"

//for close the modal
const closeEls = document.querySelectorAll("[data-close]")

//get tomorrow

var day = new Date();
var nextDay = new Date();
nextDay.setDate(day.getDate() + 1);
var nextDate = nextDay.getDate();
var month = day.getUTCMonth() + 1;
var year = nextDay.getFullYear();
var dateValue = year + "-" + checkDateFormat(month) + "-" + checkDateFormat(nextDate);
// //to set the detault date for input field
var dateControl = document.querySelector('input[type="date"]');
// dateControl.value =dateValue;
dateControl.setAttribute('min', dateValue);

document.getElementById('title').innerHTML = EventName;


// counter
function counter() {
    const newDate = new Date(`${countingDate} ${countingTime}`);
    const currentDate = new Date();
    const totalSeconds = ((newDate - currentDate) / 1000);

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;


    daysLeft.innerHTML = checkDateFormat(days)
    hoursLeft.innerHTML = checkDateFormat(hours)
    MinutesLeft.innerHTML = checkDateFormat(minutes)
    SecondsLeft.innerHTML = checkDateFormat(seconds)


}

function checkDateFormat(date) {
    return date >= 0 ? date < 10 ? `0${date}` : date : '00';
}


counter()

setInterval(counter, 1000)


//modal

//for open the modal 
for (const el of openEls) {
    el.addEventListener("click", function () {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isvisible);
    })
}



//for close the modal 
for (const el of closeEls) {
    el.addEventListener("click", function () {
        this.parentElement.parentElement.parentElement.classList.remove(isvisible)
    })
}

document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isvisible)
    }
})

document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isvisible)
    }
})

document.getElementById("twitter").href = `https://twitter.com/intent/tweet?text=%22${EventName}%22+Time+Left%0a${plusAmpasend(url_string)}%0avia+@verreauxblack`;

document.getElementById("whatsapp").href = `https://wa.me/?text=%22${EventName}%22+Time+Left%0A${plusAmpasend(url_string)}`;


function plusAmpasend(link) {
    var newStr = link.replace(/&/g, "%26");
    newStr = newStr.replace(/\+/g, "%2b")
    return newStr
}

//tooltip for copy to clip board
function tooltip() {
    const elem = document.createElement('textarea');
    elem.value = `"${EventName}" Time Left\n${url_string}`;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + elem.value;
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}