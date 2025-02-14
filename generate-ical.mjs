import fs from 'fs';

// Function to get the weekday index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const getWeekdayIndex = (weekday) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek.indexOf(weekday);
};

// Function to calculate the nth occurrence of a specific weekday in a given month
const calculateOccurrenceDate = (month, weekday, occurrence, year) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week (0 = Sunday)
  const weekdayIndex = getWeekdayIndex(weekday); // Get index (0 = Monday, 6 = Sunday)

  // Find the first occurrence of the given weekday in this month
  let firstOccurrenceDay = 1 + ((7 + weekdayIndex - firstDayOfMonth) % 7);

  // Handle nth occurrences (second, third, fourth)
  let offset = {
    "first": 0,
    "second": 7,
    "third": 14,
    "fourth": 21
  };

  if (occurrence in offset) {
    return new Date(year, month, firstOccurrenceDay + offset[occurrence]);
  }

  // Handle last occurrence
  if (occurrence === "last") {
    let lastDay = new Date(year, month + 1, 0).getDate(); // Get last day of month
    for (let i = lastDay; i > 0; i--) {
      let day = new Date(year, month, i).getDay();
      if (day === weekdayIndex) {
        return new Date(year, month, i);
      }
    }
  }

  return null; // Fallback in case of an error
};



// Load the JSON file
const rawData = fs.readFileSync('days.json', 'utf8');
const days = JSON.parse(rawData); // Parse the data into a JavaScript object

// Function to generate iCal format
function generateIcal(events) {
  let ical = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourCompany//NONSGML v1.0//EN\n';

  for (let year = 2020; year <= 2030; year++) { 
    events.forEach(event => {
      const { name, monthName, dayName, occurrence, descriptionURL } = event;

      // Get the month index from the month name (0 = January, 11 = December)
      const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();

      // Calculate the event date based on the month, weekday, and occurrence
      const date = calculateOccurrenceDate(monthIndex, dayName, occurrence, year);

      // If the date is invalid, log an error and continue
      if (isNaN(date.getTime())) {
        console.error(`Invalid date calculated for ${name}: ${monthName} ${occurrence} ${dayName}, ${year}`);
        return;  // Skip this entry
      }

      // Format the date to YYYYMMDDTHHmmssZ
      const startDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;


      console.log(`Start date for ${name} in ${year}:`, startDate);

      // Add to iCal content
      ical += `BEGIN:VEVENT\n`;
      ical += `SUMMARY:${name} (${year})\n`;
      ical += `DTSTART;VALUE=DATE:${startDate}\n`;
      ical += `DESCRIPTION:${descriptionURL}\n`;
      ical += `END:VEVENT\n`;
    });
  }

  ical += 'END:VCALENDAR';

  return ical;
}

// Generate the iCal content
const icalContent = generateIcal(days);

// Save the iCal content to a file
fs.writeFileSync('commemorative-days.ics', icalContent, 'utf8');
console.log('iCal file generated: commemorative-days.ics');
