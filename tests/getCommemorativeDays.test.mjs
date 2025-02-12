import { getCommemorativeDay } from '../src/common.mjs';

describe("Checking to return the correct number of day in getCommemorativeDay function", () => {
    test("should return the correct day for International Binturong Day", () => {
        expect(getCommemorativeDay(2030, 4, {
            "name": "International Binturong Day",
            "monthName": "May",
            "dayName": "Saturday",
            "occurrence": "second",
            "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt"
        })).toBe(11);
    });
});
