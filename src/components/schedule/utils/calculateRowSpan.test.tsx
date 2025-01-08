import { describe, it, expect } from "vitest";
import { calculateRowSpan } from "./calculateRowSpan";

describe("calculateRowSpan", () => {
  it("should calculate row span for a 30-minute interval", () => {
    const result = calculateRowSpan("08:00", 0.5);
    expect(result).toBe(1); // One 30-minute slot
  });

  it("should calculate row span for a 1-hour interval", () => {
    const result = calculateRowSpan("08:00", 1);
    expect(result).toBe(2); // Two 30-minute slots
  });

  it("should calculate row span for a 1-hour 15-minute interval", () => {
    const result = calculateRowSpan("08:00", 1.15);
    expect(result).toBe(3); // Rounds up to 3 slots
  });

  it("should calculate row span for a 2-hour interval", () => {
    const result = calculateRowSpan("08:00", 2);
    expect(result).toBe(4); // Four 30-minute slots
  });

  it("should handle edge cases where start and end times are the same", () => {
    const result = calculateRowSpan("08:00", 0);
    expect(result).toBe(0); // No time difference, no rows
  });

  it("should handle times crossing noon", () => {
    const result = calculateRowSpan("11:30", 1);
    expect(result).toBe(2); // Two 30-minute slots
  });

  it("should handle large time intervals correctly", () => {
    const result = calculateRowSpan("08:00", 10);
    expect(result).toBe(20); // Twenty 30-minute slots
  });
});
