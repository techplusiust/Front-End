import { render, screen, fireEvent } from "@testing-library/react";
import Schedule from "./index";
import * as LogicModule from "./logic"; // Import the logic module
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the logic module
vi.mock("./logic");

describe("Schedule Component", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    vi.mocked(LogicModule.default).mockReturnValue({
      selectedGroup: "",
      setSelectedGroup: vi.fn(),
      selectedLesson: new Set(),
      setSelectedLesson: vi.fn(),
      // Mock data for the first Select (lessonsByGroup):
      lessonsByGroup: [
        {
          id: 1,
          course_name_fa: "برنامه نویسی",
          course_name_en: "Programming",
          professor_id: 300,
          professor_name: {
            en: "Morteza Montazeri Ghahjavarestani  ",
            fa: "مرتضی منتظری قهجاورستانی",
          },
          faculty_fa: "مهندسی کامپیوتر",
          faculty_en: "Computer Engineering",
          first_day_of_week: 0,
          first_day_time: "12:00",
          first_day_duration: 2.0,
          second_day_of_week: 2,
          second_day_time: "14:00",
          second_day_duration: 1.5,
          exam_date: "2024-01-15",
          exam_start_time: "09:00",
          exam_duration: 2.0,
        },
      ],
      // Mock data for displayed courses (filteredCourses):
      filteredCourses: [
        {
          id: 1,
          course_name_fa: "برنامه نویسی",
          course_name_en: "Programming",
          professor_id: 300,
          professor_name: {
            en: "Morteza Montazeri Ghahjavarestani  ",
            fa: "مرتضی منتظری قهجاورستانی",
          },
          faculty_fa: "مهندسی کامپیوتر",
          faculty_en: "Computer Engineering",
          first_day_of_week: 0,
          first_day_time: "12:00",
          first_day_duration: 2.0,
          second_day_of_week: 2,
          second_day_time: "14:00",
          second_day_duration: 1.5,
          exam_date: "2024-01-15",
          exam_start_time: "09:00",
          exam_duration: 2.0,
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
      // Mock your actual data arrays so the component doesn't crash
      coursesData: [],
      facultiesData: [
        // For the faculty Select
        {
          department_en: "Electrical Engineering",
          department_fa: "مهندسی برق",
        },
        {
          department_en: "Railway Engineering",
          department_fa: "مهندسی راه آهن",
        },
        {
          department_en: "Mathematics and Computer Science",
          department_fa: "ریاضی و علوم کامپیوتر",
        },
        {
          department_en: "Industrial Engineering",
          department_fa: "مهندسی صنایع",
        },
        {
          department_en: "Physics",
          department_fa: "فیزیک",
        },
        {
          department_en: "Materials and Metallurgical Engineering",
          department_fa: "مهندسی مواد و متالورژی",
        },
        {
          department_en: "Architectural Engineering",
          department_fa: "مهندسی معماری",
        },
        {
          department_en: "Mechanical Engineering",
          department_fa: "مهندسی مکانیک",
        },
        {
          department_en: "Chemical, Oil, and Gas Engineering",
          department_fa: "مهندسی شیمی، نفت و گاز",
        },
        {
          department_en: "Civil Engineering",
          department_fa: "مهندسی عمران",
        },
        {
          department_en: "Computer Engineering",
          department_fa: "مهندسی کامپیوتر",
        },
        {
          department_en: "Damavand Unit",
          department_fa: "واحد دماوند",
        },
        {
          department_en: "Physical Education",
          department_fa: "تربیت بدنی",
        },
        {
          department_en: "Islamic Studies and Persian Literature",
          department_fa: "معارف اسلامی و ادبیات فارسی",
        },
        {
          department_en: "Language",
          department_fa: "زبان",
        },
        {
          department_en: "Chemistry",
          department_fa: "شیمی",
        },
        {
          department_en: "Management, Economics, and Progress Engineering",
          department_fa: "مدیریت، اقتصاد و مهندسی پیشرفت",
        },
        {
          department_en: "Capmus2",
          department_fa: "پردیس دانشگاهی علم و صنعت",
        },
      ],
    });
  });

  // it("renders the schedule component heading", () => {
  //   render(<Schedule />);
  //   // Check the main heading
  //   expect(screen.getByText("زمان بندی کلاس‌ها")).toBeInTheDocument();
  // });

  it("displays filtered courses by name", () => {
    render(<Schedule />);
    // We should see the course named "الگوریتم"
    expect(screen.getByText("برنامه نویسی")).toBeInTheDocument();
  });

  it("handles toggling course time selection", () => {
    // Grab the already-mocked function
    const handleCourseTimeToggleMock = vi.mocked(
      LogicModule.default().handleCourseTimeToggle
    );

    render(<Schedule />);

    // The checkbox label includes something like "روز: سه‌شنبه, زمان: ..."
    const checkboxLabel = screen.getByText(/روز: شنبه/);
    fireEvent.click(checkboxLabel);

    // We expect it to toggle the course with id=12 (based on our mock)
    expect(handleCourseTimeToggleMock).toHaveBeenCalledWith(1);
  });

  it("renders the Select component and handles group selection", () => {
    render(<Schedule />);

    // The default Select button text is "همه گروه‌ها" (from key="")
    const selectTrigger = screen.getByRole("button", {
      name: /همه گروه‌ها/,
    });
    expect(selectTrigger).toBeInTheDocument();

    // Open the Select dropdown
    fireEvent.click(selectTrigger);

    // The new code uses facultiesData.map(...) -> "مهندسی کامپیوتر", "علوم پایه"
    const option = screen.getByRole("option", { name: "مهندسی کامپیوتر" });
    expect(option).toBeInTheDocument();

    // Select one of the options
    fireEvent.click(option);

    // Verify setSelectedGroup was called with "مهندسی کامپیوتر"
    expect(LogicModule.default().setSelectedGroup).toHaveBeenCalledWith(
      "مهندسی کامپیوتر"
    );
  });
});
