import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CourseList from "./index";
import axios from "axios";

// Mock axios so we can control network responses
vi.mock("axios");

describe("CourseList Component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
    // Optionally, mock localStorage token retrieval
    globalThis.localStorage.setItem("token", "FAKE_TOKEN");
  });

  it("renders the title and search box", async () => {
    // First .get call
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: [
        {
          id: 1,
          course_name_fa: "برنامه نویسی",
          professor_name: { fa: "مرتضی منتظری" },
          faculty_fa: "مهندسی کامپیوتر",
          first_day_of_week: 0,
          first_day_time: "12:00",
          exam_date: "2024-01-15",
        },
      ],
    });
    // Second .get call (because of duplicate useEffect, if still present)
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: [
        {
          id: 1,
          course_name_fa: "برنامه نویسی",
          professor_name: { fa: "مرتضی منتظری" },
          faculty_fa: "مهندسی کامپیوتر",
          first_day_of_week: 0,
          first_day_time: "12:00",
          exam_date: "2024-01-15",
        },
      ],
    });

    render(<CourseList />);

    // Wait for the component to finish loading data:
    // "لیست درس‌ها" is static, but let's confirm it's present
    expect(await screen.findByText("لیست درس‌ها")).toBeInTheDocument();

    // The search input should also be visible
    expect(
      screen.getByPlaceholderText("نام درس، استاد یا دانشکده را جستجو کنید...")
    ).toBeInTheDocument();
  });

  it("renders all courses initially (e.g., 30 courses)", async () => {
    // Create a mock array of 30 courses
    const thirtyCourses = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      course_name_fa: `درس شماره ${i + 1}`,
      professor_name: { fa: `استاد شماره ${i + 1}` },
      faculty_fa: "مهندسی کامپیوتر",
      first_day_of_week: 0,
      first_day_time: "08:00",
      exam_date: "2024-01-15",
    }));

    // Because your code calls getCourses() twice, mock both:
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: thirtyCourses,
    });
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: thirtyCourses,
    });

    render(<CourseList />);

    // We wait until the first course card is rendered
    // For instance, check for some text in the first card
    await screen.findByText("درس شماره 1");

    // Now get all "استاد:" occurrences or however you want to identify course cards
    const courseCards = screen.getAllByText(/استاد شماره/i);
    expect(courseCards.length).toBe(30);
  });

  it("filters courses based on search input", async () => {
    // Mock an array of a few courses, including "برنامه نویسی"
    const mockCourses = [
      {
        id: 1,
        course_name_fa: "برنامه نویسی",
        professor_name: { fa: "مرتضی منتظری" },
        faculty_fa: "مهندسی کامپیوتر",
        first_day_of_week: 0,
        first_day_time: "08:00",
        exam_date: "2024-01-15",
      },
      {
        id: 2,
        course_name_fa: "ریاضیات گسسته",
        professor_name: { fa: "دکتر حسابی" },
        faculty_fa: "علوم پایه",
        first_day_of_week: 1,
        first_day_time: "10:00",
        exam_date: "2024-01-20",
      },
    ];

    // Mock both requests with the same array
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockCourses,
    });
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockCourses,
    });

    render(<CourseList />);

    // Wait for data to load
    await screen.findByText("برنامه نویسی"); // just pick one known course

    // Initially, we have 2 courses
    // Now type "برنامه" in the search to filter
    const searchInput = screen.getByPlaceholderText(
      "نام درس، استاد یا دانشکده را جستجو کنید..."
    );
    fireEvent.change(searchInput, { target: { value: "برنامه" } });

    // The only matching course is "برنامه نویسی"
    // Wait for DOM update
    await waitFor(() => {
      const filteredCourses = screen.getAllByText(/برنامه نویسی/i);
      expect(filteredCourses.length).toBe(1);
    });
  });

  it("shows 'no results' message when no courses match the search term", async () => {
    // Mock a small array of courses
    const mockCourses = [
      {
        id: 1,
        course_name_fa: "طراحی الگوریتم‌ها",
        professor_name: { fa: "استاد الف" },
        faculty_fa: "مهندسی کامپیوتر",
        first_day_of_week: 2,
        first_day_time: "10:00",
        exam_date: "2024-02-15",
      },
    ];

    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockCourses,
    });
    (axios.get as vi.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockCourses,
    });

    render(<CourseList />);

    // Wait for data to load
    await screen.findByText("طراحی الگوریتم‌ها");

    // Type a search term that doesn't match any course
    const searchInput = screen.getByPlaceholderText(
      "نام درس، استاد یا دانشکده را جستجو کنید..."
    );
    fireEvent.change(searchInput, { target: { value: "ناموجود" } });

    // "نتیجه‌ای یافت نشد." should appear
    expect(screen.getByText("نتیجه‌ای یافت نشد.")).toBeInTheDocument();
  });
});
