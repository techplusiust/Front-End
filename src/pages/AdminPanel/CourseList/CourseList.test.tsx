import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CourseList from "./index";

describe("CourseList Component", () => {
  it("renders the title and search box", () => {
    render(<CourseList />);

    expect(screen.getByText("لیست درس‌ها")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("نام درس، استاد یا دانشکده را جستجو کنید...")
    ).toBeInTheDocument();
  });

  it("renders all courses initially", () => {
    render(<CourseList />);

    const courseCards = screen.getAllByText(/استاد:/i);
    expect(courseCards.length).toBe(30);
  });

  it("filters courses based on search input", () => {
    render(<CourseList />);
    const searchInput = screen.getByPlaceholderText(
      "نام درس، استاد یا دانشکده را جستجو کنید..."
    );
    fireEvent.change(searchInput, { target: { value: "ریاضیات" } });

    const filteredCourses = screen.getAllByText(/ریاضیات مهندسی/i);
    expect(filteredCourses.length).toBe(1);
  });

  it("shows 'no results' message when no courses match the search term", () => {
    render(<CourseList />);

    const searchInput = screen.getByPlaceholderText(
      "نام درس، استاد یا دانشکده را جستجو کنید..."
    );
    fireEvent.change(searchInput, { target: { value: "ناموجود" } });

    expect(screen.getByText("نتیجه‌ای یافت نشد.")).toBeInTheDocument();
  });
});
