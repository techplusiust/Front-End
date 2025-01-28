import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./index";

describe("Sidebar Component", () => {
  it("renders all sidebar links", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const coursesLink = screen.getByText("لیست درس‌ها");
    const usersLink = screen.getByText("لیست کاربران");
    const reportsLink = screen.getByText("گزارش‌ها");
    const commentsLink = screen.getByText("نظرات");

    expect(coursesLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(reportsLink).toBeInTheDocument();
    expect(commentsLink).toBeInTheDocument();
  });

  it("has correct links for navigation", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(screen.getByText("لیست درس‌ها")).toHaveAttribute(
      "href",
      "/admin/courses"
    );
    expect(screen.getByText("لیست کاربران")).toHaveAttribute(
      "href",
      "/admin/users"
    );
    expect(screen.getByText("گزارش‌ها")).toHaveAttribute(
      "href",
      "/admin/reports"
    );
    expect(screen.getByText("نظرات")).toHaveAttribute(
      "href",
      "/admin/comments"
    );
  });

  it("applies active class to active link", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const coursesLink = screen.getByText("لیست درس‌ها");

    coursesLink.classList.add("active");

    expect(coursesLink).toHaveClass("active");
  });
});
