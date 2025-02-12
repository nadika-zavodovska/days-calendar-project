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

    test("should return the correct day for Ada Lovelace Day when October 2024 is selected", () => {
        expect(getCommemorativeDay(2024, 9, {
            "name": "Ada Lovelace Day",
            "monthName": "October",
            "dayName": "Tuesday",
            "occurrence": "second",
            "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/ada.txt"
        })).toBe(8);
    });
});


