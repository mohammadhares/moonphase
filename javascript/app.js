// Constants ----------------------------------------------------------------
const moonImages = [
    "0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png",
    "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png"
]

const moonPhases = [
    "New Moon", "Waning Crescent", "Third Quarter", "Waning Gibbous",
    "Full Moon", "Waxing Gibbous", "First Quarter", "Waxing Crescent"
]

const moonCycleDays = 29.5
const newMoonDate = new Date(2024, 0, 12)

let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

// Create Calendar ----------------------------------------------------------------
function createCalendar(month, year) {
    let calendarGrid = document.getElementById("calendar-grid")
    const monthsDays = new Date(year, month + 1, 0).getDate()
    let DivElement = ``
    for (let day = 1; day <= monthsDays; day++) {
        DivElement += `
            <div onclick="handleDaySelect(${day})"> ${day} </div>
        `
    }
    calendarGrid.innerHTML = DivElement
    document.getElementById("current-month").innerText = new Date(year, month).toLocaleString('en-US', {
        year: '2-digit',
        month: 'long'
    })
}

function prevMonth(){
    currentMonth--
    if (currentMonth < 0) {
        currentMonth = 11
        currentYear--
    }
    createCalendar(currentMonth, currentYear)
}

function nextMonth(){
    currentMonth++
    if(currentMonth > 11){
        currentMonth = 0
        currentYear++
    }
    createCalendar(currentMonth, currentYear)
}

function handleDaySelect(day) {
    const modifiedDate = new Date(2024, 9, day)
    const index = getMoonPhaseIndex(modifiedDate)
    displayMoon(modifiedDate , index)
}

// Main function ----------------------------------------------------------------
function getMoonPhaseIndex(date) {
    const daysSinceNewMoon = Math.floor((date - newMoonDate) / (1000 * 60 * 60 * 24))
    const moonAge = daysSinceNewMoon % moonCycleDays
    const index = Math.floor((moonAge / moonCycleDays) * moonImages.length)
    return index
}


function showCurrentMoonPhase() {
    const today = new Date()
    const index = getMoonPhaseIndex(today)
    displayMoon(today , index)
}


function displayMoon(date , index){
    document.getElementById("moon-image").src = `./images/${moonImages[index]}`
    document.getElementById("moon-phase-name").innerText = moonPhases[Math.floor(index / 2)]
    document.getElementById("selected-date").innerText = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}



createCalendar(currentMonth, currentYear)
showCurrentMoonPhase()