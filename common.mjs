import daysData from "./days.json" with { type: "json" };

function getWeekdayIndex(dayName) {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return dayNames.indexOf(dayName);
}