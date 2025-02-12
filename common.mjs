function getWeekdayIndex(dayName) {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return dayNames.indexOf(dayName);
}

export function getCommemorativeDay(year, month, event) {
    const weekdayIndex = getWeekdayIndex(event.dayName);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const formattedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    let daysUntilTargetDay = (weekdayIndex - formattedFirstDay + 7) % 7;
    let firstMatchingWeekday = 1 + daysUntilTargetDay;

    if (event.occurrence === "last") {
        let lastDay = new Date(year, month + 1, 0).getDate();
        let allFridays = 0;
        let lastFriday = 0;

        for (let i = firstMatchingWeekday; i <= lastDay; i += 7) {
            let dayToCheck = new Date(year, month, i);
            allFridays++;
            lastFriday = dayToCheck.getDate();
        }

        if (allFridays === 4 || allFridays === 5) {
            return lastFriday;
        }
    }

    let targetDayOfMonth;

    if (event.occurrence === "second") {
        targetDayOfMonth = firstMatchingWeekday + 7;
    } else if (event.occurrence === "third") {
        targetDayOfMonth = firstMatchingWeekday + 14;
    } else if (event.occurrence === "fourth") {
        targetDayOfMonth = firstMatchingWeekday + 21;
    } else {
        targetDayOfMonth = firstMatchingWeekday;
    }

    return targetDayOfMonth;
}

export function getCommemorativeDays(year, month) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return daysData
        .filter(event => event.monthName === months[month])
        .map(event => ({
            ...event,
            day: getCommemorativeDay(year, month, event)
        }));
}
