import { addOrdinalSuffix } from "../web.mjs";

describe("addOrdinalSuffix function", () => {
    test("should return 'st' for 1", () => {
        expect(addOrdinalSuffix(1)).toBe("st");
    });

    test("should return 'nd' for 2", () => {
        expect(addOrdinalSuffix(2)).toBe("nd");
    });

    test("should return 'rd' for 3", () => {
        expect(addOrdinalSuffix(3)).toBe("rd");
    });

    test("should return 'th' for 4", () => {
        expect(addOrdinalSuffix(4)).toBe("th");
    });

    test("should return 'th' for 11, 12, 13", () => {
        expect(addOrdinalSuffix(11)).toBe("th");
        expect(addOrdinalSuffix(12)).toBe("th");
        expect(addOrdinalSuffix(13)).toBe("th");
    });

    test("should return 'st' for 21", () => {
        expect(addOrdinalSuffix(21)).toBe("st");
    });

    test("should return 'nd' for 22", () => {
        expect(addOrdinalSuffix(22)).toBe("nd");
    });

    test("should return 'rd' for 23", () => {
        expect(addOrdinalSuffix(23)).toBe("rd");
    });

    test("should return 'th' for 24", () => {
        expect(addOrdinalSuffix(24)).toBe("th");
    });

    test("should return 'th' for 30", () => {
        expect(addOrdinalSuffix(30)).toBe("th");
    });

    test("should return 'st' for 31", () => {
        expect(addOrdinalSuffix(31)).toBe("st");
    });
});
