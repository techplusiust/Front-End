import { render, screen, fireEvent } from "@testing-library/react";
import Schedule from "./index";
import * as LogicModule from "./logic"; // Import the logic module
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the logic module
vi.mock("./logic");

describe("Schedule Component", () => {
  beforeEach(() => {
    vi.mocked(LogicModule.default).mockReturnValue({
      selectedGroup: "",
      setSelectedGroup: vi.fn(),
      selectedLesson: new Set(),
      setSelectedLesson: vi.fn(),
      lessonsByGroup: [
        {
          name: "الگوریتم",
          group: "پایه",
          complete_course_number: "1411087_58",
          total_unit: 0,
          exam_times: [],
          course_times: [],
        },
      ],
      filteredCourses: [
        {
          complete_course_number: "1411087_58",
          name: "الگوریتم",
          course_times: [
            {
              course_day: 3,
              course_start_time: "16:30:00",
              course_end_time: "18:00:00",
              place: "A1",
            },
          ],
          group: "",
          total_unit: 0,
          exam_times: [],
        },
      ],
      selectedClassTimes: {},
      handleCourseTimeToggle: vi.fn(),
      daysOfWeek: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
      ],
      timeSlots: ["08:00", "09:30", "11:00"],
    });
  });

  it("renders the schedule component", () => {
    render(<Schedule />);
    expect(screen.getByText("زمان بندی کلاس‌ها")).toBeInTheDocument();
  });

  it("displays filtered courses", () => {
    render(<Schedule />);
    expect(screen.getByText("الگوریتم")).toBeInTheDocument();
  });

  it("handles toggling course time selection", () => {
    const handleCourseTimeToggleMock = vi.mocked(
      LogicModule.default().handleCourseTimeToggle
    );
    render(<Schedule />);

    const checkbox = screen.getByText(/روز: سه‌شنبه/);
    fireEvent.click(checkbox);

    expect(handleCourseTimeToggleMock).toHaveBeenCalledWith("1411087_58", 0);
  });

  it("renders the Select component and handles group selection", () => {
    render(<Schedule />);

    // Find the Select button
    const selectTrigger = screen.getByRole("button", {
      name: /همه گروه‌ها/,
    });

    expect(selectTrigger).toBeInTheDocument();

    // Open the Select dropdown
    fireEvent.click(selectTrigger);

    // Verify the options are rendered
    const option = screen.getByRole("option", { name: "پایه" });
    expect(option).toBeInTheDocument();

    // Select an option
    fireEvent.click(option);

    // Verify the `setSelectedGroup` function is called
    expect(LogicModule.default().setSelectedGroup).toHaveBeenCalledWith("پایه");
  });
});
