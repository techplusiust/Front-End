import { describe, it, expect } from "vitest";
import { generateTimeSlots } from "./generateTimeSlots";

describe("generateTimeSlots", () => {
  it("should generate 30-minute time slots between ۰۷:۰۰ and ۱۹:۳۰", () => {
    const result = generateTimeSlots();
    const expectedSlots = [
      "۰۷:۰۰",
      "۰۷:۳۰",
      "۰۸:۰۰",
      "۰۸:۳۰",
      "۰۹:۰۰",
      "۰۹:۳۰",
      "۱۰:۰۰",
      "۱۰:۳۰",
      "۱۱:۰۰",
      "۱۱:۳۰",
      "۱۲:۰۰",
      "۱۲:۳۰",
      "۱۳:۰۰",
      "۱۳:۳۰",
      "۱۴:۰۰",
      "۱۴:۳۰",
      "۱۵:۰۰",
      "۱۵:۳۰",
      "۱۶:۰۰",
      "۱۶:۳۰",
      "۱۷:۰۰",
      "۱۷:۳۰",
      "۱۸:۰۰",
      "۱۸:۳۰",
      "۱۹:۰۰",
    ]; // Expected output in Persian digits

    expect(result).toEqual(expectedSlots);
  });

  it("should generate the correct number of slots", () => {
    const result = generateTimeSlots();
    expect(result.length).toBe(25); // Number of slots from ۰۷:۰۰ to ۱۹:۰۰
  });

  it("should include the starting slot", () => {
    const result = generateTimeSlots();
    expect(result[0]).toBe("۰۷:۰۰");
  });

  it("should include the last valid slot before ۱۹:۳۰", () => {
    const result = generateTimeSlots();
    expect(result[result.length - 1]).toBe("۱۹:۰۰");
  });
});
