// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


// import { getGreeting } from "./common.mjs";
// import daysData from "./days.json" with { type: "json" };
import { generateUiMainContainer } from "./generate-ui/generate-ui-main-container.mjs";
import { getCommemorativeDays } from "./common.mjs";

let currentYear = new Date().getFullYear() // get full year
let currentMonth = new Date().getMonth() // get current month
let daysData = [];

window.onload = function () {
  generateUiMainContainer();
  generateCalendar();
  loadDaysData();
}

async function loadDaysData() {
  try {
    const response = await fetch('./days.json');
    if (!response.ok) {
      throw new Error('Failed to load days data');
    }

    daysData = await response.json();
    generateCalendar(daysData);    
  } catch (error) {
    console.error('Error fetching the data: ', error);
  }
}

export function generateCalendar(daysData) {
    
    const calendarTitle = document.getElementById("current-date");

    const calendarBlock = document.getElementById("calendar-container");
    
    if (!calendarBlock) {
        console.error("Calendar container not found!");
        return;
    }

    // clear existing calendar
    calendarBlock.innerHTML = '';

    const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

    if (calendarTitle) {
        calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`;
    }

    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];     

   // Generate header (days of the week)
    daysOfTheWeek.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("header");
        calendarBlock.appendChild(dayElement);
    })

    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the last date of the month

  // Adjust the first day so Monday is the start of the calendar (1 = Monday, 7 = Sunday)
  const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Adjust Sunday (0) to index 6 (Saturday)
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptySlot = document.createElement("div");
      calendarBlock.appendChild(emptySlot);
  }

  const commemorativeDays = getCommemorativeDays(currentYear, currentMonth);

  // Generate the days of the month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = i;  // Dummy date
    dayElement.classList.add("day");
    // calendarBlock.appendChild(dayElement);

    const event = commemorativeDays.find(e => e.day === i);
    if (event) {
      dayElement.classList.add("commemorative-day");
      dayElement.title = event.name;
      dayElement.dataset.eventName = event.name;
      dayElement.dataset.eventUrl = event.descriptionURL;      
      dayElement.addEventListener("click", () => displayCommemorativeDayDetails(event));
    }
    calendarBlock.appendChild(dayElement);
  }
}

function displayCommemorativeDayDetails(event) {
  const titleElement = document.getElementById("title-commem-day-details");
  const linkElement = document.getElementById("link-commem-day-details");

  if (titleElement && linkElement) {
    titleElement.innerText = event.name;
    linkElement.href = event.descriptionURL;
    linkElement.innerText = "More details";
  }
}

// Update selected month and year
export function setDate(selectedMonth, selectedYear) {
    currentMonth = selectedMonth;
    currentYear = selectedYear;
    generateCalendar();
}

// Function to handle month navigation (forward or backward)
export function changeMonth(direction) {
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

