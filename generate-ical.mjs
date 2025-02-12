// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.


import daysData from "./days.json" with { type: "json" };

console.log(`{getGreeting()} - there are ${daysData.length} known days`);

// Generate .ics 

import fs from 'fs';

// Load the JSON file with fs.readFileSync
const rawData = fs.readFileSync('days.json', 'utf8');

const days = JSON.parse(rawData);

// Your code that processes the days
console.log(days, "hello there");

const commemorativeDays = JSON.parse(rawData); // Parse the data into a JavaScript object

// Function to generate iCal format
function generateIcal(events) {
  let ical = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourCompany//NONSGML v1.0//EN\n';

  events.forEach(event => {
    const { name, month, day, year, descriptionURL } = event;

    const date = new Date(`${month} ${day}, ${year}`);
    const startDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD

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
const icalContent = generateIcal(commemorativeDays);

// Save the iCal content to a file
fs.writeFileSync('commemorative-days.ics', icalContent, 'utf8');
console.log('iCal file generated: commemorative-days.ics');
