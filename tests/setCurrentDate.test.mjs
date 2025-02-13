import { setDate } from "../src/web.mjs";
import { generateUiMainContainer } from "../src/generate-ui/generate-ui-main-container.mjs";

describe('setDate function', () => {
    beforeEach(() => {
        document.body.innerHTML = "<div id='calendar-container'></div>";
        generateUiMainContainer();
    });

    test('should set the current date - June 2023', () => {
        setDate(5, 2023);

        const CalendarCurrentDate = document.getElementById("current-date");
        expect(CalendarCurrentDate).not.toBeNull();
        expect(CalendarCurrentDate.textContent).toBe("June 2023");
    });

    test('should set the current date - August 2013', () => {
        setDate(7, 2013);

        const CalendarCurrentDate = document.getElementById("current-date");
        expect(CalendarCurrentDate).not.toBeNull();
        expect(CalendarCurrentDate.textContent).toBe("August 2013");
    });

    test('should set the current date - December 2050', () => {
        setDate(11, 2050);

        const CalendarCurrentDate = document.getElementById("current-date");
        expect(CalendarCurrentDate).not.toBeNull();
        expect(CalendarCurrentDate.textContent).toBe("December 2050");
    });
});
