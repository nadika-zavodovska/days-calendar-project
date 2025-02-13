// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.


//import daysData from "./days.json" with { type: "json" };

//console.log(`{getGreeting()} - there are ${daysData.length} known days`);

import fs from 'fs';

// Function to get the weekday index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const getWeekdayIndex = (weekday) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek.indexOf(weekday);
};

// Function to calculate the nth occurrence of a specific weekday in a given month
const calculateOccurrenceDate = (month, weekday, occurrence, year) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayWeekday = firstDayOfMonth.getDay();

  // Find the first weekday in the month
  let firstOccurrenceDay = (getWeekdayIndex(weekday) - firstDayWeekday + 7) % 7 + 1;

  // Calculate the nth occurrence
  let date = firstOccurrenceDay + (occurrence === 'second' ? 7 : occurrence === 'third' ? 14 : occurrence === 'fourth' ? 21 : 0);
  
  // Handle last occurrence
  if (occurrence === 'last') {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    let lastDay = new Date(year, month, daysInMonth).getDay();
    let daysToSubtract = (lastDay - getWeekdayIndex(weekday) + 7) % 7;
    date = daysInMonth - daysToSubtract;
  }

  return new Date(year, month, date);
};

// Load the JSON file
const rawData = fs.readFileSync('days.json', 'utf8');
const days = JSON.parse(rawData); // Parse the data into a JavaScript object

// Function to generate iCal format
function generateIcal(events) {
  let ical = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourCompany//NONSGML v1.0//EN\n';

  events.forEach(event => {
    const { name, monthName, dayName, occurrence, descriptionURL } = event;

    // Get the month index from the month name (0 = January, 11 = December)
    const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();
    const year = 2020; // You can adjust this as needed, or loop through 2020-2030

    // Calculate the event date based on the month, weekday, and occurrence
    const date = calculateOccurrenceDate(monthIndex, dayName, occurrence, year);

    // If the date is invalid, log an error and continue
    if (isNaN(date.getTime())) {
      console.error(`Invalid date calculated for ${name}: ${monthName} ${occurrence} ${dayName}, ${year}`);
      return;  // Skip this entry
    }

    // Format the date to YYYYMMDDTHHmmssZ
    const startDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; // Remove dashes and colons, append Z for UTC
    console.log(`Start date for ${name}:`, startDate);

    // Add to iCal content
    ical += `BEGIN:VEVENT\n`;
    ical += `SUMMARY:${name}\n`;
    ical += `DTSTART:${startDate}\n`;
    ical += `DESCRIPTION:${descriptionURL}\n`;
    ical += `END:VEVENT\n`;
  });

  ical += 'END:VCALENDAR';

  return ical;
}

// Generate the iCal content
const icalContent = generateIcal(days);

// Save the iCal content to a file
fs.writeFileSync('commemorative-days.ics', icalContent, 'utf8');
console.log('iCal file generated: commemorative-days.ics');
