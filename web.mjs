import { generateUiMainContainer } from "./generate-ui/generate-ui-main-container.mjs";
import { getCommemorativeDays } from "./common.mjs";

let currentYear = new Date().getFullYear(); // get full year
let currentMonth = new Date().getMonth(); // get current month
// Store the event days after loading from JSON
export let daysData = [];

async function loadDaysData() {
  try {
    const response = await fetch('./days.json');

    if (!response.ok) {
      throw new Error('Failed to load days data');
    }

    // Convert JSON data to JavaScript object
    daysData = await response.json(); 
    // Generate the calendar after loading data
    generateCalendar(daysData);
  } catch (error) {
    console.error('Error fetching the data: ', error);
  }
}

export function generateCalendar(daysData) {
  const calendarTitle = document.getElementById("current-date");
  const calendarBlock = document.getElementById("calendar-container");

  if (!calendarBlock || !calendarTitle) {
    console.error("Calendar container or title not found!");
    return;
  }

  // clear existing calendar
  calendarBlock.innerHTML = '';

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`;

  const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate header (days of the week)
  daysOfTheWeek.forEach(day => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add("header");
    calendarBlock.appendChild(dayElement);
  });

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(currentYear, currentMonth, totalDaysInMonth).getDay();

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
    dayElement.textContent = i; 
    dayElement.classList.add("day");
    calendarBlock.appendChild(dayElement);

    const event = commemorativeDays.find(e => e.day === i);
    if (event) {
      dayElement.classList.add("commemorative-day");
      dayElement.title = event.name;
      dayElement.dataset.eventName = event.name;
      dayElement.dataset.eventUrl = event.descriptionURL;
      dayElement.addEventListener("click", () => displayCommemorativeDayDetails(event, i)); // Pass the day as argument
    } else {
      dayElement.addEventListener("click", () => hideCommemorativeDayDetails());
    }
  }
  const adjustedLastDay = (lastDayOfMonth === 0) ? 6 : lastDayOfMonth - 1;
  const lastGrayEmptyDays = 6 - adjustedLastDay;

  for (let i = 0; i < lastGrayEmptyDays; i++) {
    const emptySlot = document.createElement("div");   
    calendarBlock.appendChild(emptySlot);
  }

  showFirstDayCommemorativeDay(commemorativeDays);
}

function showFirstDayCommemorativeDay(commemorativeDays) {
  const firstDayEvent = commemorativeDays.find(e => e.day === 1);
  if (firstDayEvent) {
    displayCommemorativeDayDetails(firstDayEvent, 1);
  } else {
    hideCommemorativeDayDetails();
  }
}

// Hide event details when no event is selected
function hideCommemorativeDayDetails() {
  const titleElement = document.getElementById("title-commem-day-details");
  const linkElement = document.getElementById("link-commem-day-details");

  if (titleElement && linkElement) {
    titleElement.innerText = "";
    linkElement.href = "";
    linkElement.innerText = "";
  }
}

// Function to add suffix (st, nd, rd, th) to day numbers
export function addOrdinalSuffix(day) {
  if (day % 100 >= 11 && day % 100 <= 13) return 'th';

  const lastNum = day % 10;
  if (lastNum === 1) return 'st';
  if (lastNum === 2) return 'nd';
  if (lastNum === 3) return 'rd';
  return 'th';
}

// Show event details when clicking on a commemorative day
function displayCommemorativeDayDetails(event, day) {
  const titleElement = document.getElementById("title-commem-day-details");
  const linkElement = document.getElementById("link-commem-day-details");

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const ordinalSuffix = addOrdinalSuffix(day);

  if (titleElement && linkElement) {
    titleElement.innerText = `${day}${ordinalSuffix} of ${months[currentMonth]} - ${event.name}`;
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

window.onload = function () {
  generateUiMainContainer();
  loadDaysData();
}
