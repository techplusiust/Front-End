import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should correctly format a valid date string", () => {
    const result = formatDate("2023-11-21 14:30:00");
    expect(result).toBe("1402/08/30 14:30");
  });

  it("should correctly handle another valid date", () => {
    const result = formatDate("2023-03-01 08:00:00");
    expect(result).toBe("1401/12/10 08:00");
  });

  it("should throw an error for an invalid date string", () => {
    expect(() => formatDate("invalid-date")).toThrow();
  });

  it("should handle edge case of midnight", () => {
    const result = formatDate("2023-11-21 00:00:00");
    expect(result).toBe("1402/08/30 00:00");
  });

  it("should correctly handle leap years in the Persian calendar", () => {
    const result = formatDate("2024-03-19 12:00:00");
    expect(result).toBe("1402/12/29 12:00");
  });

  it("should handle boundary times", () => {
    const result = formatDate("2023-11-21 23:59:59");
    expect(result).toBe("1402/08/30 23:59");
  });
});
