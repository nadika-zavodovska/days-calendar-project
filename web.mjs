// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

//import { getGreeting } from "./common.mjs";
//import daysData from "./days.json" with { type: "json" };

window.onload = function() {
   // document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
   
}

let currentYear = new Date().getFullYear() // get full year
let currentMonth = new Date().getMonth() // get current month

function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const calendarTitle =  document.getElementById("title");
    const daysOfTheWeek =  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // clear existing calendar
    calendar.innerHTML = '';

    const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

    calendarTitle.textContent =  `${months[currentMonth]} ${currentYear}`;

   // Generate header (days of the week)
    daysOfTheWeek.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("header");
        calendar.appendChild(dayElement);
    })

    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the last date of the month

  // Adjust the first day so Monday is the start of the calendar (1 = Monday, 7 = Sunday)
  const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Adjust Sunday (0) to index 6 (Saturday)
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptySlot = document.createElement("div");
    calendar.appendChild(emptySlot);
  }

  // Generate the days of the month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = i;  // Dummy date
    dayElement.classList.add("day");
    calendar.appendChild(dayElement);
  }
}

// Function to handle month navigation (forward or backward)
function changeMonth(direction) {
  currentMonth += direction;

  // Adjust if the month goes out of range
  if (currentMonth > 11) {
    currentMonth = 0;  // January
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11; // December
    currentYear--;
  }

  generateCalendar();
}

// Generate the calendar on page load
window.onload = generateCalendar;