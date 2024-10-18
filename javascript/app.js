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
const newMoonDate = new Date(2024, 0, 10)

let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

let selectedDay = new Date().getDate()

// Calendar ----------------------------------------------------------------

function createCalendar(month, year) {
    let calendarGrid = document.getElementById("calendar-grid")
    const monthsDays = new Date(year, month + 1, 0).getDate()
    let divElements = ``
    for (let day = 1; day <= monthsDays; day++) {
        divElements += `
            <div 
                class="${selectedDay === day ? 'selected' : ''}" 
                onclick="handleDaySelect(${day})">${day}
            </div>
        `
    }
    calendarGrid.innerHTML = divElements

    document.getElementById("current-month").innerText = new Date(year, month).toLocaleString('en-US', {
        year: '2-digit',
        month: 'long'
    })
}

function handleDaySelect(day) {
    selectedDay = day
    const date = new Date(currentYear, currentMonth, day)
    const moonIndex = getMoonPhaseIndex(date)
    displayMoonPhase(date, moonIndex)
    createCalendar(currentMonth, currentYear)
}

function prevMonth() {
    currentMonth--
    if (currentMonth < 0) {
        currentMonth = 11
        currentYear--
    }
    createCalendar(currentMonth, currentYear)
}

function nextMonth() {
    currentMonth++
    if (currentMonth > 11) {
        currentMonth = 0
        currentYear++
    }
    createCalendar(currentMonth, currentYear)
}


// Display Moon Phase
function getMoonPhaseIndex(date) {
    const daysSinceNewMoon = Math.floor((date - newMoonDate) / (1000 * 60 * 60 * 24))
    const moonAge = Math.floor(daysSinceNewMoon % moonCycleDays)
    const index = Math.floor((moonAge / moonCycleDays) * moonImages.length)
    return index
}

function displayMoonPhase(date, index) {
    let img = document.getElementById("moon-image")
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = `./images/${moonImages[index]}`
        img.onload = () => {
            img.style.opacity = 1
        }
    }, 500)
    document.getElementById("moon-phase-name").textContent = moonPhases[Math.floor(index / 2)]
    document.getElementById("selected-date").textContent = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function showCurrentPhase() {
    const today = new Date()
    const index = getMoonPhaseIndex(today)
    displayMoonPhase(today, index)
}

showCurrentPhase()
createCalendar(currentMonth, currentYear)

window.onload = () => {
    document.body.style.height = `${window.innerHeight}px`
}