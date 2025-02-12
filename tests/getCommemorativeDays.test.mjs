import { getCommemorativeDay } from '../src/common.mjs';

describe("getCommemorativeDay function", () => {
    test("should return the correct day for International Binturong Day when May 2030 is selected", () => {
        expect(getCommemorativeDay(2030, 4, {
            "name": "International Binturong Day",
            "monthName": "May",
            "dayName": "Saturday",
            "occurrence": "second",
            "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt"
        })).toBe(11);
    });
});


