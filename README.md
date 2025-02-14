# Days calendar project

This project dynamically generates a calendar displaying commemorative days that occur annually but on non-fixed dates (e.g second Tuesday of October, third Saturday of September). It reads a JSON file (`days.json`) containing the commemorative days and displays them on a calendar. Additionally, the project generates an `.ics` file in iCalendar format, which can be imported into Google Calendar.

The goal is to track these commemorative days across multiple years and provide a user-friendly way to visualize and interact with them.

## Features

- **Commemorative Day Tracking**: Automatically calculates and displays commemorative days on the calendar based on their occurrence pattern (e.g., second Tuesday, last Sunday).
- **Interactive Calendar**: Displays the current month, allows navigation to previous and next months, and lets users jump to specific months and years.
- **iCalendar Export**: Generates an `.ics` file containing commemorative day events from 2020 to 2030, which can be imported into Google Calendar.
- **Commemorative Day Details**: Fetches additional information about the commemorative days from URLs in the JSON file. Also tested with google calendar with importing file into google calendar.

## Technologies

- **HTML**: Used for the structure and layout of the calendar.
- **CSS**: Used CSS for styles.
- **JavaScript**: Used for the logic, including generating the calendar, calculating commemorative days, and generating the `.ics` file.
- **Node.js**: Utilized for generating the .ics. Used for Jest tests.
- **JSON**: Stores the data for each commemorative day (name, description, occurrence, etc.).



- **Jest:** Used for unit testing to ensure the core functionality works as expected.

## Set up & Installation
1. **Clone the repository** <br>``` git clone  https://github.com/nadika-zavodovska/days-calendar-project  ```
2. **Navigate into the project folder (if needed)** <br>``` cd days-calendar-project``` 
3. **Open index.html in your browser** <br>Ensure the project is served over HTTP for the module system to work. [Learn to serve over HTTP.](https://www.npmjs.com/package/http-server)

## Usage
1. Interactive Calendar:

. Open the calendar in the browser to see the current month.
. Use the buttons to navigate to the previous or next month.
. Use the dropdowns to select a specific month and year.
. Use the input field to enter year in number.
. The commemorative days for each month wi  ll be displayed on the calendar.

2. Generate iCalendar:

. Run the iCalendar generation script (node generate-ics.js) to create an .ics file.
. Import the .ics file into Google Calendar to view the commemorative days.

## Running the iCal Generator Script
To generate the .ics file:
1. Ensure you have Node.js installed.
2. Run the iCalendar generator script:
3. node generate-ics.js
4. The script will generate a file named commemorative-days.ics which can be imported into Google Calendar.

## Running tests
#### Make sure you have **Node.js** and **npm** installed before running the tests.
1. **Install dependencies:** <br>``` npm install ```
2. **Run Unit Tests:** <br>``` npm test ```<br>This will run the tests using [Jest](https://jestjs.io).
3. **Check the Test Results:** <br>The test results will be displayed in the terminal.

## Notes
- This project focuses on the logic of calculating the nth occurrence of dates (e.g., second Tuesday of October) and dynamically generating the calendar.


## Contributions 
<br>Contributions are welcome. If you find any bugs or want to improve the project, feel free to fork the repo, make your changes, and submit a pull request.